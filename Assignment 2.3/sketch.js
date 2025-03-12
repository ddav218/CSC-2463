let osc, noise, env, filter, lfo;
let showImage = false;

function preload() {
  img = loadImage('assets/vault.jpg');
}

function setup() {
  createCanvas(800, 800);
  osc = new p5.Oscillator('sawtooth');
  noise = new p5.Noise('brown');
  filter = new p5.BiquadFilter();
  lfo = new p5.Oscillator('triangle');
  env = new p5.Envelope();

  filter.freq(400);
  filter.res(8);
  osc.disconnect();
  osc.connect(filter);
  noise.disconnect();
  noise.connect(filter);
  filter.connect(p5.soundOut);

  env.setADSR(0.05, 0.2, 0.3, 0.5);
  env.setRange(0.8, 0);
  
  lfo.freq(2);
  lfo.amp(200);
  lfo.disconnect();
  lfo.connect(filter.frequency);
}

function draw() {
  background(50);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Click to turn the vault!", width / 2, height / 2);
  
  if (showImage) {
    image(img, width / 2 - 50, height / 2 - 50, 100, 100);
  }
}

function mousePressed() {
  showImage = true;
  playSoundEffect();
  setTimeout(() => showImage = false, 1000);
}

function playSoundEffect() {
  osc.freq(100);
  osc.start();
  noise.start();
  lfo.start();
  env.play(osc);
  env.play(noise);
  
  setTimeout(() => {
    osc.freq(60, 0.5);
  }, 300);
  
  setTimeout(() => {
    osc.stop();
    noise.stop();
    lfo.stop();
  }, 1000);
}
