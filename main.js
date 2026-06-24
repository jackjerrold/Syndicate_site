/* ============================================================
   SYNDICATE ROBOTICS — main.js
   ============================================================ */

/* ===== CIRCUIT CANVAS ===== */
const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  drawCircuit();
}

function drawCircuit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#CC0000';
  ctx.lineWidth = 0.8;
  ctx.globalAlpha = 0.15;

  const cols = Math.ceil(canvas.width / 60);
  const rows = Math.ceil(canvas.height / 60);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * 60 + (Math.random() > 0.5 ? 20 : 0);
      const y = j * 60 + (Math.random() > 0.5 ? 20 : 0);

      ctx.beginPath();
      if (Math.random() > 0.5) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30 + Math.random() * 20, y);
        ctx.lineTo(x + 30 + Math.random() * 20, y + 30 + Math.random() * 20);
      } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 30 + Math.random() * 20);
        ctx.lineTo(x + 30 + Math.random() * 20, y + 30 + Math.random() * 20);
      }
      ctx.stroke();

      if (Math.random() > 0.7) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#CC0000';
        ctx.fill();
      }
    }
  }
  ctx.globalAlpha = 1;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ===== MOBILE NAV ===== */
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

/* ===== NAV ACTIVE STATE ===== */
const sections = document.querySelectorAll('section[id], #hero');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--red-hot)' : '';
  });
});

/* ===== CONTACT FORM ===== */
function submitForm() {
  const name = document.getElementById('fname').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const note = document.getElementById('formNote');

  if (!name || !email || !message) {
    note.style.color = '#FF2222';
    note.textContent = '// Please fill in all required fields.';
    return;
  }

  note.style.color = 'var(--muted)';
  note.textContent = "// Message received. We'll be in touch shortly.";

  document.getElementById('fname').value = '';
  document.getElementById('lname').value = '';
  document.getElementById('email').value = '';
  document.getElementById('reason').value = '';
  document.getElementById('message').value = '';
}

/* ===== SMOOTH NAV SCROLL ADJUSTMENT ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.offsetTop - 68;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
