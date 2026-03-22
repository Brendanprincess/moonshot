const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

function initCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function createParticles() {
  const particleCount = Math.min(100, Math.floor(width * height / 8000)); // adaptive count
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speed: Math.random() * 0.4 + 0.15,
      opacity: Math.random() * 0.5 + 0.3
    });
  }
}

function animateParticles() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.y -= p.speed;
    if (p.y < -10) {
      p.y = height + 10;
      p.x = Math.random() * width;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 130, 255, ${p.opacity * 0.7})`;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

function handleResize() {
  initCanvas();
  createParticles();
}

window.addEventListener('resize', () => {
  handleResize();
});

// Initial setup
initCanvas();
createParticles();
animateParticles();
