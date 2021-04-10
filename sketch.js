var balloon,balloonImg,bgImg;
var database,position;

function preload(){
bgImg=loadImage("images/cityImage.png");
balloonImg1=loadAnimation("images/hotairballoon1.png");
balloonImg2=loadAnimation("images/hotairballoon1.png","images/hotairballoon2.png","images/hotairballoon3.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,1000);
  balloon=createSprite(200, 200, 50, 50);
  balloon.addAnimation("balloon",balloonImg1);
  balloon.addAnimation("balloon1",balloonImg2);

  database.ref('balloon/height').on("value",readPosition,showError);
}
function readPosition(data){
  position = data.val();
 
  balloon.x = position.x;
  balloon.y = position.y;
}
function showError(){
  console.log("Error in writing to the database");
}
function updatePosition(x,y){
  database.ref('balloon/height').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function draw() {
  background(bgImg);  
  drawSprites();
  if(keyDown(LEFT_ARROW)){
    // balloon.x -=10;
    updatePosition(-10,0);
    balloon.changeAnimation("balloon1",balloonImg2);
  }else if(keyDown(RIGHT_ARROW)){
    // balloon.x +=10;
    updatePosition(10,0);
    balloon.changeAnimation("balloon1",balloonImg2);
  }else if(keyDown(UP_ARROW)){
    // balloon.y -=10;
    updatePosition(0,-10);
    balloon.changeAnimation("balloon1",balloonImg2);
    balloon.scale=balloon.scale -0.001;
  }else if(keyDown(DOWN_ARROW)){
    // balloon.y +=10;
    updatePosition(0,10);
    balloon.changeAnimation("balloon1",balloonImg2);
    balloon.scale=balloon.scale+0.001;
  }
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}