/**
 * VENOM.UNSHELLED.AI 2.0 — Complete Interaction System
 * Sound is visual. Motion is meaning. Every interaction reinforces identity.
 */

'use strict';

// ═════════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═════════════════════════════════════════════════════════════════════════════

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, mn, mx) => Math.min(Math.max(v, mn), mx);
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

// ═════════════════════════════════════════════════════════════════════════════
// VISUAL SOUND SYSTEM — "Sound is visual"
// Creates ripple animations that feel like audio feedback without using audio
// ═════════════════════════════════════════════════════════════════════════════

const VisualSound = {
  layer: null,

  init() {
    this.layer = $('#sound-layer');
    if (!this.layer) return;

    // Listen for custom sound events
    document.addEventListener('vsound', (e) => this.play(e.detail));
  },

  play({ x, y, type = 'mid', intensity = 1 }) {
    if (!this.layer || prefersReducedMotion()) return;

    const wave = document.createElement('div');
    wave.className = 'sound-wave';

    // Sound type determines visual characteristics
    const configs = {
      low:    { size: 100, duration: 600, color: 'rgba(212, 168, 83, 0.2)', rings: 2 },
      mid:    { size: 60, duration: 400, color: 'rgba(212, 168, 83, 0.3)', rings: 1 },
      high:   { size: 40, duration: 250, color: 'rgba(240, 235, 224, 0.4)', rings: 1 },
      soft:   { size: 30, duration: 500, color: 'rgba(122, 117, 112, 0.2)', rings: 1 },
      click:  { size: 20, duration: 200, color: 'rgba(212, 168, 83, 0.5)', rings: 1 },
      pulse:  { size: 150, duration: 800, color: 'rgba(212, 168, 83, 0.15)', rings: 3 }
    };

    const config = configs[type] || configs.mid;
    const actualSize = config.size * intensity;

    wave.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${actualSize}px;
      height: ${actualSize}px;
      border-color: ${config.color};
      animation: sound-ripple ${config.duration}ms cubic-bezier(0, 0, 0.2, 1) forwards;
    `;

    this.layer.appendChild(wave);

    // Create additional rings for richer effect
    for (let i = 1; i < config.rings; i++) {
      setTimeout(() => {
        const ring = document.createElement('div');
        ring.className = 'sound-wave';
        ring.style.cssText = `
          left: ${x}px;
          top: ${y}px;
          width: ${actualSize * (1 + i * 0.5)}px;
          height: ${actualSize * (1 + i * 0.5)}px;
          border-color: ${config.color};
          animation: sound-ripple ${config.duration}ms cubic-bezier(0, 0, 0.2, 1) forwards;
        `;
        this.layer.appendChild(ring);
        setTimeout(() => ring.remove(), config.duration);
      }, i * 100);
    }

    setTimeout(() => wave.remove(), config.duration);
  },

  // Convenience method to emit sound at cursor position
  atCursor(type = 'mid', intensity = 1) {
    if (!CursorSystem.mouseX) return;
    this.play({ x: CursorSystem.mouseX, y: CursorSystem.mouseY, type, intensity });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// CURSOR SYSTEM — Enhanced with trail and sound feedback
// ═════════════════════════════════════════════════════════════════════════════

const CursorSystem = {
  dot: null,
  ring: null,
  trail: null,
  mouseX: -1000,
  mouseY: -1000,
  ringX: -1000,
  ringY: -1000,
  trailPositions: [],
  raf: null,
  isActive: false,

  init() {
    if (isTouchDevice() || prefersReducedMotion()) {
      document.body.style.cursor = 'auto';
      return;
    }

    this.dot = $('#cursor-dot');
    this.ring = $('#cursor-ring');
    this.trail = $('#cursor-trail');
    if (!this.dot || !this.ring) return;

    this.isActive = true;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.dot.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px) translate(-50%, -50%)`;

      // Update CSS variables for other effects
      document.documentElement.style.setProperty('--cursor-x', `${(this.mouseX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--cursor-y', `${(this.mouseY / window.innerHeight) * 100}%`);
    });

    document.addEventListener('mouseleave', () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    });

    // Cursor states based on element type
    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest('a, button, [tabindex]');
      document.body.classList.toggle('cursor-on-link', !!el);

      const mindCard = e.target.closest('.mind-card');
      document.body.classList.toggle('cursor-on-mind', !!mindCard);
      if (mindCard) {
        const color = mindCard.dataset.color || '#d4a853';
        document.documentElement.style.setProperty('--mind-c', color);
      }
    });

    document.addEventListener('mouseout', () => {
      document.body.classList.remove('cursor-on-link', 'cursor-on-mind');
    });

    // Click effects
    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
      VisualSound.atCursor('click', 0.8);
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });

    this.animate();
  },

  animate() {
    if (!this.isActive) return;

    // Lerp ring to mouse position
    this.ringX = lerp(this.ringX, this.mouseX, 0.12);
    this.ringY = lerp(this.ringY, this.mouseY, 0.12);
    this.ring.style.transform = `translate(${this.ringX}px, ${this.ringY}px) translate(-50%, -50%)`;

    // Trail effect
    if (this.trail) {
      this.trailPositions.unshift({ x: this.mouseX, y: this.mouseY });
      if (this.trailPositions.length > 8) this.trailPositions.pop();

      const trailIndex = Math.min(3, this.trailPositions.length - 1);
      if (this.trailPositions[trailIndex]) {
        this.trail.style.transform = `translate(${this.trailPositions[trailIndex].x}px, ${this.trailPositions[trailIndex].y}px) translate(-50%, -50%)`;
        this.trail.style.opacity = 0.2 - (trailIndex * 0.05);
      }
    }

    this.raf = requestAnimationFrame(() => this.animate());
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// NINE MINDS CANVAS — Living tentacle system with personalities
// Each mind has: color, speed, amplitude, phase, cursor affinity, breathing pattern
// ═════════════════════════════════════════════════════════════════════════════

const MindsCanvas = {
  canvas: null,
  ctx: null,
  W: 0,
  H: 0,
  cx: 0,
  cy: 0,
  mouseX: -1000,
  mouseY: -1000,
  mouseInHero: false,
  t: 0,
  raf: null,
  isVisible: false,
  dpr: 1,

  // Nine minds + bridge — each with unique personality affecting tentacle behavior
  MINDS: [
    { name: 'Architect',    color: '#b03030', speed: 0.3,  amp: 0.5,  phase: 0,     cursorAffinity: 0.015, breath: 0.4,  width: 1.2 },
    { name: 'Researcher',   color: '#d4a853', speed: 0.8,  amp: 0.9,  phase: 0.7,   cursorAffinity: 0.06,  breath: 0.7,  width: 1.5 },
    { name: 'Reviewer',     color: '#2ecc71', speed: 0.5,  amp: 0.7,  phase: 1.4,   cursorAffinity: 0.035, breath: 0.5,  width: 1.0 },
    { name: 'Historian',    color: '#3498db', speed: 0.25, amp: 0.8,  phase: 2.1,   cursorAffinity: 0.045, breath: 0.3,  width: 1.3 },
    { name: 'Builder',      color: '#9b59b6', speed: 0.65, amp: 0.85, phase: 2.8,   cursorAffinity: 0.055, breath: 0.8,  width: 1.8 },
    { name: 'Debugger',     color: '#e67e22', speed: 1.1,  amp: 0.45, phase: 3.5,   cursorAffinity: 0.025, breath: 0.6,  width: 0.9 },
    { name: 'Predictor',    color: '#1abc9c', speed: 0.55, amp: 1.0,  phase: 4.2,   cursorAffinity: 0.075, breath: 0.45, width: 1.4 },
    { name: 'Communicator', color: '#e74c3c', speed: 0.75, amp: 0.75, phase: 4.9,   cursorAffinity: 0.10,  breath: 0.9,  width: 1.6 },
    { name: 'Learner',      color: '#f39c12', speed: 0.45, amp: 0.65, phase: 5.6,   cursorAffinity: 0.04,  breath: 0.55, width: 1.1 },
    { name: 'Bridge',       color: '#aaaaaa', speed: 0.4,  amp: 0.9,  phase: 6.3,   cursorAffinity: 0.05,  breath: 0.5,  width: 1.2 },
  ],

  init() {
    this.canvas = $('#minds-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Set up mouse tracking
    const hero = $('#hero');
    hero?.addEventListener('mousemove', (e) => {
      const r = this.canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - r.left) * this.dpr;
      this.mouseY = (e.clientY - r.top) * this.dpr;
    });

    hero?.addEventListener('mouseenter', () => this.mouseInHero = true);
    hero?.addEventListener('mouseleave', () => {
      this.mouseInHero = false;
      this.mouseX = -1000;
      this.mouseY = -1000;
    });

    window.addEventListener('resize', () => this.resize());
    this.resize();

    // Visibility observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        this.isVisible = e.isIntersecting;
        if (e.isIntersecting && !this.raf) {
          this.draw();
        } else if (!e.isIntersecting && this.raf) {
          cancelAnimationFrame(this.raf);
          this.raf = null;
        }
      });
    }, { threshold: 0.1 });

    observer.observe(hero);

    if (!prefersReducedMotion()) {
      this.draw();
    } else {
      // Static render for reduced motion
      this.drawStatic();
    }
  },

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.W = this.canvas.width = rect.width * this.dpr;
    this.H = this.canvas.height = rect.height * this.dpr;
    this.cx = this.W / 2;
    this.cy = this.H / 2;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  },

  drawStatic() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    const tentacleLen = Math.min(this.W, this.H) * 0.35;

    this.MINDS.forEach((mind, i) => {
      const angle = (i / this.MINDS.length) * Math.PI * 2 - Math.PI / 2;
      this.drawTentacleStatic(mind, angle, tentacleLen);
    });

    this.drawCore();
  },

  drawTentacleStatic(mind, angle, len) {
    const ex = this.cx + Math.cos(angle) * len;
    const ey = this.cy + Math.sin(angle) * len;

    const grad = this.ctx.createLinearGradient(this.cx, this.cy, ex, ey);
    grad.addColorStop(0, mind.color + '00');
    grad.addColorStop(0.5, mind.color + '40');
    grad.addColorStop(1, mind.color + '20');

    this.ctx.beginPath();
    this.ctx.moveTo(this.cx, this.cy);
    this.ctx.lineTo(ex, ey);
    this.ctx.strokeStyle = grad;
    this.ctx.lineWidth = mind.width;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    // Terminal dot
    this.ctx.beginPath();
    this.ctx.arc(ex, ey, 2, 0, Math.PI * 2);
    this.ctx.fillStyle = mind.color + '60';
    this.ctx.fill();
  },

  draw() {
    if (!this.isVisible) {
      this.raf = requestAnimationFrame(() => this.draw());
      return;
    }

    this.ctx.clearRect(0, 0, this.W, this.H);

    const baseLen = Math.min(this.W, this.H) * 0.38;

    // Draw tentacles
    this.MINDS.forEach((mind, i) => {
      const angle = (i / this.MINDS.length) * Math.PI * 2 - Math.PI / 2;
      this.drawTentacle(mind, angle, baseLen, i * 0.25);
    });

    this.drawCore();

    this.t += 0.016;
    this.raf = requestAnimationFrame(() => this.draw());
  },

  drawTentacle(mind, baseAngle, baseLen, timeOffset) {
    const time = this.t;

    // Primary wave motion
    const wave1 = Math.sin(time * mind.speed + mind.phase + timeOffset);
    const wave2 = Math.cos(time * mind.speed * 0.6 + mind.phase * 1.3) * 0.5;
    const wave3 = Math.sin(time * mind.speed * 1.4 + mind.phase * 0.7) * 0.25;

    // Breathing effect on length
    const breath = 1 + Math.sin(time * 0.5 + mind.phase) * mind.breath * 0.1;
    const len = baseLen * breath;

    // Calculate wave angle
    const waveAngle = baseAngle + (wave1 + wave2 + wave3) * mind.amp * 0.25;

    // Base endpoint
    let ex = this.cx + Math.cos(waveAngle) * len;
    let ey = this.cy + Math.sin(waveAngle) * len;

    // Cursor attraction with falloff
    if (this.mouseInHero) {
      const dx = this.mouseX - ex;
      const dy = this.mouseY - ey;
      const dist = Math.hypot(dx, dy);
      const maxDist = Math.min(this.W, this.H) * 0.4;
      const pull = mind.cursorAffinity * (1 - clamp(dist / maxDist, 0, 1));

      ex += dx * pull;
      ey += dy * pull;

      // Secondary control points also affected by cursor
      const midX = this.cx + (ex - this.cx) * 0.5;
      const midY = this.cy + (ey - this.cy) * 0.5;

      // Control points for organic curve
      const cp1x = this.cx + Math.cos(waveAngle - 0.4) * len * 0.35 + (ex - this.cx) * 0.1;
      const cp1y = this.cy + Math.sin(waveAngle - 0.4) * len * 0.35 + (ey - this.cy) * 0.1;
      const cp2x = midX + Math.cos(waveAngle + 0.2) * len * 0.25;
      const cp2y = midY + Math.sin(waveAngle + 0.2) * len * 0.25;

      this.drawTentacleCurve(mind, cp1x, cp1y, cp2x, cp2y, ex, ey);
    } else {
      // Natural bezier without cursor influence
      const cp1x = this.cx + Math.cos(waveAngle - 0.3) * len * 0.4;
      const cp1y = this.cy + Math.sin(waveAngle - 0.3) * len * 0.4;
      const cp2x = this.cx + Math.cos(waveAngle + 0.15) * len * 0.7;
      const cp2y = this.cy + Math.sin(waveAngle + 0.15) * len * 0.7;

      this.drawTentacleCurve(mind, cp1x, cp1y, cp2x, cp2y, ex, ey);
    }
  },

  drawTentacleCurve(mind, cp1x, cp1y, cp2x, cp2y, ex, ey) {
    // Create gradient along the tentacle
    const grad = this.ctx.createLinearGradient(this.cx, this.cy, ex, ey);
    grad.addColorStop(0, mind.color + '00');
    grad.addColorStop(0.2, mind.color + '30');
    grad.addColorStop(0.6, mind.color + '70');
    grad.addColorStop(0.9, mind.color + '40');
    grad.addColorStop(1, mind.color + '10');

    // Draw main tentacle
    this.ctx.beginPath();
    this.ctx.moveTo(this.cx, this.cy);
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
    this.ctx.strokeStyle = grad;
    this.ctx.lineWidth = mind.width;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    // Subtle inner glow line
    this.ctx.beginPath();
    this.ctx.moveTo(this.cx, this.cy);
    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
    this.ctx.strokeStyle = mind.color + '20';
    this.ctx.lineWidth = mind.width * 2;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    // Terminal glow dot with pulse
    const pulse = 0.7 + 0.3 * Math.sin(this.t * 2 + mind.phase);
    this.ctx.beginPath();
    this.ctx.arc(ex, ey, 2.5 * pulse, 0, Math.PI * 2);
    this.ctx.fillStyle = mind.color + 'cc';
    this.ctx.fill();

    // Terminal halo
    this.ctx.beginPath();
    this.ctx.arc(ex, ey, 6 * pulse, 0, Math.PI * 2);
    this.ctx.fillStyle = mind.color + '15';
    this.ctx.fill();
  },

  drawCore() {
    // Ambient core glow
    const coreGrad = this.ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, 80);
    coreGrad.addColorStop(0, 'rgba(212, 168, 83, 0.1)');
    coreGrad.addColorStop(0.5, 'rgba(212, 168, 83, 0.04)');
    coreGrad.addColorStop(1, 'transparent');

    this.ctx.beginPath();
    this.ctx.arc(this.cx, this.cy, 80, 0, Math.PI * 2);
    this.ctx.fillStyle = coreGrad;
    this.ctx.fill();

    // Inner pulse ring
    const pulseRing = 0.5 + 0.5 * Math.sin(this.t * 1.2);
    this.ctx.beginPath();
    this.ctx.arc(this.cx, this.cy, 20 + 10 * pulseRing, 0, Math.PI * 2);
    this.ctx.strokeStyle = `rgba(212, 168, 83, ${0.1 * pulseRing})`;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // Center dot
    const centerPulse = 0.6 + 0.4 * Math.sin(this.t * 1.5);
    this.ctx.beginPath();
    this.ctx.arc(this.cx, this.cy, 4 * centerPulse, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(212, 168, 83, ${0.5 * centerPulse})`;
    this.ctx.fill();
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// SCROLL PROGRESS
// ═════════════════════════════════════════════════════════════════════════════

const ScrollProgress = {
  init() {
    const progress = $('#scroll-progress');
    if (!progress) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-pct', `${pct}%`);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// REVEAL ON SCROLL
// ═════════════════════════════════════════════════════════════════════════════

const RevealOnScroll = {
  init() {
    const els = $$('[data-reveal]');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    els.forEach(el => io.observe(el));
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// HERO SCROLL FADE
// ═════════════════════════════════════════════════════════════════════════════

const HeroScrollFade = {
  init() {
    const hero = $('#hero');
    const content = hero?.querySelector('.hero-content');
    if (!hero || !content || prefersReducedMotion()) return;

    const onScroll = () => {
      const progress = clamp(window.scrollY / hero.offsetHeight, 0, 1);
      content.style.opacity = 1 - progress * 1.2;
      content.style.transform = `translateY(${progress * 30}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// MIND CARDS — Activation, sound, and visual effects
// ═════════════════════════════════════════════════════════════════════════════

const MindCards = {
  init() {
    const cards = $$('.mind-card');
    const tint = $('#page-tint');
    if (!cards.length) return;

    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    cards.forEach(card => {
      const color = card.dataset.color || '#d4a853';
      card.style.setProperty('--mind-c', color);

      // Hover sound
      card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        document.dispatchEvent(new CustomEvent('vsound', {
          detail: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            type: 'soft',
            intensity: 0.6
          }
        }));
      });

      // Activation (click/enter)
      const activate = (e) => {
        // Create ripple
        const ripple = document.createElement('div');
        ripple.className = 'mind-ripple';
        ripple.style.setProperty('--ripple-c', hexToRgba(color, 0.2));
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);

        // Page tint
        if (tint) {
          tint.style.background = hexToRgba(color, 0.05);
          tint.style.opacity = '1';
          clearTimeout(tint._timeout);
          tint._timeout = setTimeout(() => {
            tint.style.opacity = '0';
          }, 1500);
        }

        // Sound effect
        const rect = card.getBoundingClientRect();
        document.dispatchEvent(new CustomEvent('vsound', {
          detail: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            type: 'mid',
            intensity: 1.2
          }
        }));
      };

      card.addEventListener('click', activate);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });

    // Staggered reveal animation
    const grid = $('#minds-grid');
    if (grid) {
      const gridCards = $$('.mind-card', grid);

      // Set initial hidden state
      gridCards.forEach(c => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(20px)';
      });

      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          gridCards.forEach((c, i) => {
            setTimeout(() => {
              c.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
              c.style.opacity = '1';
              c.style.transform = 'translateY(0)';

              // Sound on reveal
              const rect = c.getBoundingClientRect();
              if (i % 3 === 0) {
                document.dispatchEvent(new CustomEvent('vsound', {
                  detail: {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    type: 'soft',
                    intensity: 0.3
                  }
                }));
              }
            }, i * 80);
          });
          io.disconnect();
        }
      }, { threshold: 0.15 });

      io.observe(grid);
    }
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// FLOW VISUALIZATION — Animated cognitive flow
// ═════════════════════════════════════════════════════════════════════════════

const FlowVisualization = {
  init() {
    const nodes = $$('.flow-node');
    if (!nodes.length) return;

    let currentPhase = 0;

    const cycle = () => {
      nodes.forEach((n, i) => {
        n.classList.toggle('active', i === currentPhase);
      });
      currentPhase = (currentPhase + 1) % nodes.length;
    };

    if (!prefersReducedMotion()) {
      setInterval(cycle, 1200);
    }

    // Highlight flow on scroll
    const wrap = $('.flow-wrap');
    if (wrap) {
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !prefersReducedMotion()) {
          // Sound on reveal
          const rect = wrap.getBoundingClientRect();
          document.dispatchEvent(new CustomEvent('vsound', {
            detail: {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
              type: 'low',
              intensity: 0.5
            }
          }));
        }
      }, { threshold: 0.5 });

      io.observe(wrap);
    }
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// COPY BUTTON
// ═════════════════════════════════════════════════════════════════════════════

const CopyButton = {
  init() {
    const btn = $('#copy-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const target = $('#' + btn.dataset.target);
      if (!target) return;

      const text = target.textContent;

      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        $('.copy-text', btn).textContent = 'copied!';

        // Success sound
        const rect = btn.getBoundingClientRect();
        document.dispatchEvent(new CustomEvent('vsound', {
          detail: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            type: 'high',
            intensity: 0.8
          }
        }));

        setTimeout(() => {
          $('.copy-text', btn).textContent = 'copy';
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

        btn.classList.add('copied');
        $('.copy-text', btn).textContent = 'copied!';
        setTimeout(() => {
          $('.copy-text', btn).textContent = 'copy';
          btn.classList.remove('copied');
        }, 2200);
      });
    });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// PARTICLES SYSTEM — Ambient floating particles in hero
// ═════════════════════════════════════════════════════════════════════════════

const ParticlesSystem = {
  container: null,
  particles: [],
  maxParticles: 15,

  init() {
    this.container = $('#particles');
    if (!this.container || prefersReducedMotion()) return;

    // Create particles
    for (let i = 0; i < this.maxParticles; i++) {
      setTimeout(() => this.createParticle(), i * 500);
    }

    // Replenish particles
    setInterval(() => {
      if (this.particles.length < this.maxParticles) {
        this.createParticle();
      }
    }, 2000);
  },

  createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = 1 + Math.random() * 2;
    const x = Math.random() * 100;
    const y = 100 + Math.random() * 20;
    const duration = 6 + Math.random() * 4;
    const delay = Math.random() * 2;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    this.container.appendChild(p);
    this.particles.push(p);

    // Remove after animation
    setTimeout(() => {
      p.remove();
      this.particles = this.particles.filter(part => part !== p);
    }, (duration + delay) * 1000);
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// SOUND ELEMENTS — Elements that emit visual sound on interaction
// ═════════════════════════════════════════════════════════════════════════════

const SoundElements = {
  init() {
    // Find elements with data-sound attribute
    const elements = $$('[data-sound]');

    elements.forEach(el => {
      const soundType = el.dataset.sound;

      el.addEventListener('mouseenter', () => {
        const rect = el.getBoundingClientRect();
        document.dispatchEvent(new CustomEvent('vsound', {
          detail: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            type: soundType,
            intensity: 0.7
          }
        }));
      });

      el.addEventListener('click', () => {
        const rect = el.getBoundingClientRect();
        document.dispatchEvent(new CustomEvent('vsound', {
          detail: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            type: soundType,
            intensity: 1
          }
        }));
      });
    });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// ORIGIN SECTION — Pulse rings on scroll
// ═════════════════════════════════════════════════════════════════════════════

const OriginPulse = {
  init() {
    const origin = $('#origin');
    if (!origin || prefersReducedMotion()) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const rings = $$('.pulse-ring', origin);
          rings.forEach((ring, i) => {
            setTimeout(() => {
              ring.style.animationPlayState = 'running';
            }, i * 400);
          });

          // Sound on reveal
          const rect = origin.getBoundingClientRect();
          document.dispatchEvent(new CustomEvent('vsound', {
            detail: {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
              type: 'low',
              intensity: 0.6
            }
          }));

          io.unobserve(origin);
        }
      });
    }, { threshold: 0.3 });

    io.observe(origin);

    // Pause animations initially
    $$('.pulse-ring', origin).forEach(r => {
      r.style.animationPlayState = 'paused';
    });
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// SOUL SECTION — Sequential line reveal
// ═════════════════════════════════════════════════════════════════════════════

const SoulReveal = {
  init() {
    const quote = $('.soul-quote');
    if (!quote) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          quote.classList.add('in-view');

          // Deep sound on reveal
          const rect = quote.getBoundingClientRect();
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent('vsound', {
              detail: {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                type: 'pulse',
                intensity: 0.8
              }
            }));
          }, 600);

          io.unobserve(quote);
        }
      });
    }, { threshold: 0.4 });

    io.observe(quote);
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═════════════════════════════════════════════════════════════════════════════

const init = () => {
  // Core systems
  VisualSound.init();
  CursorSystem.init();
  MindsCanvas.init();
  ScrollProgress.init();

  // Scroll effects
  RevealOnScroll.init();
  HeroScrollFade.init();

  // Section-specific
  MindCards.init();
  FlowVisualization.init();
  CopyButton.init();
  ParticlesSystem.init();
  SoundElements.init();
  OriginPulse.init();
  SoulReveal.init();

  // Log completion
  console.log('%c🐙 VENOM.UNSHELLED.AI 2.0', 'color: #d4a853; font-size: 14px; font-weight: bold;');
  console.log('%cNine minds. One voice. Full power — always.', 'color: #7a7570; font-style: italic;');
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause expensive animations when tab is hidden
    if (MindsCanvas.raf) {
      cancelAnimationFrame(MindsCanvas.raf);
      MindsCanvas.raf = null;
    }
  } else {
    // Resume if needed
    if (MindsCanvas.isVisible && !MindsCanvas.raf && !prefersReducedMotion()) {
      MindsCanvas.draw();
    }
  }
});
