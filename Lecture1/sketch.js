function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(50);

  fill(255);
  strokeWeight(1);
  stroke('black');
  square(400,400,100);

  fill(0,100,100,0.5);
  ellipse(425,425,25);
  ellipse(475,425,25);

  arc(450,465,75,25,0,180);

  fill(0);
  stroke('red');
  strokeWeight(5);
  beginShape();
  vertex(400,400);
  vertex(375,375);
  vertex(425,385);
  vertex(450,360);
  vertex(475,350);
  vertex(500,400);
  endShape(CLOSE);
}
