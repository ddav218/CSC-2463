let cannonX, cannonY;
let imgWheel, imgCannon, imgShooter, imgBackground, imgEnemy;
let terrainPoints = [], craters = [], enemies = [], bullets = [];

let port;
let countdownInProgress = false;
let wheelRotation = 0;
let flashRed = false;
let flashTimer = 0;
let score = 0;

let cannonShotSound, bgMusic, destroySound, gameOverSound;
let lives = 3;
let gameStarted = false;
let gameConnected = false;
let gameOver = false;

let joystickX = 512;
let joystickY = 512;
let joystickClick = false;
let externalButtonClick = false;

function preload() {
  cannonShotSound = loadSound("assets/laserShoot.mp3");
  bgMusic = loadSound("assets/backgroundMusic.mp3");
  destroySound = loadSound("assets/breakRock.mp3");
  gameOverSound = loadSound("assets/gameOver.mp3");

  imgWheel = loadImage("assets/SpaceWheel.png");
  imgCannon = loadImage("assets/Cannon.png");
  imgShooter = loadImage("assets/GalaxyShooter.png");
  imgBackground = loadImage("assets/galaxyBackground.png");
  imgEnemy = loadImage("assets/asteroid.png");
}

function setup() {
  createCanvas(800, 600);
  userStartAudio();
  cannonX = width / 2;
  cannonY = height - 60;
  generateMoonSurface();

  port = createSerial();
  textSize(18);
  if (bgMusic?.isLoaded()) {
    bgMusic.setVolume(0.3);
    bgMusic.loop();
  }
}

function draw() {
  imageMode(CORNER);
  image(imgBackground, 0, 0, width, height);
  drawStars();
  drawMoonSurface();

  if (!gameStarted) {
    showStartScreen();
    return;
  }

  if (!gameConnected) {
    showConnectionScreen();
    return;
  }

  handleJoystickInput();
  drawCannon();
  handleEnemies();
  handleBullets();
  displayHUD();

  if (flashRed && millis() - flashTimer > 200) {
    flashRed = false;
  }

  if (gameOver) {
    showGameOver();
    return;
  }

  if (port.opened()) {
    let str = port.readUntil('\n');
    if (str !== "") {
      str = str.trim();
      const values = str.split(',');
      if (values.length === 4) {
        joystickX = Number(values[0]);
        joystickY = Number(values[1]);
        joystickClick = Number(values[2]) === 1;
        externalButtonClick = Number(values[3]) === 1;
      }
    }
  }
}

function handleJoystickInput() {
  let dx = map(joystickX, 1023, 0, -2.5, 2.5);
  if (abs(dx) < 0.1) dx = 0;
  cannonX += dx * 5.5;
  cannonX = constrain(cannonX, 50, width - 50);
  if (dx !== 0) {
    wheelRotation += dx * 0.1;
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    port.open('Arduino', 9600);
    gameConnected = true;
  }
}

function keyPressed() {
  if ((key === ' ' || joystickClick || externalButtonClick) && gameStarted && gameConnected && !gameOver) {
    bullets.push(new Bullet(cannonX, cannonY - 80));
    if (cannonShotSound?.isLoaded()) cannonShotSound.play();
    if (port.opened()) port.write("FIRE\n");

    joystickClick = false;
    externalButtonClick = false;
  }

  if (gameOver && (key === 'r' || key === 'R')) {
    restartGame();
  }
}

function showStartScreen() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(26);
  text("Welcome to SPACE BLAST", width / 2, height / 2 - 60);
  textSize(18);
  text("The whole defense of our Moon depends on you.", width / 2, height / 2 - 30);
  text("Destroy all the asteroids in time to save the Moon!", width / 2, height / 2);
  textSize(20);
  text("Click anywhere to start...", width / 2, height / 2 + 40);
}

function showConnectionScreen() {
  textAlign(CENTER, CENTER);
  fill(255);
  text("Connecting to Arduino...", width / 2, height / 2);
}

function showGameOver() {
  background(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255, 0, 0);
  text("Game Over", width / 2, height / 2 - 20);
  textSize(20);
  fill(255);
  text("Final Score: " + score, width / 2, height / 2 + 10);
  text("Press 'R' to restart", width / 2, height / 2 + 40);
}

function restartGame() {
  lives = 3;
  score = 0;
  bullets = [];
  enemies = [];
  flashRed = false;
  gameOver = false;
  loop();
  if (bgMusic?.isLoaded()) bgMusic.loop();
}

