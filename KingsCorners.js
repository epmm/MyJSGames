/*************************************************************
Recommended formatting in HTML:
<body onload = "initit()>
<div style="width: 1200px; height: 720px; margin:auto;">
        <canvas id="disCanvas" width="1200" height="720" style="position:absolute border:1px solid #000000;">
    *************************************************************************************/            



            var disC =document.getElementById("disCanvas");
            var context =disC.getContext("2d");
            var won = false;
            context.font = "20px Georgia";
            var image = new Image();
            image.src = 'pictures/cardset-oxymoron/01c.gif';
            var winImage = new Image();
            winImage.src = 'pictures/cardset-oxymoron/winner.gif';
            var loseImage = new Image();
            loseImage.src = 'pictures/cardset-oxymoron/youlose.gif';
            const width = image.width;
            const height = image.height;
            var xMouse = 0;
            var yMouse = 0;
            const cardPics = [];
            var deck = [];
            const suits = ['c','d','h','s'];
            const ranks = ['01','02','03','04','05','06','07','08','09','10','11','12','13'];
            const stackAngs = [0*Math.PI/180, 135*Math.PI/180, 0*Math.PI/180, 45*Math.PI/180, 0, 90*Math.PI/180, 0, 90*Math.PI/180, 0*Math.PI/180,                                                  45*Math.PI/180, 0*Math.PI/180, -45*Math.PI/180];
            const stackPos = [{x:10,y:73,dx:15,dy:0}, {x:602,y:190,dx:-14,dy:-14}, {x:715,y:143,dx:0,dy:-20}, {x:967,y:121,dx:14,dy:-14}, {x:0,y:0,dx:0,dy:0}, 
                              {x:600,y:320,dx:-20,dy:0}, {x:715,y:310,dx:0,dy:0}, {x:997,y:320,dx:20,dy:0}, {x:10,y:553,dx:15,dy:0}, {x:550,y:479,dx:-14,dy:+14}, 
                              {x:715,y:480,dx:0,dy:20}, {x:899,y:530,dx:14,dy:14}];
            let dInd = 0;
            for(var i = 0; i < 4; i = i + 1){
                for(var j = 0; j < 13; j = j + 1){
                    if(i == 1 || i == 2){
                        deck[dInd] = {cardInd: dInd, rank: ranks[j], suit: suits[i], color: 'red'};
                    }   
                    else{
                        deck[dInd] = {cardInd: dInd, rank: ranks[j], suit: suits[i], color: 'black'};
                    }
                    cardPics[dInd] = new Image();
                    cardPics[dInd].src = `pictures/cardset-oxymoron/${ranks[j]}${suits[i]}.gif`;
                    dInd = dInd + 1;
                }
            }
            cardPics[52] = new Image();
            cardPics[52].src = 'pictures/cardset-oxymoron/back111.gif';
            var stacks = [deal(7), [], deal(1), [], [], deal(1), [], deal(1), deal(7), [], deal(1), []];
            const boardColors = ["#FF0000", "#008888", "#888800", "#880088", "#FFEE00", "#00FF00", "#77BBCC", "#4400AA", "#553333", "#0000FF", "#FF00AA", "#DD7733", "#00EEFF"];
            const boardGrid = [[0, 0, 300, 240], [300, 0, 300, 240], [600, 0, 300, 240], [900, 0, 300, 240], [0, 240, 300, 240], [300, 240, 300, 240], [600, 240, 300, 240],
                               [900, 240, 300, 240], [0, 480, 300, 240], [300, 480, 300, 240], [600, 480, 300, 240], [900, 480, 300, 240], [100, 320, 100, 80]];
            var pressMouse = false;
            var whereMouse = 0;
            var startStack = -1;
            var endStack = -1;
            var turns = 0;
            document.getElementById("disCanvas").addEventListener("mousedown", downMouse);
            document.getElementById("disCanvas").addEventListener("mouseup", upMouse);
            document.getElementById("disCanvas").addEventListener("mouseleave", mouseLeave);
            
            function initit(){
                //console.log(parseInt(stacks[0][0][0].rank));
                printBoard(context);
                
            }
            
            function mouseLeave() {
                pressMouse = false;
                printBoard(context);
            }
            
            function downMouse() { 
                startStack = findMouse();
                if(startStack != 4 && startStack != 6 && startStack != 0){
                    pressMouse = true;
                }
                if(pressMouse){
                    context.fillStyle = "#000000";
                    context.fillRect(boardGrid[startStack][0], boardGrid[startStack][1], boardGrid[startStack][2], boardGrid[startStack][3]);
                    printStack(context, stacks[startStack], startStack);
                }
            }

            function upMouse() {
                endStack = findMouse();
                if(yoCanDo() && pressMouse){
                    moveMyCards();
                }
                pressMouse = false;
                printBoard(context);
                victoryTest(context);
            }
            
            function victoryTest(context){
                if(stacks[8].length == 0){
                    won = true;
                    rotateAndPaintImage ( context, winImage, 0 , 280, 192, 0, 0 );
                }
                else if(stacks[0] == 0){
                    won = true;
                    rotateAndPaintImage ( context, loseImage, 0 , 360, 227, 0, 0 );
                }
            }
            
            function printBoard(context){
                for(var i = 0; i < 13; i++){
                    if(i == 4 || i == 12){
                        context.fillStyle = boardColors[i];
                        context.fillRect(boardGrid[i][0], boardGrid[i][1], boardGrid[i][2], boardGrid[i][3]);
                    }
                    else if(i == 6){
                        context.fillStyle = boardColors[i];
                        context.fillRect(boardGrid[i][0], boardGrid[i][1], boardGrid[i][2], boardGrid[i][3]);
                        printStack(context, deck, i);
                    }
                    else{
                        context.fillStyle = boardColors[i];
                        context.fillRect(boardGrid[i][0], boardGrid[i][1], boardGrid[i][2], boardGrid[i][3]);
                        printStack(context, stacks[i], i);
                    }
                }
                context.fillStyle = "#000000";
                context.fillText("End Turn", 110, 365);
                context.fillText("Turns taken: " + turns, 90, 420);
            }
            
            function printStack(context, stack, stackNum){
                for(var i = 0; i < stack.length; i = i + 1) {
                    if(stackNum == 0 || stackNum == 6){
                        rotateAndPaintImage ( context, cardPics[52], stackAngs[stackNum], stackPos[stackNum].x + stackPos[stackNum].dx*i, stackPos[stackNum].y + stackPos[stackNum].dy*i, 0, 0 );
                    }
                    else{
                        rotateAndPaintImage ( context, cardPics[stack[i][0].cardInd], stackAngs[stackNum], stackPos[stackNum].x + stackPos[stackNum].dx*i, stackPos[stackNum].y + stackPos[stackNum].dy*i, 0, 0 ); 
                    }
                }
            }
            
            function rotateAndPaintImage ( context, cardImg, angleInRad , positionX, positionY, axisX, axisY ) {
                context.translate( positionX, positionY );
                context.rotate( angleInRad );
                context.drawImage( cardImg, -axisX, -axisY );
                context.rotate( -angleInRad );
                context.translate( -positionX, -positionY );
            }
            
            function deal(num){
                let dealt = [];
                let rand = 0;
                for(var i = 0; i < num; i++){
                    rand = Math.floor(Math.random() * deck.length);
                    dealt.push(deck.slice(rand,rand + 1));
                    deck.splice(rand, 1);
                }
                return dealt;
            }
            
            function drawCard(num, stack){
                let dealt = stack;
                let rand = 0;
                for(var i = 0; i < num; i++){
                    rand = Math.floor(Math.random() * deck.length);
                    dealt.push(deck.slice(rand,rand + 1));
                    deck.splice(rand, 1);
                }
                return dealt;
            }
            
            function endTurn(){
                turns += 1;
                botMove();
                if (deck.length > 0 && !won){
                    stacks[0] = drawCard(1,stacks[0]);
                    stacks[8] = drawCard(1,stacks[8]);
                }
                printBoard(context);
                victoryTest(context);
            }
            
            disC.onmousemove = function(event){
                 xMouse = event.offsetX;
                 yMouse = event.offsetY;
                if(pressMouse){
                    endStack = findMouse();
                    if(yoCanDo() && endStack != startStack){
                        context.fillStyle = "#FFFFFF";
                        context.fillRect(boardGrid[endStack][0], boardGrid[endStack][1], boardGrid[endStack][2], boardGrid[endStack][3]);
                        printStack(context, stacks[endStack], endStack);
                    }
                    if(whereMouse != endStack && whereMouse != startStack && whereMouse != 6 && whereMouse != 4){
                        context.fillStyle = boardColors[whereMouse];
                        context.fillRect(boardGrid[whereMouse][0], boardGrid[whereMouse][1], boardGrid[whereMouse][2], boardGrid[whereMouse][3]);
                        printStack(context, stacks[whereMouse], whereMouse);
                    }
                    whereMouse = endStack;
                }
            }
            
            function isButtonClick() {
                return (xMouse >= 100 && xMouse <= 200 && yMouse >= 320 && yMouse <= 400);
            }
            
            function findMouse() {
                let gridNum = 0;
                for(var y = 0; y < 3; y++){
                    for(var x = 0; x < 4; x++){
                        if(xMouse >= 300*x && xMouse <= 300*(x+1)-1 && yMouse >= 240*y && yMouse <= 240*(y+1)-1){
                            return gridNum;
                        }
                        gridNum += 1;
                    }
                }
            }
            
            disC.addEventListener('click', (e) => {
                const pos = {x: e.clientX, y: e.clientY};
                if(isButtonClick()){
                    endTurn();
                }
                else{
                    
                }
            });
            
            function yoCanDo(){
                if(stacks[startStack].length == 0)
                    return false;
                if(startStack == 1 || startStack == 3 || startStack == 9 || startStack == 11)
                    return false;
                if(endStack == 1 || endStack == 3 || endStack == 9 || endStack == 11) {
                    if(startStack == 8 && stacks[endStack].length == 0) {
                        if(stringHand(stacks[startStack]).indexOf("13") > -1)
                            return true;
                    }
                    else if(startStack == 8) {
                        for(var j = stacks[startStack].length-1; j >= 0 ; j--) {
                            if(isPlayableCard(stacks[startStack][j][0], stacks[endStack][stacks[endStack].length-1][0]))
                                return true;
                        }
                    }
                    else if(startStack == 2 || startStack == 5 || startStack == 7 || startStack == 10) {
                        if(stacks[endStack].length == 0)
                            return (stringCard(stacks[startStack][0][0]).indexOf("13") > -1); 
                        else 
                            return isPlayableCard(stacks[startStack][0][0], stacks[endStack][stacks[endStack].length-1][0]);
                    } 
                    else if(isPlayableCard(stacks[startStack][0][0], stacks[endStack][stacks[endStack].length-1][0])){
                        return true;
                    }
                }
                if(endStack == 2 || endStack == 5 || endStack == 7 || endStack == 10) {
                    if(stacks[endStack].length == 0)
                        return true;
                    else if(startStack == 8) {
                        for(var j = stacks[startStack].length-1; j >= 0 ; j--) {
                            if(isPlayableCard(stacks[startStack][j][0], stacks[endStack][stacks[endStack].length-1][0]))
                                return true;
                        }
                    }
                    else if(isPlayableCard(stacks[startStack][0][0], stacks[endStack][stacks[endStack].length-1][0]))
                        return true;
                }
                return false;
            }
            
            function botCanDo(){
                if(stacks[startStack].length == 0)
                    return false;
                if(startStack == 1 || startStack == 3 || startStack == 9 || startStack == 11)
                    return false;
                if(endStack == 1 || endStack == 3 || endStack == 9 || endStack == 11) {
                    if(startStack == 0 && stacks[endStack].length == 0) {
                        if(stringHand(stacks[startStack]).indexOf("13") > -1)
                            return true;
                    }
                    else if(startStack == 0) {
                        for(var j = stacks[startStack].length-1; j >= 0 ; j--) {
                            if(isPlayableCard(stacks[startStack][j][0], stacks[endStack][stacks[endStack].length-1][0]))
                                return true;
                        }
                    }
                    else if(startStack == 2 || startStack == 5 || startStack == 7 || startStack == 10) {
                        if(stacks[endStack].length == 0)
                            return (stringCard(stacks[startStack][0][0]).indexOf("13") > -1); 
                        else 
                            return isPlayableCard(stacks[startStack][0][0], stacks[endStack][stacks[endStack].length-1][0]);
                    } 
                    else if(isPlayableCard(stacks[startStack][0][0], stacks[endStack][stacks[endStack].length-1][0])){
                        return true;
                    }
                }
                if(endStack == 2 || endStack == 5 || endStack == 7 || endStack == 10) {
                    if(stacks[endStack].length == 0)
                        return true;
                    else if(startStack == 0) {
                        for(var j = stacks[startStack].length-1; j >= 0 ; j--) {
                            if(isPlayableCard(stacks[startStack][j][0], stacks[endStack][stacks[endStack].length-1][0]))
                                return true;
                        }
                    }
                    else if(isPlayableCard(stacks[startStack][0][0], stacks[endStack][stacks[endStack].length-1][0]))
                        return true;
                }
                return false;
            }
            
            function stringHand(stack){
                let handStr = "";
                for(var i = 0; i < stack.length; i++){
                    handStr += "card: " + stack[i][0].color + stack[i][0].rank + " ";
                }
                return handStr;
            }
            
            function stringCard(card){
                let cardStr = "" + card.rank + card.suit + card.color;
                return cardStr;
            }
            
            function cardName(card){
                let name = "";
                if(parseInt(card.rank) < 11 && parseInt(card.rank) > 1)
                    name += "" + parseInt(card.rank);
                else if(parseInt(card.rank) == 1)
                    name += "Ace";
                else if(parseInt(card.rank) == 11)
                    name += "Jack";
                else if(parseInt(card.rank) == 12)
                    name += "Queen";
                else if(parseInt(card.rank) == 13)
                    name += "King";
                if(card.suit.localeCompare("c") == 0)
                    name += " of Clubs";
                else if(card.suit.localeCompare("d") == 0)
                    name += " of Diamonds";
                else if(card.suit.localeCompare("h") == 0)
                    name += " of Hearts";
                else if(card.suit.localeCompare("s") == 0)
                    name += " of Spades";
                return name;
            }
            
            function isPlayableCard(low, high){
                let highRank = parseInt(high.rank);
                let lowRank = parseInt(low.rank);
                if(low.color.localeCompare(high.color) == 0){
                    return false;
                }
                if(highRank == lowRank+1){
                    return true;
                }
                return false;
            }
            
            function moveCards(){
                let stackSize = stacks[startStack].length
                for(var i = 0; i < stackSize; i++){
                    stacks[endStack].push(stacks[startStack].shift());
                }
            }
            
            function moveCard(ind){  
                stacks[endStack].push(stacks[startStack][ind].splice(0, 1));
                stacks[startStack].splice(ind, 1);
            }
            
            function moveMyCards() {
                if(startStack == 2 || startStack == 5 || startStack == 7 || startStack == 10) {
                    moveCards();
                }
                else if((startStack == 8 || startStack == 0) && stacks[endStack].length == 0) {
                    if(endStack == 1 || endStack == 3 || endStack == 9 || endStack == 11) {
                        let numKings = 0;
                        let kingIndex = 0;
                        for(var i = 0; i < stacks[startStack].length; ++i) {
                            if(stringCard(stacks[startStack][i][0]).indexOf("13") > -1) { 
                                ++numKings;
                                kingIndex = i;
                            }
                        }       
                        if(numKings == 1)
                            moveCard(kingIndex);
                        else {
                            kingIndex = askForCard();
                            if(kingIndex == -1)
                                return;
                            if(stringCard(stacks[startStack][kingIndex][0]).indexOf("13") > -1) {
                                moveCard(kingIndex);
                            }
                            else
                                moveMyCards();  
                        }
                    }
                    else{
                        var cardIndex = askForCard();
                        if(cardIndex == -1)
                            return;
                        moveCard(cardIndex);
                    }
                }
                else if((startStack == 8 || startStack == 0) && stacks[endStack].length != 0) {  
                    for(var i = 0; i < stacks[startStack].length; ++i) {
                        if(isPlayableCard(stacks[startStack][i][0], stacks[endStack][stacks[endStack].length-1][0])) {
                            moveCard(i);
                            break;
                        }
                    }
                }
            }
            
            function moveBotCards() {
                if(startStack == 2 || startStack == 5 || startStack == 7 || startStack == 10) {
                    moveCards();
                }
                else if((startStack == 8 || startStack == 0) && stacks[endStack].length == 0) {
                    if(endStack == 1 || endStack == 3 || endStack == 9 || endStack == 11) {
                        let numKings = 0;
                        let kingIndex = 0;
                        for(var i = 0; i < stacks[startStack].length; ++i) {
                            if(stringCard(stacks[startStack][i][0]).indexOf("13") > -1) { 
                                ++numKings;
                                kingIndex = i;
                            }
                        }       
                        if(numKings == 1)
                            moveCard(kingIndex);
                        else {
                            //kingIndex = askForCard(); ***********could add function to make Bot choose specific King based on its hand****************
                            if(kingIndex == -1)
                                return;
                            if(stringCard(stacks[startStack][kingIndex][0]).indexOf("13") > -1) {
                                moveCard(kingIndex);
                            }  
                        }
                    }
                    else{
                        var cardIndex = stacks[startStack].length-1;  //***********could add function to make Bot choose specific card based on its hand****************
                        if(cardIndex == -1)
                            return;
                        moveCard(cardIndex);
                    }
                }
                else if((startStack == 8 || startStack == 0) && stacks[endStack].length != 0) {  
                    for(var i = 0; i < stacks[startStack].length; ++i) {
                        if(isPlayableCard(stacks[startStack][i][0], stacks[endStack][stacks[endStack].length-1][0])) {
                            moveCard(i);
                            break;
                        }
                    }
                }
            }
            
            function askForCard(){
                var txt = "";
                var question = "Enter index number of card you'd like to move:\n";
                for(var i = 0; i < stacks[8].length; ++i){
                    question = question + i + "--->" + cardName(stacks[8][i][0]) + "\n"; 
                }
                var cardPick = prompt(question, "");
                if (cardPick == null || cardPick == "" || parseInt(cardPick, 10) > stacks[8].length || parseInt(cardPick, 10) < 0 || isNaN(parseInt(cardPick, 10))) {
                    txt += "User sucks.";
                    console.log(txt);
                    return -1;
                } 
                else {
                    txt += "Hello " + cardPick + "! How are you today?";
                }
                console.log(txt);
                return cardPick;
            }
            
            function botMove() {
                startStack = 0;
                endStack = -1;
                if(stacks[0].length == 0)
                    return;
                let canDoMoves = 0;
                let toIndex = -1;
                for(var i = 0; i < 12; ++i) { //Looks for moves within hand
                    endStack = i;
                    if(i == 0 || i == 4 || i == 6 || i == 8)
                        continue;
                    else if(botCanDo()) {
                        toIndex = i;
                        ++canDoMoves;
                    }
                }
                if(canDoMoves == 1) {
                    endStack = toIndex;
                    moveBotCards();
                    printBoard(context);
                }
                else if(canDoMoves > 1) {
                    endStack = toIndex;
                    moveBotCards();
                    printBoard(context);
                    botMove();
                }

                if(stacks[0].length == 0)
                    return;
                let boardMoves = 0;
                let to = -1;
                let from = -1;
                for(var i = 0; i < 12; ++i) { //looks for moves with board stacks
                    startStack = i;
                    if(i == 0 || i == 4 || i == 6 || i == 8 || i == 1 || i == 3 || i == 9 || i == 11)
                        continue;
                    else  {
                        for(var j = 0; j < 12; ++j) {
                            endStack = j;
                            if(j == 0 || j == 4 || j == 6 || j == 8)
                                continue;
                            else if(botCanDo()) {
                                ++boardMoves;
                                to = j;
                                from = i;
                            }
                        }
                    }
                }
                if(boardMoves == 1) {
                    startStack = from;
                    endStack = to;
                    moveBotCards();
                    printBoard(context);
                }
                else if(boardMoves > 1) {
                    startStack = from;
                    endStack = to;
                    moveBotCards();
                    printBoard(context);
                    console.log(canDoMoves + "-" + boardMoves);
                    botMove();
                }
                if(stacks[0].length == 0)
                    return;
                if(canDoMoves == 0 && boardMoves == 0)
                    return;
                botMove();
            }