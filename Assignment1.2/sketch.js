let maker = "black"

function setup() {
  createCanvas(1000, 1000);
  //colorMode(HSB);
  background(250);
  angleMode(DEGREES);
}

function draw() {

 fill(0,0);
 rect(0,0,1000,1000);
 strokeWeight(0);
 strokeWeight(10);
 stroke("black");

 fill("red");
 rect(0,0,100,100);

 fill("orange");
 rect(0,100,100,100);

 fill("yellow");
 rect(0,200,100,100);

 fill("green");
 rect(0,300,100,100);

 fill("cyan");
 rect(0,400,100,100);

 fill("blue");
 rect(0,500,100,100);

 fill("magenta");
 rect(0,600,100,100);

 fill("brown");
 rect(0,700,100,100);

 fill("white");
 rect(0,800,100,100);

 fill("black");
 rect(0,900,100,100)

 strokeWeight(5);
 fill(250);
 rect(900,900,100,100)
 fill(0);
 text("Eraser",930,950);

  if(mouseIsPressed){
  stroke(maker);
  line(mouseX,mouseY,pmouseX,pmouseY);
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100 && mouseIsPressed){
    maker = ["red"];
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 100 && mouseY < 200 && mouseIsPressed){
    maker = ["orange"];
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 200 && mouseY < 300 && mouseIsPressed){
    maker = ["yellow"];
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 300 && mouseY < 400 && mouseIsPressed){
    maker = ["green"];
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 400 && mouseY < 500 && mouseIsPressed){
    maker = ["cyan"];
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 500 && mouseY < 600 && mouseIsPressed){
    maker = ["blue"];
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 600 && mouseY < 700 && mouseIsPressed){
    maker = ["magenta"];
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 700 && mouseY < 800 && mouseIsPressed){
    maker = ["brown"];
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 800 && mouseY < 900 && mouseIsPressed){
    maker = ["white"];
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 900 && mouseY < 1000 && mouseIsPressed){
    maker = ["black"];
  }

  strokeWeight(50);
  if(mouseX > 900 && mouseX < 1000 && mouseY > 900 && mouseY < 1000 && mouseIsPressed){
    strokeWeight(50);
    maker = [" light grey"];
    strokeWeight(50);
    stroke(0);
  }

}