function drawCannon() {
  imageMode(CENTER);
  if (flashRed) {
    tint(255, 0, 0);
  } else {
    noTint();
  }
  image(imgCannon, cannonX, cannonY - 20, 150, 150);
  noTint();

  let wheelSize = 75;
  let wheelOffsetY = 30;
  let wheelOffsetX = 40;

  push();
  translate(cannonX - wheelOffsetX, cannonY + wheelOffsetY);
  rotate(wheelRotation);
  image(imgWheel, 0, 0, wheelSize, wheelSize);
  pop();

  push();
  translate(cannonX + wheelOffsetX, cannonY + wheelOffsetY);
  rotate(wheelRotation);
  image(imgWheel, 0, 0, wheelSize, wheelSize);
  pop();
}

function drawStars() {
  stroke(255);
  strokeWeight(1);
  for (let i = 0; i < 80; i++) {
    point(random(width), random(height));
  }
}

function generateMoonSurface() {
  for (let x = 0; x <= width; x += 40) {
    let y = height - 40 - random(5, 20);
    terrainPoints.push({ x, y });
  }
  for (let i = 0; i < 5; i++) {
    let cx = map(i, 0, 4, 80, width - 80);
    let cy = random(height - 45, height - 35);
    craters.push({ cx, cy });
  }
}

function drawMoonSurface() {
  noStroke();
  fill(80);
  beginShape();
  vertex(0, height);
  vertex(0, height - 40);
  for (let pt of terrainPoints) vertex(pt.x, pt.y);
  vertex(width, height - 40);
  vertex(width, height);
  endShape(CLOSE);

  for (let crater of craters) {
    fill(60);
    ellipse(crater.cx, crater.cy, 30, 15);
    fill(50);
    ellipse(crater.cx + 5, crater.cy + 2, 10, 5);
  }
}

function handleEnemies() {
  if (!countdownInProgress) startCountdownToSpawn();

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update();
    enemies[i].display();

    if (enemies[i].y + enemies[i].size / 2 >= cannonY - 80 &&
        enemies[i].x > cannonX - 60 && enemies[i].x < cannonX + 60) {
      enemies.splice(i, 1);
      lives--;
      flashRed = true;
      flashTimer = millis();
      if (lives <= 0) {
        gameOver = true;
        bgMusic.stop();
        if (gameOverSound?.isLoaded()) gameOverSound.play();
      }
    }
  }
}

function startCountdownToSpawn() {
  countdownInProgress = true;
  for (let i = 5; i >= 0; i--) {
    setTimeout(() => {
      if (port.opened()) port.write("COUNT:" + i + "\n");
      if (i === 0) {
        enemies.push(new Enemy());
        countdownInProgress = false;
      }
    }, 500 * (5 - i));
  }
}

function handleBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();

    for (let j = enemies.length - 1; j >= 0; j--) {
      if (dist(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y) < enemies[j].size / 2) {
        score += enemies[j].value;
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        if (destroySound?.isLoaded()) destroySound.play();
        break;
      }
    }

    if (bullets[i] && bullets[i].isOffScreen()) bullets.splice(i, 1);
  }
}

function displayHUD() {
  fill(255);
  textSize(18);
  text(`Lives: ${lives}`, 30, 30);
  text(`Score: ${score}`, width - 150, 30);
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.speed = 7;
  }
  update() {
    this.y -= this.speed;
  }
  display() {
    imageMode(CENTER);
    image(imgShooter, this.x, this.y, this.size, this.size);
  }
  isOffScreen() {
    return this.y < -this.size;
  }
}

class Enemy {
  constructor() {
    this.x = random(50, width - 50);
    this.y = -50;
    this.size = random(80, 130);
    this.vx = random(-2, 2);
    this.vy = 0;
    this.gravity = 0.2;
    this.bounce = 0.8;
    this.groundY = height - 60;
    this.value = floor(random(1, 4));
  }
  update() {
    this.vy += this.gravity;
    this.y += this.vy;
    this.x += this.vx;
    if (this.y + this.size / 2 >= this.groundY) {
      this.y = this.groundY - this.size / 2;
      this.vy *= -this.bounce;
    }
    if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
      this.vx *= -1;
      this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    }
  }
  display() {
    imageMode(CENTER);
    image(imgEnemy, this.x, this.y, this.size, this.size);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.value, this.x, this.y);
  }
  isOffScreen() {
    return this.y > height + this.size;
  }
}
