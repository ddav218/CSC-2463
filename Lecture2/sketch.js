let x = 200 , y = 200
let drag = false;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(50);

  if(drag){
    fill("purple");
  }
  else{
    fill(255);
  }
  square(x,y,100);

}

function mousePressed(){
  console.log("mouse pressed!");
  if( drag || (mouseX >= x && mouseX <= x+100 && mouseY >= y && mouseY <= y+100)){
    drag = true;
   
 }
}

function mouseMoved(){
  console.log(`mouse position: (${mouseX},${mouseY}`);
 if(drag){
   x += mouseX - pmouseX;
   y += mouseY - pmouseY;
  }
}

function mouseRelease(){
  drag = false;
}