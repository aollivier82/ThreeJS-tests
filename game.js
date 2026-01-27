const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Size canvas to fill screen
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Game state
const state = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 30,
  color: '#4fc3f7',
};

// Touch / mouse input
canvas.addEventListener('pointerdown', (e) => {
  state.x = e.clientX;
  state.y = e.clientY;
});

canvas.addEventListener('pointermove', (e) => {
  if (e.buttons > 0) {
    state.x = e.clientX;
    state.y = e.clientY;
  }
});

// Main loop
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw a circle that follows your finger
  ctx.beginPath();
  ctx.arc(state.x, state.y, state.radius, 0, Math.PI * 2);
  ctx.fillStyle = state.color;
  ctx.fill();

  // Tap anywhere text
  ctx.fillStyle = '#666';
  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('tap or drag anywhere', canvas.width / 2, 40);

  requestAnimationFrame(loop);
}

loop();
