let gameState;
let imgBackground;
let imgSquish;
let bugMovement = [];
let bugs = [];
let score = 0;
let timer = 30;
let startTime;

function preload() {
  imgBackground = loadImage("assets/background.jpg");
  imgSquish = loadImage("assets/BugSprite4.png");
  bugMovement = [
    loadImage("assets/BugSprites1.png"),
    loadImage("assets/BugSprites2.png"),
    loadImage("assets/BugSprites3.png"),
  ];
}

function setup() {
  createCanvas(800, 800);
  gameState = 'start';
  loadBugs();
}

function draw() {
  background(imgBackground);
  if (gameState === 'start') {
    fill("brown");
    rect(200, 320, 400, 125, 5);
    fill("AntiqueWhite");
    textSize(45);
    text("Squash the bugs!", 220, 375);
    textSize(18);
    text("Mission: kill them all", 325, 405);
    text("Click to start", 480, 435);
    if (mouseIsPressed) {
      gameState = "play";
      startTime = millis();
    }
  } else if (gameState === "play") {
    let elapsedTime = (millis() - startTime) / 1000;
    let remainingTime = max(0, timer - elapsedTime);
    textSize(25);
    text("Time: " + remainingTime.toFixed(1), 650, 50);
    text("Score: " + score, 10, 50);

    for (let bug of bugs) {
      bug.move();
      bug.display();
    }

    if (remainingTime <= 0) {
      gameState = "gameOver";
    }
  } else if (gameState === "gameOver") {
    fill("red");
    textSize(50);
    text("Game Over!", 300, 400);
    textSize(30);
    text("Final Score: " + score, 320, 450);
  }
}

function loadBugs() {
  for (let i = 0; i < 20; i++) {
    let bug = new Bug(random(width), random(height), random(bugMovement));
    bugs.push(bug);
  }
}

class Bug {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.speed = random(1, 3);
    this.direction = random([0, 90, 180, 270]);
    this.squished = false;
    this.scale = 0.75;
  }

  move() {
    if (!this.squished) {
      if (this.direction === 0) this.y -= this.speed;
      else if (this.direction === 90) this.x += this.speed;
      else if (this.direction === 180) this.y += this.speed;
      else if (this.direction === 270) this.x -= this.speed;
      
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
  }

  display() {
    push();
    translate(this.x + 25, this.y + 25);
    rotate(radians(this.direction));
    imageMode(CENTER);
    if (this.squished) {
      image(imgSquish, 0, 0, 50, 50);
    } else {
      let frame = floor(frameCount / 10) % bugMovement.length;
      image(bugMovement[frame], 0, 0, 50, 50);
    }
    pop();
  }

  checkSquish(px, py) {
    if (px > this.x && px < this.x + 50 && py > this.y && py < this.y + 50) {
      this.squished = true;
      score++;
      setTimeout(() => {
        let index = bugs.indexOf(this);
        if (index > -1) {
          bugs.splice(index, 1);
          bugs.push(new Bug(random(width), random(height), random(bugMovement)));
        }
      }, 500);
    }
  }
}

function mousePressed() {
  for (let i = bugs.length - 1; i >= 0; i--) {
    bugs[i].checkSquish(mouseX, mouseY);
  }
}