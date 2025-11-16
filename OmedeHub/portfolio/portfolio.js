// Smooth scroll for nav

document.querySelectorAll('.main-nav a, .btn[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Simple contact form handler

document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const resp = document.getElementById('formResp');
  resp.textContent = 'Sending...';

  await new Promise(r => setTimeout(r, 900));

  resp.textContent = 'Thanks — message received. I will get back to you soon.';
});

// Neon color hue rotation

let hue = 180;
setInterval(() => {
  hue = (hue + 1) % 360;
  document.documentElement.style.setProperty('--neon1', `hsl(${hue} 100% 60%)`);
}, 120);
