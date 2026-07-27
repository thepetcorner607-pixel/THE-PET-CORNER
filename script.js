(function(){
  // ---------- Typewriter subtitle ----------
  var phrases = ["Make Your Own Website", "Learn. Build. Launch."];
  var typerEl = document.getElementById('anuTyper');
  var pIndex = 0, cIndex = 0, deleting = false;

  function typeLoop(){
    if(!typerEl) return;
    var current = phrases[pIndex];

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
  var scene = document.getElementById('anuTriScene');
  var stage = document.querySelector('.anu-hero');

  function setTilt(nx, ny){
    if(!scene) return;
    var rotY = nx * 22;
    var rotX = -ny * 16;
    scene.style.setProperty('--anuRotY', rotY.toFixed(2) + 'deg');
    scene.style.setProperty('--anuRotX', rotX.toFixed(2) + 'deg');
  }

  if(stage){
    stage.addEventListener('mousemove', function(e){
      var rect = stage.getBoundingClientRect();
      var nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      var ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setTilt(nx, ny);
    });

    stage.addEventListener('mouseleave', function(){ setTilt(0, 0); });

    stage.addEventListener('touchmove', function(e){
      if(!e.touches.length) return;
      var t = e.touches[0];
      var rect = stage.getBoundingClientRect();
      var nx = ((t.clientX - rect.left) / rect.width) * 2 - 1;
      var ny = ((t.clientY - rect.top) / rect.height) * 2 - 1;
      setTilt(nx, ny);
    }, { passive:true });
  }

  // ---------- Ambient particle canvas (scoped to hero section only) ----------
  var canvas = document.getElementById('anuParticles');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var w, h;

  function resize(){
    var rect = stage.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
  }
  window.addEventListener('resize', resize);
  resize();

  var colors = ['#ff7a1a', '#29abe2', '#8cc63f', '#f5f5f7'];

  function initParticles(){
    var count = Math.min(60, Math.floor((w * h) / 20000));
    particles = [];
    for(var i = 0; i < count; i++){
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        speedY: Math.random() * 0.3 + 0.05,
        drift: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.5 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }
  initParticles();
  window.addEventListener('resize', initParticles);

  function tick(){
    ctx.clearRect(0, 0, w, h);
    for(var i = 0; i < particles.length; i++){
      var p = particles[i];
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
})();


document.addEventListener('DOMContentLoaded',()=>{
const s=document.getElementById('search');
if(s){s.addEventListener('input',e=>{
const q=e.target.value.toLowerCase();
document.querySelectorAll('.card').forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(q)?'':'none';
});
});}
});
