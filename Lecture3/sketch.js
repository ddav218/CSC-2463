let mike;
let rotation = 0;
let score = 0;
let time = 30;

function preload(){
  mike = loadImage("assets/miketiger.png");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  angleMode(DEGREES);
  textSize(30);

}

function draw() {
  background(25); 

  fill("white");
  text("Score: " + score, 10, 30);
  text("Time: " + time, 500, 30);

  translate(200,200);
  scale(0.25);
  rotate(rotation);
  image(mike,400,400);

  rotation+= 5;

  if(rotation >= 360){
    rotation -=360;
  }

  if(frameCount % 60 === 0){
    if(time === 0){
      noLoop();
    }
    time--;
  }

}

function keyTyped() {
  if(key === ' '){
    if(rotation >= 350 || rotation <= 10) {
      score++;
    } else {
      score--;
    }
  }
}