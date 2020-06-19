/*************************************************************
Recommended formatting in HTML:
<body onload = "init()">
<div style="width: 918px; height: 600px; margin:auto;">
    <canvas id="myCanvas" width="918" height="600" style="border:1px solid #000000;">
    *************************************************************************************/



                var c =document.getElementById("myCanvas");
				var ctx =c.getContext("2d");
				var mousePress = false;
                
                /*****************************************/
				document.getElementById("myCanvas").addEventListener("mousedown", mouseDown);
                document.getElementById("myCanvas").addEventListener("mouseup", mouseUp);
                
                function mouseDown() { 
                  mousePress = !mousePress;
                }

                function mouseUp() {
                  draw();
                }
				/****Above code used to add pause/resume effect on-click and keep the game from starting without you*****/
                
				var colors = 
				["#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF",
				"#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF",
				"#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF",
				"#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF",
				"#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF"];
				
				var colors2 = 
				["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
				"#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
				"#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
				"#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000",
				"#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"];
				
				var colors3 = 
				["#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF",
				"#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF",
				"#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF",
				"#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF",
				"#FF0000","#FF8800","#FFBB00","#FFFF00","#00FF00","#00AAFF","#0067FF","#0000FF","#AA00FF","#FF00FF"];
				
				
				var bricks = new Array();
				
				var xsize = 10;	
				var ysize = 5;
				var nbricks = 0 ;
				
				var state = true; //true means actively playing and the ball speed will be increasing. 
				
				function coord(x,y) //using grid coordinates, calculates the element number of the 1-dimensional brick array
				{
				return y = y * xsize + x;
				}
				
				function init2() //level 3 brick coordinates
				{
				 nbricks = 100;
		 		 for(var y = 0 ; y < 5 ; y = y + 1)
				 {
				  for(var x = 0 ; x < 10 ; x = x + 1)
				  {
				   bricks[coord(x,y)] = 2;
				  }
				 }
				 
				 draw();
				}
				
				function init1() //level 2 brick coordinates
				{
				 nbricks = 30;
		 		 for(var y = 0 ; y < 5 ; y = y + 1)
				 {
				  for(var x = 0 ; x < 10 ; x = x + 1)
				  {
				   bricks[coord(x,y)] = 1;
				  }
				   bricks[coord(1,1)] = 0;
				   bricks[coord(0,3)] = 0;
				   bricks[coord(2,0)] = 0;
				   bricks[coord(2,1)] = 0;
				   bricks[coord(2,2)] = 0;
				   bricks[coord(2,3)] = 0;
				   bricks[coord(2,4)] = 0;
				   bricks[coord(4,1)] = 0;
				   bricks[coord(4,3)] = 0;
				   bricks[coord(4,4)] = 0;
				   bricks[coord(6,0)] = 0;
				   bricks[coord(6,1)] = 0;
				   bricks[coord(6,2)] = 0;
				   bricks[coord(6,3)] = 0;
				   bricks[coord(6,4)] = 0;
				   bricks[coord(8,1)] = 0;
				   bricks[coord(8,2)] = 0;
				   bricks[coord(8,3)] = 0;
				   bricks[coord(9,0)] = 0;
				   bricks[coord(9,4)] = 0;

				 }
				
				 draw();
				}
				
				
				function init() //level 1 brick coordinates.... all bricks are initally alive, then the empty space bricks are overwritten below
				{
				
				 nbricks = 50;
				 level = 0;
		 		 for(var y = 0 ; y < 5 ; y = y + 1)
				 {
				  for(var x = 0 ; x < 10 ; x = x + 1)
				  {
				   bricks[coord(x,y)] = 2; //value of each brick = number of times it needs to be hit to dissappear
				  }
				   bricks[coord(1,0)] = 0;
				   bricks[coord(3,0)] = 0;
				   bricks[coord(5,0)] = 0;
				   bricks[coord(7,0)] = 0;
				   bricks[coord(9,0)] = 0;
				   bricks[coord(0,1)] = 0;
				   bricks[coord(2,1)] = 0;
				   bricks[coord(4,1)] = 0;
				   bricks[coord(6,1)] = 0;
				   bricks[coord(8,1)] = 0;
				   bricks[coord(1,2)] = 0;
				   bricks[coord(3,2)] = 0;
				   bricks[coord(5,2)] = 0;
				   bricks[coord(7,2)] = 0;
				   bricks[coord(9,2)] = 0;
				   bricks[coord(0,3)] = 0;
				   bricks[coord(2,3)] = 0;
				   bricks[coord(4,3)] = 0;
				   bricks[coord(6,3)] = 0;
				   bricks[coord(8,3)] = 0;
				   bricks[coord(1,4)] = 0;
				   bricks[coord(3,4)] = 0;
				   bricks[coord(5,4)] = 0;
				   bricks[coord(7,4)] = 0;
				   bricks[coord(9,4)] = 0;
				 }
				 
				 draw();
				}
				
				var brickwidth = 90;
				var brickheight = 45;
				var brickwidthpadding = brickwidth + 2;
				var brickheightpadding = brickheight + 2;
				
				
				var levels = [ init, init1, init2 ];
				var level = 0;
				
				
				var mouseX = 439;
				var mouseY = 0;
				
				var xBall = 459;
				var yBall = 525;
				
				var xBallSpeed = 1; // had to slow ball speed and increase repaint rate to avoid teleport error when looking for brick-side contact**********************
				var yBallSpeed = 1; // when changing ball speed remember there are 3 locations in the code where the ball speed is set/reset....
				
				var nLives = 3;
				var nBrickLives = 2;
				
				
						
					function draw()
					{
							 ctx.fillStyle="#ffffff";
							 ctx.fillRect(0,0,918,600);
							 
							 for(var t = 0; t < nLives; t = t + 1) 
							 {
							  //this loop draws the black balls in the bottom left indicating lives remaining
							  ctx.beginPath();
							  ctx.fillStyle = "#000000";
							  ctx.arc(25+15*t,585,5,0,2*Math.PI);
							  ctx.closePath();
							  ctx.fill();
							 }
							 
							 //these loops below color the grid blocks for each level
							 for(var y = 0 ; y < 5 ; y = y + 1)
							 {
							  for(var x = 0 ; x < 10 ; x = x + 1)
							  {
							  
							  if(bricks[coord(x,y)] == 3)
							   {
								ctx.fillStyle = colors3[coord(x,y)];
								ctx.fillRect(x * brickwidthpadding, y * brickheightpadding, brickwidth, brickheight);
							   }
							   
							   if(bricks[coord(x,y)] == 2 || (level == 0 && bricks[coord(x,y)]==1) )
							   {
								ctx.fillStyle = colors[coord(x,y)];
								ctx.fillRect(x * brickwidthpadding, y * brickheightpadding, brickwidth, brickheight);
							   }
							   
							   if(bricks[coord(x,y)] == 1)
							    {
								 ctx.fillStyle = colors2[coord(x,y)];
								 ctx.fillRect(x * brickwidthpadding, y * brickheightpadding, brickwidth, brickheight);
								}
							  }
							 }
							 
						if(state)
						{
							 ctx.fillStyle = "#000000";
							 ctx.fillRect(mouseX-45,550,90,20);
							 
						
							 xBall = xBall + xBallSpeed;
							 yBall = yBall - yBallSpeed;
							 
                            //*********************the next chunk of ifs causes the ball to bounce off the walls and the slider
							 if (xBall >= 918)
							  {
							   xBall = 918;
							   xBallSpeed = xBallSpeed * -1;
							  }
							 
							 if (xBall <= 0)
							   {
								xBall = 0;
								xBallSpeed = xBallSpeed * -1;
							   }
							   
							 if (yBall <= 0)
							  {
							   yBall = 0;
							   yBallSpeed = yBallSpeed * -1;
							  }
							  
							 if (xBall < (mouseX-30) && xBall >= (mouseX - 45) && (yBall >= 550) && yBall <= 570 && xBallSpeed > 0) //left edge hit coming from left
							   {
								yBall = 550;
								yBallSpeed = yBallSpeed * -1;
								xBallSpeed = xBallSpeed * -1;
							   }
							   else if (xBall < (mouseX-30) && xBall >= (mouseX - 45) && (yBall >= 550) && yBall <= 570 && xBallSpeed < 0) //left edge hit coming from right
							   {
								yBall = 550;
							    yBallSpeed = yBallSpeed * -1.03; //makes the ball go slightly faster
							   }
							 else if (xBall <= (mouseX + 45) && xBall > (mouseX + 30) && (yBall >= 550) && yBall <= 570 && xBallSpeed < 0) //right edge hit coming from right
							 {
							  yBall = 550;
							  yBallSpeed = yBallSpeed * -1;
							  xBallSpeed = xBallSpeed * -1;
							 }
						      else if (xBall <= (mouseX + 45) && xBall > (mouseX + 30) && (yBall >= 550) && yBall <= 570 && xBallSpeed > 0) //right edge hit coming from left
							 {
							  yBall = 550;
							  yBallSpeed = yBallSpeed * -1.03; //makes the ball go slightly faster
							 }
							 else if (xBall <= (mouseX + 30) && xBall >= (mouseX - 30) && (yBall >= 550) && yBall <= 570) //central hit
							 {	
							  yBall = 550;
							  yBallSpeed = yBallSpeed * -1.03; //makes the ball go slightly faster
							 }
							 
						
						      
							 ctx.beginPath();
							 ctx.fillStyle = "#000000";
							 ctx.arc(xBall,yBall,8,0,2*Math.PI); 
							 ctx.closePath();
							 ctx.fill();
							 
							 
							 if (yBall <= 233) //looks for brick/ball contact, then changes brick status and redirects ball
							  {
							   var brickx = Math.floor(xBall / 92);
							   var bricky = Math.floor(yBall / 47);
							   if (bricks[coord(brickx,bricky)] >= 1)
								{
                                 if((yBall%47 > 0 && yBall%47 < 46) && (xBall%92 >= 90 || xBall%92 <= 1)) // contact with left or right side of a brick   
                                  {
                                      xBallSpeed = xBallSpeed * -1;
                                     nbricks = nbricks - 1;
                                  }
                                  else //contact with top or bottom of brick
                                    {
                                        yBallSpeed = yBallSpeed * -1;
                                     nbricks = nbricks - 1;
                                    }
                                     
								}
							   bricks[coord(brickx,bricky)] = bricks[coord(brickx,bricky)] - 1;
							  }
						
						  
							  if (yBall >= 600)
							  {
							   if(nLives>0)
							   {
								nLives = nLives - 1;
								xBall = 459;
								yBall = 525;
								xBallSpeed = 1;
								yBallSpeed = 1;
								mouseX = 459;
								state = false;
							   }
							   else
							   {
							   ctx.fillStyle="#FF0000"; 
							   ctx.fillRect(159,150,600,300);
							   ctx.fillStyle="#FF8800";
							   ctx.fillRect(164,155,590,290);
							   ctx.fillStyle="#FFBB00";
							   ctx.fillRect(169,160,580,280);
							   ctx.fillStyle="#FFFF00";
							   ctx.fillRect(174,165,570,270);
							   ctx.fillStyle="#00FF00";
							   ctx.fillRect(179,170,560,260);
							   ctx.fillStyle="#00AAFF";
							   ctx.fillRect(184,175,550,250);
							   ctx.fillStyle="#0067FF";
							   ctx.fillRect(189,180,540,240);
							   ctx.fillStyle="#0000FF";
							   ctx.fillRect(194,185,530,230);
							   ctx.fillStyle="#AA00FF";							
							   ctx.fillRect(199,190,520,220);
							   ctx.fillStyle="#FF00FF";
							   ctx.fillRect(204,195,510,210);
							   ctx.font="100px Georgia";
							   ctx.fillStyle="#000000";
							   ctx.fillText("You Lose!",265,320,400);
							   }
							  }
							 
							  
									 
							 if(nbricks > 0)
							 {
                                 if(mousePress)
                                     {
                                         setTimeout(draw, 3);
                                     }
							  
							 }
							 else if(level < levels.length - 1)
							 {
							  level = level + 1;
							  
							  setTimeout(levels[level], 1000);
							  ctx.fillStyle="#FF0000"; 
							    xBall = 459; // reset ball position after death
								yBall = 525; // reset ball position after death
								xBallSpeed = 1; // reset ball speed after death
								yBallSpeed = 1; // reset ball speed after death
								mouseX = 459;
							  ctx.fillRect(0,0,918,600);
							  ctx.fillStyle="#FF8800";
							  ctx.fillRect(20,20,878,560);
							  ctx.fillStyle="#FFBB00";
							  ctx.fillRect(40,40,838,520);
							  ctx.fillStyle="#FFFF00";
							  ctx.fillRect(60,60,798,480);
							  ctx.fillStyle="#00FF00";
							  ctx.fillRect(80,80,758,440);
							  ctx.fillStyle="#00AAFF";
							  ctx.fillRect(100,100,718,400);
							  ctx.fillStyle="#0067FF";
							  ctx.fillRect(120,120,678,360);
							  ctx.fillStyle="#0000FF";
							  ctx.fillRect(140,140,638,320);
							  ctx.fillStyle="#AA00FF";							
							  ctx.fillRect(160,160,598,280);
							  ctx.fillStyle="#FF00FF";
							  ctx.fillRect(180,180,558,240);
							  ctx.font="100px Georgia";
							  ctx.fillStyle="#000000";
							  ctx.fillText("NEXT LEVEL!!",184,320,550);
							  var bodys = document.getElementById("page");
							  switch(level)
							   {
							    case 0: bodys.setAttribute("style", "background-color: rgb(0,0,0);"); break;
							    case 1: bodys.setAttribute("style", "background-color: rgb(0,0,0);"); break;
							    case 2: bodys.setAttribute("style", "background: -moz-linear-gradient( top , rgba(255, 0, 0, 1) 0%, rgba(255, 255, 0, 1) 15%, rgba(0, 255, 0, 1) 30%, rgba(0, 255, 255, 1) 50%, rgba(0, 0, 255, 1) 65%,rgba(255, 0, 255, 1) 80%,rgba(255, 0, 0, 1) 100%);background: -webkit-gradient(linear,  left top,  left bottom, color-stop(0%, rgba(255, 0, 0, 1)), color-stop(15%, rgba(255, 255, 0, 1)),color-stop(30%, rgba(0, 255, 0, 1)),color-stop(50%, rgba(0, 255, 255, 1)),color-stop(65%, rgba(0, 0, 255, 1)),color-stop(80%, rgba(255, 0, 255, 1)),color-stop(100%, rgba(255, 0, 0, 1)));};"); break;
							   }
							  }
							 else
							 {
							   ctx.fillStyle="#FF0000"; 
							   ctx.fillRect(159,150,600,300);
							   ctx.fillStyle="#FF8800";
							   ctx.fillRect(164,155,590,290);
							   ctx.fillStyle="#FFBB00";
							   ctx.fillRect(169,160,580,280);
							   ctx.fillStyle="#FFFF00";
							   ctx.fillRect(174,165,570,270);
							   ctx.fillStyle="#00FF00";
							   ctx.fillRect(179,170,560,260);
							   ctx.fillStyle="#00AAFF";
							   ctx.fillRect(184,175,550,250);
							   ctx.fillStyle="#0067FF";
							   ctx.fillRect(189,180,540,240);
							   ctx.fillStyle="#0000FF";
							   ctx.fillRect(194,185,530,230);
							   ctx.fillStyle="#AA00FF";							
							   ctx.fillRect(199,190,520,220);
							   ctx.fillStyle="#FF00FF";
							   ctx.fillRect(204,195,510,210);
							   ctx.font="100px Georgia";
							   ctx.fillStyle="#000000";
							   ctx.fillText("You Win!",265,320,400);
							 }
					    }
					else
					 {
					 state = true;
					 setTimeout(draw, 2000);
					 ctx.fillStyle="#FF0000"; 
				     ctx.fillRect(0,0,918,600);
				     ctx.fillStyle="#FF8800";
				     ctx.fillRect(20,20,878,560);
				     ctx.fillStyle="#FFBB00";
				     ctx.fillRect(40,40,838,520);
				     ctx.fillStyle="#FFFF00";
				     ctx.fillRect(60,60,798,480);
				     ctx.fillStyle="#00FF00";
				     ctx.fillRect(80,80,758,440);
				     ctx.fillStyle="#00AAFF";
				     ctx.fillRect(100,100,718,400);
  				     ctx.fillStyle="#0067FF";
				     ctx.fillRect(120,120,678,360);
			   	     ctx.fillStyle="#0000FF";
				     ctx.fillRect(140,140,638,320);
				     ctx.fillStyle="#AA00FF";							
				     ctx.fillRect(160,160,598,280);
				     ctx.fillStyle="#FF00FF";
				     ctx.fillRect(180,180,558,240);
				     ctx.font="100px Georgia";
				     ctx.fillStyle="#000000";
				     ctx.fillText("HAHA YOU MESSED UP!",184,320,550);		  
					 }
					}
				
				c.onmousemove = function(event)
				{
				 mouseX = event.offsetX;
				 mouseY = event.offsetY;
				 
				}