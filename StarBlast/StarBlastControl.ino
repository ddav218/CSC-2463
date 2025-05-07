// Segment display pins
const int a = 7, b = 6, c = 5, d = 11, e = 10, f = 8, g = 9, dp = 4;

// LED and joystick pins
const int blueLED = 13;
const int whiteLED = 12;
const int VRx = A0;
const int VRy = A1;
const int buttonPin = 2;

String inputString = "";
bool connected = false;
bool lastButtonState = HIGH;
bool joystickPressed = false;
bool externalButtonPressed = false;

void setup() {
  Serial.begin(9600);
  Serial.println("READY");

  // Segment display pins
  for (int i = 4; i <= 11; i++) {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW);
  }

  pinMode(blueLED, OUTPUT);
  pinMode(whiteLED, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);

  digitalWrite(blueLED, LOW);
  digitalWrite(whiteLED, LOW);
}

void loop() {
  // === Read serial from p5.js ===
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if (inChar == '\n') {
      inputString.trim();
      handleCommand(inputString);
      inputString = "";
    } else {
      inputString += inChar;
    }
  }

  // === Read Joystick + Button ===
  int xVal = analogRead(VRx);
  int yVal = analogRead(VRy);

  bool currentButtonState = digitalRead(buttonPin);
  if (lastButtonState == HIGH && currentButtonState == LOW) {
    joystickPressed = !joystickPressed;
  }
  lastButtonState = currentButtonState;

  // Send joystick data: x,y,joystickPress,externalButtonPress
  Serial.print(xVal);
  Serial.print(",");
  Serial.print(yVal);
  Serial.print(",");
  Serial.print(joystickPressed ? 1 : 0);
  Serial.print(",");
  Serial.println(externalButtonPressed ? 1 : 0);

  delay(50);
}

void handleCommand(String cmd) {
  if (cmd == "CONNECTED") {
    digitalWrite(blueLED, HIGH);
    connected = true;

  } else if (cmd == "FIRE") {
    digitalWrite(whiteLED, HIGH);
    delay(100);
    digitalWrite(whiteLED, LOW);

  } else if (cmd.startsWith("COUNT:")) {
    int digit = cmd.substring(6).toInt();
    clearDisplay();
    displayDigit(digit);
  }
}

void clearDisplay() {
  digitalWrite(a, LOW); digitalWrite(b, LOW); digitalWrite(c, LOW);
  digitalWrite(d, LOW); digitalWrite(e, LOW); digitalWrite(f, LOW);
  digitalWrite(g, LOW); digitalWrite(dp, LOW);
}

void displayDigit(int num) {
  switch (num) {
    case 0: display0(); break;
    case 1: display1(); break;
    case 2: display2(); break;
    case 3: display3(); break;
    case 4: display4(); break;
    case 5: display5(); break;
    case 6: display6(); break;
    case 7: display7(); break;
    case 8: display8(); break;
    case 9: display9(); break;
    default: clearDisplay(); break;
  }
}

// Digit display functions
void display0() { digitalWrite(a,HIGH); digitalWrite(b,HIGH); digitalWrite(c,HIGH); digitalWrite(d,HIGH); digitalWrite(e,HIGH); digitalWrite(f,HIGH); }
void display1() { digitalWrite(b,HIGH); digitalWrite(c,HIGH); }
void display2() { digitalWrite(a,HIGH); digitalWrite(b,HIGH); digitalWrite(g,HIGH); digitalWrite(e,HIGH); digitalWrite(d,HIGH); }
void display3() { digitalWrite(a,HIGH); digitalWrite(b,HIGH); digitalWrite(c,HIGH); digitalWrite(d,HIGH); digitalWrite(g,HIGH); }
void display4() { digitalWrite(f,HIGH); digitalWrite(b,HIGH); digitalWrite(g,HIGH); digitalWrite(c,HIGH); }
void display5() { digitalWrite(a,HIGH); digitalWrite(f,HIGH); digitalWrite(g,HIGH); digitalWrite(c,HIGH); digitalWrite(d,HIGH); }
void display6() { digitalWrite(a,HIGH); digitalWrite(f,HIGH); digitalWrite(g,HIGH); digitalWrite(c,HIGH); digitalWrite(d,HIGH); digitalWrite(e,HIGH); }
void display7() { digitalWrite(a,HIGH); digitalWrite(b,HIGH); digitalWrite(c,HIGH); }
void display8() { digitalWrite(a,HIGH); digitalWrite(b,HIGH); digitalWrite(c,HIGH); digitalWrite(d,HIGH); digitalWrite(e,HIGH); digitalWrite(f,HIGH); digitalWrite(g,HIGH); }
void display9() { digitalWrite(a,HIGH); digitalWrite(b,HIGH); digitalWrite(c,HIGH); digitalWrite(d,HIGH); digitalWrite(f,HIGH); digitalWrite(g,HIGH); }
