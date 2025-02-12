let puppy, ghost;
let dogMovement = [];
let frameIndex = 0;
let frameRateSpeed = 8; 
let imgGrass;
let imgGhost;

function preload() {
  dogMovement = [
    loadImage("assets/gooddogs1.png"),
    loadImage("assets/gooddogs2.png"),
    loadImage("assets/gooddogs3.png")
  ];
  imgGrass = loadImage("assets/grass.jpg");
  imgGhost = loadImage("assets/ghost.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  puppy = new SpriteAnimation(dogMovement, 5);
  puppy.scale = 4;
  ghost = new SpriteAnimation([imgGhost], 5);
  ghost.scale = 4;
  ghost.position = createVector(width / 2 - 100, height / 2);
}

function draw() {
  background(imgGrass);
 
  ghost.update();
  ghost.draw();
  
  puppy.update();
  puppy.draw();

  
  if (keyIsPressed) {
    if (keyCode == UP_ARROW) {
      puppy.position.y -= 4;
      ghost.position.y -= 4;
    }
    if (keyCode == DOWN_ARROW) {
      puppy.position.y += 4;
      ghost.position.y += 4;
    }
    if (keyCode == RIGHT_ARROW) {
      puppy.position.x += 4;
      puppy.mirrorX(-1);

      ghost.position.x += 4;
      ghost.mirrorX(1);
    }
    if (keyCode == LEFT_ARROW) {
      puppy.position.x -= 4;
      puppy.mirrorX(1);

      ghost.position.x -= 4;
      ghost.mirrorX(-1);
    }
  }
}

class SpriteAnimation {
  constructor(frames, speed) {
    this.frames = frames;
    this.index = 0;
    this.speed = speed;
    this.position = createVector(width / 2, height / 2);
    this.mirror = 1;
  }

  update() {
    if (frameCount % frameRateSpeed === 0) {
      this.index = (this.index + 1) % this.frames.length;
    }
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    scale(this.mirror, 1);
    image(this.frames[this.index], -40, -40, 80, 80);
    pop();
  }

  mirrorX(dir) {
    this.mirror = dir;
  }
}
