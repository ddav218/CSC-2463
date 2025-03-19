let maker = "black";
let synth;
let sparkleSound;
let colorSounds = {};

function setup() {
  createCanvas(1000, 1000);
  background(0);
  angleMode(DEGREES);

  Tone.start();
  
  synth = new Tone.Synth().toDestination();
  
  sparkleSound = new Tone.NoiseSynth({
    noise: "white",
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0,
      release: 0.05,
    }
  }).toDestination();
  
  colorSounds["red"] = () => {
    synth.triggerAttackRelease("C4", "8n");
  };
  
  colorSounds["orange"] = () => {
    synth.triggerAttackRelease("D4", "8n");
  };
  
  colorSounds["yellow"] = () => {
    synth.triggerAttackRelease("E4", "8n");
  };
  
  colorSounds["green"] = () => {
    synth.oscillator.type = "sawtooth";
    synth.triggerAttackRelease("F4", "8n");
  };
  
  colorSounds["cyan"] = () => {
    synth.oscillator.type = "square";
    synth.triggerAttackRelease("G4", "8n");
  };
  
  colorSounds["blue"] = () => {
    synth.oscillator.type = "triangle";
    synth.triggerAttackRelease("A4", "8n");
  };
  
  colorSounds["magenta"] = () => {
    const noiseSynth = new Tone.NoiseSynth().toDestination();
    noiseSynth.triggerAttackRelease("8n");
  };
  
  colorSounds["brown"] = () => {
    synth.triggerAttackRelease("B3", "8n");
  };
  
  colorSounds["white"] = () => {
    const whiteNoise = new Tone.Noise("white").toDestination();
    whiteNoise.start();
    whiteNoise.stop("+0.1");
  };
  
  colorSounds["black"] = () => {
    synth.triggerAttackRelease("C3", "2n");
  };
}

function draw() {
  fill(0, 0);
  rect(0, 0, 1000, 1000);
  strokeWeight(0);
  strokeWeight(10);
  stroke("black");

  fill("red");
  rect(0, 0, 100, 100);

  fill("orange");
  rect(0, 100, 100, 100);

  fill("yellow");
  rect(0, 200, 100, 100);

  fill("green");
  rect(0, 300, 100, 100);

  fill("cyan");
  rect(0, 400, 100, 100);

  fill("blue");
  rect(0, 500, 100, 100);

  fill("magenta");
  rect(0, 600, 100, 100);

  fill("brown");
  rect(0, 700, 100, 100);

  fill("white");
  rect(0, 800, 100, 100);

  fill("black");
  rect(0, 900, 100, 100);

  strokeWeight(5);
  fill(250);
  rect(900, 900, 100, 100);
  fill(0);
  text("Eraser", 930, 950);

  if (mouseIsPressed) {
    stroke(maker);
    line(mouseX, mouseY, pmouseX, pmouseY);
    sparkleSound.triggerAttackRelease("8n");  
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100 && mouseIsPressed) {
    maker = "red";
    colorSounds["red"]();  
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 100 && mouseY < 200 && mouseIsPressed) {
    maker = "orange";
    colorSounds["orange"]();
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 200 && mouseY < 300 && mouseIsPressed) {
    maker = "yellow";
    colorSounds["yellow"]();
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 300 && mouseY < 400 && mouseIsPressed) {
    maker = "green";
    colorSounds["green"]();
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 400 && mouseY < 500 && mouseIsPressed) {
    maker = "cyan";
    colorSounds["cyan"]();
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 500 && mouseY < 600 && mouseIsPressed) {
    maker = "blue";
    colorSounds["blue"]();
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 600 && mouseY < 700 && mouseIsPressed) {
    maker = "magenta";
    colorSounds["magenta"]();
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 700 && mouseY < 800 && mouseIsPressed) {
    maker = "brown";
    colorSounds["brown"]();
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 800 && mouseY < 900 && mouseIsPressed) {
    maker = "white";
    colorSounds["white"]();
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 900 && mouseY < 1000 && mouseIsPressed) {
    maker = "black";
    colorSounds["black"]();
  }

  if (mouseX > 900 && mouseX < 1000 && mouseY > 900 && mouseY < 1000 && mouseIsPressed) {
    maker = "white";
    colorSounds["white"]();
  }
}
