// Personal portfolio — small interactions

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
const onScroll = () => {
  if (window.scrollY > 20) {
    navbar.classList.add('bg-ink/80', 'backdrop-blur', 'shadow-lg', 'shadow-black/20');
  } else {
    navbar.classList.remove('bg-ink/80', 'backdrop-blur', 'shadow-lg', 'shadow-black/20');
  }
};
window.addEventListener('scroll', onScroll);
onScroll();

// Reveal on scroll + animate skill bars
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        entry.target
          .querySelectorAll?.('.skill-bar')
          .forEach((bar) => bar.classList.add('is-visible'));
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

// Animated number counters
const runCounter = (el) => {
  const target = Number(el.dataset.target) || 0;
  const duration = 1500;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

// Typing effect for the role line
const typedEl = document.getElementById('typed');
if (typedEl) {
  const roles = [
    'Data Engineer',
    'Solution Architect',
    'Data Platform Builder',
    'Pipeline Specialist',
  ];
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  const type = () => {
    const current = roles[roleIndex];
    typedEl.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex++;
      setTimeout(type, 90);
    } else if (!deleting && charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
    } else if (deleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 45);
    } else {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 300);
    }
  };
  setTimeout(type, 2000);
}

// Scroll progress bar + back-to-top visibility
const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');
const onProgress = () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  if (progress) progress.style.width = pct + '%';
  if (toTop) {
    if (scrollTop > 500) {
      toTop.classList.remove('hidden');
      toTop.classList.add('grid');
    } else {
      toTop.classList.add('hidden');
      toTop.classList.remove('grid');
    }
  }
};
window.addEventListener('scroll', onProgress);
onProgress();

// Active nav link based on section in view
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

// Contact form -> open email client via mailto
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`Project enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  window.location.href = `mailto:hemendrasingh19191@gmail.com?subject=${subject}&body=${body}`;
  if (formNote) {
    formNote.textContent = 'Opening your email app…';
    formNote.classList.remove('hidden');
  }
  form.reset();
});

