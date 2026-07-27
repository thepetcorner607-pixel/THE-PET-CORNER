// ---------- Typewriter subtitle ----------
const phrases = ["Make Your Own Website", "Learn. Build. Launch."];
const typerEl = document.getElementById('typer');
let pIndex = 0, cIndex = 0, deleting = false;

function typeLoop(){
  const current = phrases[pIndex];

  if(!deleting){
    cIndex++;
    typerEl.textContent = current.slice(0, cIndex);
    if(cIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    cIndex--;
    typerEl.textContent = current.slice(0, cIndex);
    if(cIndex === 0){
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
setTimeout(typeLoop, 1200);

// ---------- Mouse / touch parallax tilt on the 3D triangle scene ----------
const scene = document.getElementById('triScene');
const stage = document.querySelector('.stage');

function setTilt(nx, ny){
  // nx, ny in range -1..1
  const rotY = nx * 22;
  const rotX = -ny * 16;
  scene.style.setProperty('--sceneRotY', rotY.toFixed(2) + 'deg');
  scene.style.setProperty('--sceneRotX', rotX.toFixed(2) + 'deg');
}

stage.addEventListener('mousemove', (e) => {
  const rect = stage.getBoundingClientRect();
  const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  setTilt(nx, ny);
});

stage.addEventListener('mouseleave', () => setTilt(0, 0));

stage.addEventListener('touchmove', (e) => {
  if(!e.touches.length) return;
  const t = e.touches[0];
  const rect = stage.getBoundingClientRect();
  const nx = ((t.clientX - rect.left) / rect.width) * 2 - 1;
  const ny = ((t.clientY - rect.top) / rect.height) * 2 - 1;
  setTilt(nx, ny);
}, { passive:true });

// ---------- Ambient particle canvas ----------
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let w, h;

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const colors = ['#ff7a1a', '#29abe2', '#8cc63f', '#f5f5f7'];

function initParticles(){
  const count = Math.min(70, Math.floor((w * h) / 18000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 + 0.4,
    speedY: Math.random() * 0.3 + 0.05,
    drift: (Math.random() - 0.5) * 0.2,
    alpha: Math.random() * 0.5 + 0.15,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
}
initParticles();
window.addEventListener('resize', initParticles);

function tick(){
  ctx.clearRect(0, 0, w, h);
  for(const p of particles){
    p.y -= p.speedY;
    p.x += p.drift;
    if(p.y < -5){ p.y = h + 5; p.x = Math.random() * w; }
    if(p.x < -5) p.x = w + 5;
    if(p.x > w + 5) p.x = -5;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

document.addEventListener('DOMContentLoaded',()=>{
const s=document.getElementById('search');
if(s){s.addEventListener('input',e=>{
const q=e.target.value.toLowerCase();
document.querySelectorAll('.card').forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(q)?'':'none';
});
});}
});
