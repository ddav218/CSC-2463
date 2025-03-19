let waterGun;
let shooting = false;
let waterSound;

function setup() {
    createCanvas(800, 800);
    waterGun = loadImage("/assets/waterGun.png"); 

    waterSound = new Tone.NoiseSynth({
        noise: {
            type: "white", 
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0.2,
            release: 0.3
        },
    }).toDestination();
}

function draw() {
    background(220);
    textAlign(CENTER, TOP);
    textSize(36);
    fill(0);
    text("Click Gun to Shoot Water", 400, 65);
    image(waterGun, 100, 100, 300, 250);

    if (shooting) {
        drawWaterStream();
    }
}

function drawWaterStream() {
    stroke(0, 0, 255);
    strokeWeight(4);
    for (let i = 0; i < 5; i++) {
        line(400, 215, 480 + random(-10, 10), 190 + random(-20, 20));
    }
    noStroke();
}

function mousePressed() {
    shooting = true;
    playWaterGun();
    setTimeout(() => shooting = false, 500);
}

function playWaterGun() {
    waterSound.triggerAttackRelease("8n"); 
}
