'use strict';

// ─── UTILS ───────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, mn, mx) => Math.min(Math.max(v, mn), mx);
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── CURSOR ──────────────────────────────────────────────────────────────
(function initCursor() {
  const dot  = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring || prefersReducedMotion()) return;

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let raf;
  const RING_LERP = 0.12;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  document.addEventListener('mouseleave', () => { mx = -200; my = -200; });

  // Track links & buttons for cursor expansion
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a, button, [tabindex]');
    document.body.classList.toggle('cursor-on-link', !!el);
  });

  function tick() {
    rx = lerp(rx, mx, RING_LERP);
    ry = lerp(ry, my, RING_LERP);
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    raf = requestAnimationFrame(tick);
  }
  tick();
})();

// ─── NINE MINDS CANVAS ───────────────────────────────────────────────────
(function initMindsCanvas() {
  const canvas = $('#minds-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Nine minds + bridge — each with unique personality
  const MINDS = [
    { name: 'Architect',    color: '#b03030', speed: 0.4,  amp: 0.6,  phase: 0,    cursorAffinity: 0.02 },
    { name: 'Researcher',   color: '#d4a853', speed: 0.9,  amp: 1.0,  phase: 0.7,  cursorAffinity: 0.08 },
    { name: 'Reviewer',     color: '#2ecc71', speed: 0.55, amp: 0.75, phase: 1.4,  cursorAffinity: 0.04 },
    { name: 'Historian',    color: '#3498db', speed: 0.3,  amp: 0.85, phase: 2.1,  cursorAffinity: 0.05 },
    { name: 'Builder',      color: '#9b59b6', speed: 0.7,  amp: 0.9,  phase: 2.8,  cursorAffinity: 0.06 },
    { name: 'Debugger',     color: '#e67e22', speed: 1.2,  amp: 0.5,  phase: 3.5,  cursorAffinity: 0.03 },
    { name: 'Predictor',    color: '#1abc9c', speed: 0.65, amp: 1.1,  phase: 4.2,  cursorAffinity: 0.09 }, // anticipates
    { name: 'Communicator', color: '#e74c3c', speed: 0.85, amp: 0.8,  phase: 4.9,  cursorAffinity: 0.12 }, // most responsive
    { name: 'Learner',      color: '#f39c12', speed: 0.5,  amp: 0.7,  phase: 5.6,  cursorAffinity: 0.05 },
    { name: 'Bridge',       color: '#aaaaaa', speed: 0.45, amp: 0.95, phase: 6.3,  cursorAffinity: 0.07 },
  ];

  let W, H, cx, cy;
  let mouseX = -1000, mouseY = -1000;
  let mouseInHero = false;
  let t = 0;
  let raf;

  const hero = $('#hero');
  hero?.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
  });
  hero?.addEventListener('mouseenter', () => mouseInHero = true);
  hero?.addEventListener('mouseleave', () => { mouseInHero = false; mouseX = -1000; mouseY = -1000; });

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    cx = W / 2;
    cy = H / 2;
  }

  window.addEventListener('resize', resize);
  resize();

  // Draw a single tentacle as a flowing bezier
  function drawTentacle(mind, angle, len, timeOffset) {
    const baseAngle = angle;
    const noise1 = Math.sin(t * mind.speed + mind.phase + timeOffset) * mind.amp;
    const noise2 = Math.cos(t * mind.speed * 0.7 + mind.phase) * mind.amp * 0.5;

    const waveAngle = baseAngle + noise1 * 0.35 + noise2 * 0.15;

    // End point
    let ex = cx + Math.cos(waveAngle) * len;
    let ey = cy + Math.sin(waveAngle) * len;

    // Cursor attraction (if mouse is in hero)
    if (mouseInHero) {
      const dx = mouseX - ex;
      const dy = mouseY - ey;
      const dist = Math.hypot(dx, dy);
      const pull = mind.cursorAffinity * (1 - clamp(dist / 400, 0, 1));
      ex += dx * pull;
      ey += dy * pull;
    }

    // Control points for bezier
    const cp1x = cx + Math.cos(waveAngle - 0.3) * len * 0.4;
    const cp1y = cy + Math.sin(waveAngle - 0.3) * len * 0.4;
    const cp2x = cx + Math.cos(waveAngle + 0.2) * len * 0.75;
    const cp2y = cy + Math.sin(waveAngle + 0.2) * len * 0.75;

    // Parse color for gradient
    const color = mind.color;

    const grad = ctx.createLinearGradient(cx, cy, ex, ey);
    grad.addColorStop(0, color + '00');
    grad.addColorStop(0.3, color + '55');
    grad.addColorStop(0.75, color + 'aa');
    grad.addColorStop(1, color + '22');

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Terminal glow dot
    ctx.beginPath();
    ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = color + 'cc';
    ctx.fill();
  }

  function drawCore() {
    // Ambient core glow
    const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
    coreGrad.addColorStop(0, 'rgba(212, 168, 83, 0.08)');
    coreGrad.addColorStop(0.5, 'rgba(212, 168, 83, 0.03)');
    coreGrad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.fillStyle = coreGrad;
    ctx.fill();

    // Pulsing center dot
    const pulse = 0.6 + 0.4 * Math.sin(t * 1.2);
    ctx.beginPath();
    ctx.arc(cx, cy, 4 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 168, 83, ${0.3 * pulse})`;
    ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const tentacleLen = Math.min(W, H) * 0.42;

    MINDS.forEach((mind, i) => {
      const angle = (i / MINDS.length) * Math.PI * 2 - Math.PI / 2;
      drawTentacle(mind, angle, tentacleLen, i * 0.3);
    });

    drawCore();

    t += 0.008;
    raf = requestAnimationFrame(draw);
  }

  // Pause when not visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { if (!raf) draw(); }
      else { cancelAnimationFrame(raf); raf = null; }
    });
  }, { threshold: 0.1 });

  observer.observe(hero);

  if (!prefersReducedMotion()) draw();
})();

// ─── REVEAL ON SCROLL ─────────────────────────────────────────────────────
(function initReveal() {
  const els = $$('[data-reveal]');

  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // Stagger siblings in the same container
        const siblings = $$(
          '[data-reveal]',
          e.target.parentElement
        ).filter(el => !el.classList.contains('in-view'));

        let delay = 0;
        siblings.forEach(sib => {
          if (sib === e.target || !e.target.parentElement.contains(sib)) return;
        });

        setTimeout(() => e.target.classList.add('in-view'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => io.observe(el));
})();

// ─── MIND CARD ACTIVATION ─────────────────────────────────────────────────
(function initMindCards() {
  const cards = $$('.mind-card');
  const tint  = $('#page-tint');

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  cards.forEach(card => {
    const color = card.dataset.color || '#d4a853';

    // Set CSS variable for per-card gradient
    card.style.setProperty('--mind-c', color);

    function activate() {
      // Ripple
      const ripple = document.createElement('div');
      ripple.className = 'mind-ripple';
      ripple.style.setProperty('--ripple-c', hexToRgba(color, 0.15));
      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());

      // Page tint
      if (tint) {
        tint.style.background = hexToRgba(color, 0.04);
        tint.style.opacity = '1';
        clearTimeout(tint._timeout);
        tint._timeout = setTimeout(() => {
          tint.style.opacity = '0';
        }, 1200);
      }
    }

    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
})();

// ─── FLOW DIAGRAM — PHASE HIGHLIGHT ──────────────────────────────────────
(function initFlowHighlight() {
  const code = $('#flow-code');
  if (!code) return;

  const text = code.textContent;
  const PHASES = [
    { match: 'request',                  color: '#aaaaaa' },
    { match: 'route',                    color: '#d4a853' },
    { match: 'nine minds',               color: '#9b59b6' },
    { match: 'integration',              color: '#3498db' },
    { match: 'quality gates (5)',        color: '#2ecc71' },
    { match: 'one voice',                color: '#d4a853' },
    { match: 'learning + anticipation',  color: '#1abc9c' },
  ];

  let idx = 0;
  let html = text;

  // Wrap each phase keyword in a span
  PHASES.forEach((p, i) => {
    html = html.replace(p.match, `<span class="flow-phase" data-idx="${i}">${p.match}</span>`);
  });

  code.innerHTML = html;
  const spans = $$('.flow-phase', code);

  function cycleHighlight() {
    spans.forEach(s => s.style.color = '');
    if (spans[idx]) spans[idx].style.color = PHASES[idx]?.color || '#d4a853';
    idx = (idx + 1) % spans.length;
  }

  if (!prefersReducedMotion()) {
    setInterval(cycleHighlight, 900);
  }
})();

// ─── COPY BUTTON ─────────────────────────────────────────────────────────
(function initCopy() {
  const btn = $('#copy-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const target = $('#' + btn.dataset.target);
    if (!target) return;

    const text = target.textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('copied');
      }, 2200);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:absolute;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      btn.textContent = 'copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('copied');
      }, 2200);
    });
  });
})();

// ─── HERO SCROLL FADE ────────────────────────────────────────────────────
(function initHeroFade() {
  const hero    = $('#hero');
  const content = hero?.querySelector('.hero-content');
  if (!hero || !content || prefersReducedMotion()) return;

  function onScroll() {
    const progress = clamp(window.scrollY / hero.offsetHeight, 0, 1);
    content.style.opacity = 1 - progress * 1.4;
    content.style.transform = `translateY(${progress * 24}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ─── MIND CARDS — STAGGER REVEAL ────────────────────────────────────────
(function initMindReveal() {
  const grid = $('.minds-grid');
  if (!grid) return;

  const cards = $$('.mind-card', grid);

  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'none';

        setTimeout(() => {
          card.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      });
      io.disconnect();
    }
  }, { threshold: 0.15 });

  // Initial state
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
  });

  io.observe(grid);
})();
