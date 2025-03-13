//import * as Tone from 'tone';

let synth1, filt, distortion, metalSynth, noise1, ampEnv1, filt1;
let activeKey = null;
let filterSlider;

let keyNotes = {
  'a': 'A4', 
  's': 'B4', 
  'd': 'C5', 
  'f': 'D5',
  'g': 'E5', 
  'h': 'F5', 
  'j': 'G5', 
  'k': 'A5'
};

let metalKeys = {
  'q': 'C4',
  'w': 'D4', 
  'e': 'F4', 
  'r': 'G4',
  't': 'A4', 
  'y': 'B4', 
  'u': 'C5', 
  'i': 'D5'
};

function setup() {
  createCanvas(800, 800);

  let startButton = createButton("Start Audio");
  startButton.position(20, 400);
  startButton.mousePressed(() => {
    Tone.start().then(() => {
      console.log("Audio started!");
    });
  });

  filterSlider = createSlider(200, 5000, 1500, 1);
  filterSlider.position(20, 350);
  filterSlider.style('width', '360px');

  filt = new Tone.Filter(1500, "lowpass").toDestination();
  distortion = new Tone.Distortion(0.4).connect(filt);

  synth1 = new Tone.Synth({
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.9, release: 0.3 },
    oscillator: { type: 'sine' }
  }).connect(distortion);
  synth1.portamento = 0.5;

  metalSynth = new Tone.MetalSynth({
    frequency: 200,
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.0, release: 0.2 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  }).connect(distortion);
  
  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1, decay: 0.5, sustain: 0, release: 0.1
  }).toDestination();

  filt1 = new Tone.Filter(1500, "highpass").connect(ampEnv1);
  noise1 = new Tone.Noise('pink').start().connect(filt1);
}

function draw() {
  background(220);
 // fill("black");
  text("A-K: Synth Lead\nQ-I: Percussive Sounds\nZ: Noise Hit", 20, 20);
  text("Filter Adjust", 20, 340);
  filt.frequency.value = filterSlider.value();
}

function keyPressed() {
  let keyPressed = key.toLowerCase();
  let pitch = keyNotes[keyPressed];
  let metalPitch = metalKeys[keyPressed];

  if (pitch && keyPressed !== activeKey) {
   // console.log("Playing Synth:", pitch);
    synth1.triggerRelease();
    activeKey = keyPressed;
    synth1.triggerAttack(pitch);
  } else if (metalPitch) {
   // console.log("Playing Metal Synth:", metalPitch);
    metalSynth.triggerAttackRelease(metalPitch, '0.5');
  } else if (keyPressed === "z") {
   // console.log("Triggering Noise Hit");
    ampEnv1.triggerAttackRelease(0.1);
  }
}

function keyReleased() {
  let keyReleased = key.toLowerCase();

  if (keyReleased === activeKey) {
    synth1.triggerRelease();
    activeKey = null;
  }
}
