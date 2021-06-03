var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database ;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairBalloon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {

  database=firebase.database();
  createCanvas(1000,500);

  //read from database
  var balloonPosition =database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showError);


  balloon=createSprite(250,550,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20);

}
  
// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(10,0);
  
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-10);
    balloon.scale = balloon.scale-0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,+10);
    balloon.scale = balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use Arrow Keys to move the Hot Air Balloon!",40,40);
}
// creating the updateHeight function 
function updateHeight(x,y){
  database.ref('balloon/height').set({
      'x':height.x+x,
      'y':height.y+y
  })
}
//creating the readHeight function
function readHeight(data) { 
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
//creating the showError function
  function showError() { 
    console.log("Error");
}
