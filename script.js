document.addEventListener('DOMContentLoaded',()=>{
const s=document.getElementById('search');
if(s){s.addEventListener('input',e=>{
const q=e.target.value.toLowerCase();
document.querySelectorAll('.card').forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(q)?'':'none';
});
});}
});