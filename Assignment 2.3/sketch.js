let waterGun;
let shooting = false;

function setup() {
    createCanvas(800, 800);
    waterGun = loadImage("assets/waterGun.png"); 
}

function draw() {
    
    background(220);
    textAlign(CENTER, TOP);
    textSize(36);
    fill(0);
    text("Click the gun to splash water", 400, 75);
    image(waterGun, 100, 150, 300, 150);
    
    if (shooting) {
        drawWaterStream();
    }
}

function drawWaterStream() {
    stroke(0, 0, 255);
    strokeWeight(4);
    for (let i = 0; i < 5; i++) {
        line(300, 215, 480 + random(-10, 10), 190 + random(-20, 20));
    }
    noStroke();
}

function mousePressed() {
    shooting = true;
    playWaterGun();
    setTimeout(() => shooting = false, 500);
}

function playWaterGun() {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let bufferSize = audioCtx.sampleRate * 0.2;
    let buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    let output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / bufferSize * 10);
    }
    
    let noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = false;
    
    let filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.2);
    
    let gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.8, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    noise.start();
}
