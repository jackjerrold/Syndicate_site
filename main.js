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
  ctx.strokeStyle = '#FF0000';
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
        ctx.fillStyle = '#FF0000';
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

/* ===== CONTACT FORM (EmailJS) ===== */
 
// ── Paste your three EmailJS values here ──────────────────────────
const EMAILJS_PUBLIC_KEY  = 'VpN3n7gJ3lzlpvZ0A';   // Account → General
const EMAILJS_SERVICE_ID  = 'service_mu0ql9r';   // Email Services
const EMAILJS_TEMPLATE_ID = 'template_i0clo8x';  // Email Templates
// ──────────────────────────────────────────────────────────────────
 
// Initialise EmailJS once the page loads
emailjs.init(EMAILJS_PUBLIC_KEY);
 
function submitForm() {
  const fname   = document.getElementById('fname').value.trim();
  const lname   = document.getElementById('lname').value.trim();
  const email   = document.getElementById('email').value.trim();
  const reason  = document.getElementById('reason').value;
  const message = document.getElementById('message').value.trim();
  const note    = document.getElementById('formNote');
  const btn     = document.querySelector('.form-submit');
 
  // Basic validation
  if (!fname || !email || !message) {
    note.style.color = '#FF2222';
    note.textContent = '// Please fill in all required fields.';
    return;
  }
 
  // Loading state
  btn.disabled = true;
  btn.textContent = 'Sending...';
  note.style.color = 'var(--muted)';
  note.textContent = '// Transmitting...';
 
  // Template parameters — these must match the variable names
  // in your EmailJS email template (e.g. {{from_name}}, {{message}})
  const templateParams = {
    from_name:    `${fname} ${lname}`.trim(),
    from_email:   email,
    reason:       reason || 'Not specified',
    message:      message,
  };
 
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      note.style.color = '#44CC44';
      note.textContent = '// Message received. We\'ll be in touch shortly.';
      btn.textContent = 'Sent ✓';
 
      // Clear the form
      document.getElementById('fname').value    = '';
      document.getElementById('lname').value    = '';
      document.getElementById('email').value    = '';
      document.getElementById('reason').value   = '';
      document.getElementById('message').value  = '';
 
      // Reset button after a moment
      setTimeout(() => {
        btn.disabled    = false;
        btn.textContent = 'Send Message →';
      }, 4000);
    })
    .catch((error) => {
      note.style.color = '#FF2222';
      note.textContent = '// Something went wrong. Please try again or email us directly.';
      console.error('EmailJS error:', error);
      btn.disabled    = false;
      btn.textContent = 'Send Message →';
    });
}

