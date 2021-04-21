var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var position,database;
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(1500,700);
  database=firebase.database();
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonposition = database.ref('balloon/Position');
  balloonposition.on("value",readPos);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    //write code to move air balloon in left direction
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  if(keyDown(RIGHT_ARROW)){
    //write code to move air balloon in right direction
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  if(keyDown(UP_ARROW)){
    //write code to move air balloon in up direction
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale +0.01;
  }
   if(keyDown(DOWN_ARROW)){
    //write code to move air balloon in down direction
    updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale -0.01;
  }
  
  

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updateHeight(x,y){
  database.ref('balloon/Position').set({
    x: position.x + x,
    y: position.y + y
  })
}
function readPos(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}
