
//Website for making the Snake Game, https://www.makeuseof.com/javascript-html-css-snake-game-make/

var board = document.getElementById("board");
//renders my board 2D
var board2d = board.getContext("2d");

//setting in game variables and the size of the board
var gameEnd= false;
board.width = 400;
board.height= 400;

//inital direction
var directionx = 10;
var directiony = 0;

//snake vars
var snakeSegments= [];
var snakeLength = 1;

var snakex = 200;
var snakey = 200;

var dots = [];

var highest=0;

document.getElementById("highest").innerHTML = `<section><h2>Highest score : ${highest}</h2></section>`;

document.getElementById("current").innerHTML = `<section><h2>Current score : ${snakeLength}</h2></section>`;

//moves the snake by updating the snakes coordinates
function moveSnake(){
  snakeSegments.unshift({x : snakex, y : snakey});
  
  snakex += directionx;
  snakey += directiony;

  
}

//colors the snake
function drawSnake(){
  board2d.clearRect(0, 0, board.width, board.height);
  board2d.fillStyle = "green";
  while(snakeSegments.length > snakeLength) {
    snakeSegments.pop();
  }
  

  //Makes the squares that makes up the snake
  for(var i = 0; i < snakeSegments.length; i++){
    board2d.fillRect(snakeSegments[i].x,snakeSegments[i].y,10,10);
  }
}
//keeps on updating the board/ runs the board
function gameloop(){
  moveSnake();
  drawSnake();
  spawnDots();
  checkCollision();
  if(!gameEnd){
    setTimeout(gameloop, 100);
  }
}


//event handler tochange direction of snake
document.onkeydown = function(event) {
  if (directionx == 10 || directionx == -10 ) { // If going right or left
    switch (event.keyCode){
      case 38:  //up arrow
        directionx = 0;
        directiony = -10;
        break;
      case 40:  //down arrow
        directionx = 0;
        directiony = 10;
        break;
    }
  } else {
  switch (event.keyCode){
    case 37:  //left arrow
      directionx = -10;
      directiony = 0;
      break;
    case 39:  //right arrow
      directionx = 10;
      directiony = 0;
      break;
    }
  }
};
//makes the coordinates of the dots
//fix to spawn same axis as snake, it dosen't spawn on the same as snake
function spawnDots(){
  if(dots.length < 10) {
    var dotx = Math.floor(Math.random() * board.width);
    dotx = Math.ceil((dotx + 1)/10)*10;
    var doty = Math.floor(Math.random() * board.height);    
    doty = Math.ceil((doty + 1)/10)*10;
    dots.push({x : dotx, y : doty});
  }
  //makes the dots
  for(var i = 0; i < dots.length; i++) {
    board2d.fillStyle = "red";
    board2d.fillRect(dots[i].x, dots[i].y, 10, 10)
  }
}

//checks when the snake collides with anthing (wall, apple, or itself)
function checkCollision(){
  console.log("Game Over")
  //when we hit a apple the snake grows
  for(var i = 0 ; i < dots.length; i++){
    if(snakex < dots[i].x + 10 && 
       snakex + 10 > dots[i].x && 
       snakey < dots[i].y + 1 && 
       snakey + 10 > dots[i].y){
      snakeLength++; 
      dots.splice(i,1);
      document.getElementById("current").innerHTML = `<section><h2>Current score : ${snakeLength}</h2></section>`;
    }
  }
//Ends the game if we hit ourself
  for(var i = 0; i < snakeSegments.length; i++){
    if( snakex === snakeSegments[i].x && snakey === snakeSegments[i].y){
      gameOver();
    }
  }
  // ends the game if we hit any walls
  if(snakex < -10 || snakey < -10 || snakex > board.width + 10 || snakey > board.height + 10){
    gameOver();
  }
}
function gameOver(){
  setTimeout(function(){
    alert("Game Over");
  }, 500);
  gameEnd = true;
  if (highest < snakeLength){
    highest = snakeLength; 
  }
  // console.log(snakeSegments.length)
  document.getElementById("highest").innerHTML = `<section><h2>Highest score : ${highest}</h2></section>`;
}

document.getElementById("start").addEventListener("click", function(){
  Restart();
  
   document.getElementById("current").innerHTML = `<section><h2>Current score : ${snakeLength}</h2></section>`;
  gameloop();
})

function Restart(){
  gameEnd = false;
  snakeSegments= [];
  snakeLength = 1;

  snakex = 200;
  snakey = 200;

  dots = [];

  
}
