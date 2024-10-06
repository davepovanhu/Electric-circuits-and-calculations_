let voltageSlider, resistanceSlider;
let voltage = 10;
let resistance = 10;
let current = 0;
let circuitType = 'series';
let isPlaying = false;
let currentArrowPosition = 0;

function setup() {
    const canvas = createCanvas(600, 450);
    canvas.parent('container');

    voltageSlider = select('#voltageSlider');
    resistanceSlider = select('#resistanceSlider');

    select('#circuitType').changed(updateCircuitType);
    select('#playButton').mousePressed(playSimulation);
    select('#pauseButton').mousePressed(pauseSimulation);

    frameRate(30);
}

function draw() {
    background(30);
    drawCircuit();

    updateVoltage();
    updateResistance();
    calculateCurrent();
    displayCalculations();

    if (isPlaying) {
        animateCurrentFlow(); // Animate the current flow
    }
}

function drawCircuit() {
    stroke(255);
    strokeWeight(2);
    drawBattery(100, height / 2);

    if (isPlaying) {
        if (circuitType === 'series') {
            drawWire(150, height / 2, 400, height / 2); // Wire to resistor
            drawResistor(400, height / 2 - 50); // Resistor
            drawWire(400, height / 2 - 50, 400, height / 2 - 150); // Down wire
            drawWire(400, height / 2 - 150, 150, height / 2 - 150); // Left wire
            drawWire(150, height / 2 - 150, 150, height / 2); // Up wire
            drawBulb(400, height / 2); // Bulb
        } else if (circuitType === 'parallel') {
            drawWire(150, height / 2, 300, height / 2); // Wire to branch 1
            drawWire(300, height / 2, 300, height / 2 - 150); // Branch 1 down
            drawResistor(300, height / 2 - 150); // Resistor in branch 1
            drawWire(300, height / 2 - 150, 150, height / 2 - 150); // Left wire from branch 1
            drawWire(150, height / 2 - 150, 150, height / 2); // Up wire from branch 1

            drawWire(300, height / 2, 400, height / 2); // Wire to branch 2
            drawWire(400, height / 2, 400, height / 2 - 150); // Branch 2 down
            drawResistor(400, height / 2 - 150); // Resistor in branch 2
            drawBulb(400, height / 2); // Bulb in branch 2
        }
    }
}

function drawBattery(x, y) {
    strokeWeight(4);
    line(x, y - 30, x, y + 30);
    strokeWeight(2);
    line(x + 10, y - 20, x + 10, y + 20);
}

function drawResistor(x, y) {
    fill(255);
    rect(x - 25, y - 10, 50, 20);
}

function drawWire(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
}

function drawBulb(x, y) {
    let brightness = map(current, 0, voltage / resistance, 0, 255);
    fill(brightness > 255 ? 255 : brightness, brightness > 0 ? brightness : 0, 0);
    ellipse(x, y, 30, 30);
}

function updateVoltage() {
    voltage = voltageSlider.value();
    select('#voltageOutput').html(voltage);
}

function updateResistance() {
    resistance = resistanceSlider.value();
    select('#resistanceOutput').html(resistance);
}

function updateCircuitType() {
    circuitType = select('#circuitType').value();
}

function calculateCurrent() {
    if (resistance !== 0) {
        if (circuitType === 'series') {
            current = voltage / resistance;
        } else if (circuitType === 'parallel') {
            current = voltage / (resistance / 2);
        }
    } else {
        current = 0;
    }
}

function displayCalculations() {
    select('#currentOutput').html(current.toFixed(2) + ' A');
}

function animateCurrentFlow() {
    stroke(255, 150, 0);
    fill(255, 150, 0);

    if (circuitType === 'series') {
        drawArrowInLoop();
    } else if (circuitType === 'parallel') {
        drawArrowsInParallel();
    }

    currentArrowPosition += current * 2;

    // Reset current position after completing a loop
    if (currentArrowPosition > 800) {
        currentArrowPosition = 0; // Reset position to loop again
    }
}

function drawArrowInLoop() {
    let arrowPos = currentArrowPosition % 800; // Total length of the series circuit path

    if (arrowPos < 250) {
        drawArrow(150 + arrowPos, height / 2); // Arrow moving right along the top wire
    } else if (arrowPos < 400) {
        drawArrow(400, height / 2 - (arrowPos - 250)); // Arrow moving down through the resistor
    } else if (arrowPos < 650) {
        drawArrow(400 - (arrowPos - 400), height / 2 - 150); // Arrow moving left along the bottom wire
    } else if (arrowPos < 800) {
        drawArrow(150, height / 2 - (arrowPos - 650)); // Arrow moving up back to battery
    }
}

function drawArrowsInParallel() {
    let branch1ArrowPos = currentArrowPosition % 600; // Length of one branch
    let branch2ArrowPos = (currentArrowPosition - 300) % 600; // Offset for the second branch

    if (branch1ArrowPos < 150) {
        drawArrow(150 + branch1ArrowPos, height / 2); // Arrow moving right along branch 1
    } else if (branch1ArrowPos < 300) {
        drawArrow(300, height / 2 - (branch1ArrowPos - 150)); // Arrow moving down through branch 1
    } else if (branch1ArrowPos < 450) {
        drawArrow(150, height / 2 - (branch1ArrowPos - 300)); // Arrow moving left back to battery
    }

    if (branch2ArrowPos < 150) {
        drawArrow(300 + branch2ArrowPos, height / 2); // Arrow moving right along branch 2
    } else if (branch2ArrowPos < 300) {
        drawArrow(400, height / 2 - (branch2ArrowPos - 150)); // Arrow moving down through branch 2
    } else if (branch2ArrowPos < 450) {
        drawArrow(300, height / 2 - (branch2ArrowPos - 300)); // Arrow moving left back to battery
    }
}

function drawArrow(x, y) {
    line(x - 5, y - 5, x, y);
    line(x, y, x - 5, y + 5);
}

function playSimulation() {
    isPlaying = true;
}

function pauseSimulation() {
    isPlaying = false;
}
