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

 strokeWeight(1);
 fill(250);
 rect(900,900,100,100)
 fill(0);
 text("Eraser",930,950);

  if(mouseIsPressed){
  stroke(maker);
  line(mouseX,mouseY,pmouseX,pmouseY);
  }

  if(mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseYY < 100 && mouseIsPressed){
    maker = ["red"];
  }

  if(mouseX > 100 && mouseX < 200 && mouseY > 100 && mouseYY < 200 && mouseIsPressed){
    maker = ["orange"];
  }

  if(mouseX > 200 && mouseX < 300 && mouseY > 200 && mouseYY < 300 && mouseIsPressed){
    maker = ["yellow"];
  }

  if(mouseX > 300 && mouseX < 400 && mouseY > 300 && mouseYY < 400 && mouseIsPressed){
    maker = ["green"];
  }

  if(mouseX > 400 && mouseX < 500 && mouseY > 400 && mouseYY < 500 && mouseIsPressed){
    maker = ["cyan"];
  }

  if(mouseX > 500 && mouseX < 600 && mouseY > 500 && mouseYY < 600 && mouseIsPressed){
    maker = ["blue"];
  }

  if(mouseX > 600 && mouseX < 700 && mouseY > 600 && mouseYY < 700 && mouseIsPressed){
    maker = ["magenta"];
  }

  if(mouseX > 700 && mouseX < 800 && mouseY > 700 && mouseYY < 800 && mouseIsPressed){
    maker = ["brown"];
  }

  if(mouseX > 800 && mouseX < 900 && mouseY > 800 && mouseYY < 900 && mouseIsPressed){
    maker = ["white"];
  }

  if(mouseX > 900 && mouseX < 1000 && mouseY > 900 && mouseYY < 1000 && mouseIsPressed){
    maker = ["black"];
  }

  if(mouseX > 900 && mouseX < 1000 && mouseY > 300 && mouseYY < 400 && mouseIsPressed){
    maker = ["green"];
  }

  strokeWeight(25);

}