function preload() {
  doorbellSounds = [
      loadSound('assets/doorbell-1.mp3'),
      loadSound('assets/doorbell-2.mp3'),
      loadSound('assets/doorbell-3.mp3'),
      loadSound('assets/knock-1.mp3')
  ];
}

function setup() {
  createCanvas(800, 800);
  background(255);
 // fill(0); 
 // textSize(24); 
  //text("Click each button for different doorbell effects", 150, 425); 

  textSize(20);
  textAlign(CENTER, CENTER);
  
  buttons = [];
  doors = [];
  let labels = ["Ring Doorbell", "BuzzIn", "E-Doorbell", "Knock"];
  let colors = ['#8B4513', '#3357FF', '#FFFFFF', '#800080']; 
  let startX = 50;
  let startY = 50;
  let doorWidth = 150;
  let doorHeight = 300;
  let buttonHeight = 40;
  
  for (let i = 0; i < 4; i++) {
      let x = startX + i * (doorWidth + 20);
      let y = startY;
      if (i === 1) {
          doors.push(new StorageDoor(x, y, doorWidth, doorHeight)); 
      } else {
          doors.push(new HouseDoor(x, y, doorWidth, doorHeight, colors[i])); 
      }
      buttons.push(new Button(x + doorWidth / 2 - 50, y + doorHeight / 4, 120, buttonHeight + 10, labels[i], i));
  }
}

function draw() {
  background(255);
  for (let door of doors) {
      door.show();
  }
  for (let button of buttons) {
      button.show();
  }
}

function mousePressed() {
  for (let button of buttons) {
      if (button.isClicked(mouseX, mouseY)) {
          doorbellSounds[button.index].play();
      }
  }
}

class HouseDoor {
  constructor(x, y, w, h, color) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = color;
  }
  
  show() {
      fill(this.color);
      rect(this.x, this.y, this.w, this.h);
      if (this.color === '#FFFFFF') {
          stroke(0);
          strokeWeight(3);
          noFill();
          rect(this.x, this.y, this.w, this.h);
          noStroke();
      }
      fill(0);
      rect(this.x + this.w - 20, this.y + this.h / 2 - 10, 10, 10); 
  }
}

class StorageDoor {
  constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  }
  
  show() {
      fill('#3357FF'); 
      rect(this.x, this.y, this.w, this.h);
      fill(0);
      rect(this.x + this.w / 3, this.y + this.h / 2, this.w / 3, 5); 
  }
}

class Button {
  constructor(x, y, w, h, label, index) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.label = label;
      this.index = index;
  }
  
  show() {
      fill(200);
      rect(this.x, this.y, this.w, this.h, 5);
      fill(0);
      textSize(14);
      text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  }
  
  isClicked(px, py) {
      return px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h;
  }
}
