let startTime, updatedTime, difference = 0;
let running = false;
let timerInterval;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const toggleButton = document.getElementById('themeToggle');
const body = document.body;

// Start
document.getElementById('start').addEventListener('click', () => {
  if (!running) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateTime, 1000);
    running = true;
  }
});

// Pause
document.getElementById('pause').addEventListener('click', () => {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
});

// Reset
document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  display.textContent = '00:00:00';
  laps.innerHTML = '';
});

// Lap
document.getElementById('lap').addEventListener('click', () => {
  if (running) {
    const li = document.createElement('li');
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
});

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
  return unit < 10 ? '0' + unit : unit;
}

// Theme toggle
toggleButton.addEventListener('click', () => {
  const isNight = body.classList.toggle('night');
  toggleButton.textContent = isNight ? '🌙' : '🌞';
});