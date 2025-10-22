const canvas = document.getElementById("artBoard");
const ctx = canvas.getContext("2d");

const sizeSlider = document.getElementById("sizeSlider");
const sizeLabel = document.getElementById("sizeLabel");

let brushSize = 10;

sizeSlider.addEventListener("input", (e) => {
  brushSize = e.target.value;
  sizeLabel.textContent = `Brush: ${brushSize}px`;
});


// Set the canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

let drawing = false;
let rainbowMode = false;
let hue = 0;
let currentColor = "#ff0000"; // default color

const colorPicker = document.getElementById("colorPicker");
const rainbowBtn = document.getElementById("rainbowBtn");
const clearBtn = document.getElementById("clearBtn");

// ---- EVENT LISTENERS ----
canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mousemove", (e) => {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;
  glow.style.left = e.pageX + "px";
  glow.style.top = e.pageY + "px";
});


colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  rainbowMode = false;
  rainbowBtn.textContent = "Rainbow Mode 🌈";
});

rainbowBtn.addEventListener("click", () => {
  rainbowMode = !rainbowMode;
  rainbowBtn.textContent = rainbowMode ? "Stop Rainbow ❌" : "Rainbow Mode 🌈";
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ---- DRAWING FUNCTION ----
function draw(e) {
  if (!drawing) return;

  const x = e.offsetX;
  const y = e.offsetY;

  let color;
  if (rainbowMode) {
    color = `hsl(${hue}, 100%, 60%)`;
    hue = (hue + 3) % 360;
  } else {
    color = currentColor;
  }

  const size = brushSize;//I changed now
 
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.shadowBlur = 0.5; // no glow, just color
  ctx.fill();
  ctx.lineTo(x, y);
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.stroke();

}const moodText = document.getElementById("moodText");

rainbowBtn.addEventListener("click", () => {
  if (rainbowMode) {
    moodText.textContent = "Rainbow mode off 🌈❌";
    moodText.style.color = "#d6d6ff";
  } else {
    moodText.textContent = "You’re painting with rainbow vibes 🌈✨";
    moodText.style.color = "#ff9cff";
  }
});

