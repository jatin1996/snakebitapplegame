
function init()
{
	canvas=document.getElementById('mycanvas');
	W=canvas.width= 1000;
	H=canvas.height= 1000;
	pen=canvas.getContext('2d');
	cs=66;
	score=5;
	food_image=new Image();
	food_image.src="apple.png";
	trophy=new Image();
	trophy.src="trophy.png";
	game_over=false;
	food=getRandomFood();
	snake={
		init_length:5,
		color: "blue",
		cells: [],
		direction:"right",
		createSnake: function()
		{
			for(var i=this.init_length;i>0;i--)
			{
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake: function()
		{
			for(var i=0;i<this.cells.length;i++)
			{
			pen.fillStyle=this.color;
			pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
			}
		},
		updateSnake: function()
		{
			
			var headX=this.cells[0].x;
			var headY=this.cells[0].y;
			if(headX==food.x&&headY==food.y)
			{
				food=getRandomFood();
				score++;
			}
			else
			{
			this.cells.pop();
			}	
			var nextX,nextY;
			if(this.direction=="right")
			{
				nextX=headX+1;
				nextY=headY;
			}
			else if(this.direction=="left")
			{
				nextX=headX-1;
				nextY=headY;
			}
			else if(this.direction=="down")
			{
				nextX=headX;
				nextY=headY+1;
			}
			else 
			{
				nextX=headX;
				nextY=headY-1;
			}
			var X=headX+1;
			var Y=headY;
			this.cells.unshift({x: nextX,y: nextY});
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
			}

		}
	};
	snake.createSnake();
	function keyPressed(e)
	{
		if(e.key=="ArrowRight")
			snake.direction="right";
		else if(e.key=="ArrowDown")
			snake.direction="down";
		else if(e.key=="ArrowLeft")
			snake.direction="left";
		else 
			snake.direction="up";
	}
	document.addEventListener('keydown',keyPressed);
}
function getRandomFood()
{
	var foodX=Math.round(Math.random()*(W-cs)/cs);
	var foodY=Math.round(Math.random()*(H-cs)/cs);
	var food={
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food;
}
function draw()
{
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.fillStyle="red";
	pen.drawImage(trophy,18,20,cs,cs);
	pen.drawImage(food_image,food.x*cs,food.y*cs,cs,cs);
	pen.font="40px Roboto";
	pen.fillText(score,70,70);
}
function update()
{
	snake.updateSnake();
}
function gameloop()
{
	if(game_over==true)
	{
		clearInterval(f);
		alert("gameisdesigned by jatin garg and its over buddy");
	}
	draw();
	update();
}
init();
var f=setInterval(gameloop,100);