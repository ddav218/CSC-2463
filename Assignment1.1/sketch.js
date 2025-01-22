function setup() {
  createCanvas(1000, 1000);
  //colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(250);

 //Example 1
 fill(255,255,255);
 strokeWeight(1.5);
 stroke("black");
 ellipse(145,500,215);
 rect(295,405,200,200);

 //Example 2
 noStroke();

 fill(255,0,0,85);
 ellipse(270,130,200);

 fill(0,0,255,75);
 ellipse(185,235,200);

 fill(0,255,0,100);
 ellipse(345,235,200);

 //Example 3
 noStroke();
 fill(255,206,87);
 ellipse(150,800.5,115);

 fill(250);
 triangle(155,800,75,863,75,733);

 fill(193,32,33);
 rect(300,785,100,60);
 ellipse(350,785,100);

 fill(255);
 ellipse(325,785,30);
 ellipse(375,785,30);

 fill(71,97,254);
 ellipse(325,785,20);
 ellipse(375,785,20);

 //Example 4
fill(35,100,5);
stroke(255);
ellipse(780,192,215);

fill(255,17,0);
beginShape();
vertex(780,85);
vertex(755,155);
vertex(680,155);
vertex(737,196);
vertex(715,280);
vertex(780,225);
vertex(855,280);
vertex(828,196);
vertex(880,155);
vertex(813,155);
vertex(780,85);
endShape(CLOSE);

}
