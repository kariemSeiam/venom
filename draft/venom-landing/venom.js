/**
 * VENOM Landing Page - Interactive Behaviors
 * Nine minds. One coherence.
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        canvas: {
            particleCount: 9,
            orbitRadius: 150,
            centerRadius: 60,
            colors: {
                cyan: '#00d4ff',
                crimson: '#ff2a6d',
                silver: '#6b6b8a',
                ghost: '#e8e8f0'
            }
        },
        animations: {
            typingSpeed: 50,
            revealDelay: 100,
            scrollOffset: 0.1
        }
    };

    // ============================================
    // Canvas Visualization - Nine Minds
    // ============================================
    class MindsVisualization {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.centerParticle = null;
            this.animationId = null;
            this.isActive = true;
            
            // Check for reduced motion preference
            this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            this.init();
        }

        init() {
            this.resize();
            this.createParticles();
            this.bindEvents();
            
            if (!this.prefersReducedMotion) {
                this.animate();
            } else {
                this.drawStatic();
            }
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.centerX = this.canvas.width / 2;
            this.centerY = this.canvas.height / 2;
        }

        createParticles() {
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            
            // Center particle (Coordinator)
            this.centerParticle = {
                x: centerX,
                y: centerY,
                radius: 8,
                color: CONFIG.canvas.colors.cyan,
                glow: 20,
                pulsePhase: 0
            };

            // Satellite particles (9 Minds)
            const mindNames = [
                'Architect', 'Researcher', 'Reviewer', 'Historian', 'Builder',
                'Debugger', 'Predictor', 'Communicator', 'Learner'
            ];
            
            for (let i = 0; i < CONFIG.canvas.particleCount; i++) {
                const angle = (i / CONFIG.canvas.particleCount) * Math.PI * 2;
                const radius = CONFIG.canvas.orbitRadius + Math.random() * 50;
                const speed = 0.0005 + Math.random() * 0.001;
                
                this.particles.push({
                    x: centerX + Math.cos(angle) * radius,
                    y: centerY + Math.sin(angle) * radius,
                    radius: 4 + Math.random() * 2,
                    color: i === 0 ? CONFIG.canvas.colors.crimson : CONFIG.canvas.colors.cyan,
                    angle: angle,
                    radiusOrbit: radius,
                    speed: speed,
                    name: mindNames[i],
                    opacity: 0.3 + Math.random() * 0.4,
                    trail: []
                });
            }
        }

        bindEvents() {
            window.addEventListener('resize', () => {
                this.resize();
                this.centerParticle.x = this.canvas.width / 2;
                this.centerParticle.y = this.canvas.height / 2;
            });

            // Pause when tab is hidden
            document.addEventListener('visibilitychange', () => {
                this.isActive = document.visibilityState === 'visible';
                if (this.isActive && !this.prefersReducedMotion) {
                    this.animate();
                }
            });
        }

        drawStatic() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw center
            this.drawParticle(this.centerParticle, true);
            
            // Draw satellites
            this.particles.forEach(particle => {
                this.drawParticle(particle, false);
            });
        }

        drawParticle(particle, isCenter) {
            const ctx = this.ctx;
            
            // Glow effect
            if (isCenter) {
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.glow
                );
                gradient.addColorStop(0, particle.color + '40');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.glow, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Particle
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Connection to center (for satellites)
            if (!isCenter) {
                ctx.strokeStyle = particle.color + '20';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(this.centerParticle.x, this.centerParticle.y);
                ctx.stroke();
            }
        }

        animate() {
            if (!this.isActive || this.prefersReducedMotion) return;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Update center pulse
            this.centerParticle.pulsePhase += 0.02;
            const pulseFactor = 1 + Math.sin(this.centerParticle.pulsePhase) * 0.2;
            this.centerParticle.glow = 20 * pulseFactor;

            // Update and draw satellites
            this.particles.forEach(particle => {
                // Update position
                particle.angle += particle.speed;
                particle.x = this.centerX + Math.cos(particle.angle) * particle.radiusOrbit;
                particle.y = this.centerY + Math.sin(particle.angle) * particle.radiusOrbit;

                // Trail effect
                particle.trail.push({ x: particle.x, y: particle.y });
                if (particle.trail.length > 10) {
                    particle.trail.shift();
                }

                // Draw trail
                if (particle.trail.length > 1) {
                    this.ctx.strokeStyle = particle.color + '15';
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                    for (let i = 1; i < particle.trail.length; i++) {
                        this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                    }
                    this.ctx.stroke();
                }

                this.drawParticle(particle, false);
            });

            // Draw center
            this.drawParticle(this.centerParticle, true);

            // Draw orbit rings
            this.ctx.strokeStyle = CONFIG.canvas.colors.silver + '10';
            this.ctx.lineWidth = 1;
            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.arc(this.centerX, this.centerY, particle.radiusOrbit, 0, Math.PI * 2);
                this.ctx.stroke();
            });

            this.animationId = requestAnimationFrame(() => this.animate());
        }

        destroy() {
            this.isActive = false;
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        }
    }

    // ============================================
    // Scroll Animations with Intersection Observer
    // ============================================
    class ScrollAnimations {
        constructor() {
            this.observers = [];
            this.init();
        }

        init() {
            this.setupHeroAnimations();
            this.setupRevealAnimations();
            this.setupNavScroll();
            this.setupSmoothScroll();
        }

        setupHeroAnimations() {
            // Hero tag reveal
            const heroTag = document.querySelector('.hero-tag');
            if (heroTag) {
                setTimeout(() => heroTag.classList.add('revealed'), 300);
            }

            // Title typewriter effect
            const titleLines = document.querySelectorAll('.title-line[data-typewriter]');
            titleLines.forEach((line, index) => {
                setTimeout(() => {
                    this.typewriter(line);
                }, 500 + (index * 1000));
            });

            // Hero subtitle and CTA
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroCta = document.querySelector('.hero-cta');
            
            if (heroSubtitle) {
                setTimeout(() => heroSubtitle.classList.add('revealed'), 2500);
            }
            if (heroCta) {
                setTimeout(() => heroCta.classList.add('revealed'), 2800);
            }
        }

        typewriter(element) {
            const text = element.textContent;
            element.textContent = '';
            element.classList.add('revealed');
            
            let i = 0;
            const type = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, CONFIG.animations.typingSpeed);
                }
            };
            type();
        }

        setupRevealAnimations() {
            const revealElements = document.querySelectorAll('[data-reveal]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: CONFIG.animations.scrollOffset,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(el => observer.observe(el));
            this.observers.push(observer);
        }

        setupNavScroll() {
            const nav = document.querySelector('.main-nav');
            if (!nav) return;

            let lastScroll = 0;
            let ticking = false;

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const currentScroll = window.pageYOffset;
                        
                        if (currentScroll > 100) {
                            nav.classList.add('scrolled');
                        } else {
                            nav.classList.remove('scrolled');
                        }
                        
                        lastScroll = currentScroll;
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }

        setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    }

    // ============================================
    // Terminal Typing Demo
    // ============================================
    class TerminalDemo {
        constructor() {
            this.terminal = document.querySelector('.terminal');
            if (!this.terminal) return;
            
            this.init();
        }

        init() {
            this.setupIntersectionObserver();
        }

        setupIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.startTyping();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(this.terminal);
        }

        startTyping() {
            const input = this.terminal.querySelector('[data-type-cmd]');
            const output = this.terminal.querySelector('[data-output]');
            
            if (!input) return;

            const command = input.dataset.typeCmd;
            input.textContent = '';

            let i = 0;
            const typeChar = () => {
                if (i < command.length) {
                    input.textContent += command.charAt(i);
                    i++;
                    setTimeout(typeChar, 80);
                } else {
                    // Show output after typing completes
                    setTimeout(() => {
                        if (output) {
                            output.classList.add('visible');
                        }
                    }, 500);
                }
            };

            // Start typing after a short delay
            setTimeout(typeChar, 500);
        }
    }

    // ============================================
    // Copy to Clipboard
    // ============================================
    class ClipboardManager {
        constructor() {
            this.buttons = document.querySelectorAll('[data-copy]');
            this.init();
        }

        init() {
            this.buttons.forEach(btn => {
                btn.addEventListener('click', (e) => this.handleCopy(e));
            });
        }

        async handleCopy(e) {
            const button = e.currentTarget;
            const codeElement = button.previousElementSibling;
            
            if (!codeElement) return;

            const text = codeElement.textContent;

            try {
                await navigator.clipboard.writeText(text);
                this.showCopied(button);
            } catch (err) {
                // Fallback for older browsers
                this.fallbackCopy(text, button);
            }
        }

        fallbackCopy(text, button) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                this.showCopied(button);
            } catch (err) {
                console.error('Copy failed:', err);
            }
            
            document.body.removeChild(textarea);
        }

        showCopied(button) {
            const originalText = button.querySelector('.copy-text').textContent;
            button.classList.add('copied');
            button.querySelector('.copy-text').textContent = 'Copied!';
            
            setTimeout(() => {
                button.classList.remove('copied');
                button.querySelector('.copy-text').textContent = originalText;
            }, 2000);
        }
    }

    // ============================================
    // Mobile Navigation
    // ============================================
    class MobileNav {
        constructor() {
            this.toggle = document.querySelector('.nav-toggle');
            this.links = document.querySelector('.nav-links');
            this.init();
        }

        init() {
            if (!this.toggle || !this.links) return;

            this.toggle.addEventListener('click', () => this.toggleNav());
            
            // Close on link click
            this.links.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.closeNav());
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeNav();
            });
        }

        toggleNav() {
            const isExpanded = this.toggle.getAttribute('aria-expanded') === 'true';
            this.toggle.setAttribute('aria-expanded', !isExpanded);
            this.links.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = this.toggle.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }

        closeNav() {
            this.toggle.setAttribute('aria-expanded', 'false');
            this.links.classList.remove('active');
            
            const spans = this.toggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }

    // ============================================
    // Archetype Cards Enhancement
    // ============================================
    class ArchetypeCards {
        constructor() {
            this.cards = document.querySelectorAll('.archetype-card');
            this.init();
        }

        init() {
            this.cards.forEach(card => {
                // Keyboard navigation
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });

                // Random subtle animation on load
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, Math.random() * 500);
            });
        }
    }

    // ============================================
    // Performance Optimizations
    // ============================================
    class PerformanceManager {
        constructor() {
            this.init();
        }

        init() {
            this.setupWillChange();
            this.setupLazyLoading();
            this.setupPrefetch();
        }

        setupWillChange() {
            // Add will-change to animated elements
            const animatedElements = document.querySelectorAll(
                '.mind-card, .archetype-card, .command-item, .platform-card'
            );
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.willChange = 'transform, opacity';
                    } else {
                        entry.target.style.willChange = 'auto';
                    }
                });
            }, { rootMargin: '100px' });

            animatedElements.forEach(el => observer.observe(el));
        }

        setupLazyLoading() {
            // Lazy load any images if they exist
            const images = document.querySelectorAll('img[data-src]');
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                });
                images.forEach(img => imageObserver.observe(img));
            } else {
                // Fallback
                images.forEach(img => {
                    img.src = img.dataset.src;
                });
            }
        }

        setupPrefetch() {
            // Prefetch external links on hover
            document.querySelectorAll('a[href^="http"]').forEach(link => {
                link.addEventListener('mouseenter', () => {
                    const prefetch = document.createElement('link');
                    prefetch.rel = 'prefetch';
                    prefetch.href = link.href;
                    document.head.appendChild(prefetch);
                }, { once: true });
            });
        }
    }

    // ============================================
    // Initialize Everything
    // ============================================
    function init() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initialize components
        new MindsVisualization('minds-canvas');
        new ScrollAnimations();
        new TerminalDemo();
        new ClipboardManager();
        new MobileNav();
        new ArchetypeCards();
        new PerformanceManager();

        // Console easter egg
        console.log('%cVENOM', 'font-size: 40px; font-weight: bold; color: #00d4ff;');
        console.log('%cNine minds. One coherence.', 'font-size: 14px; color: #6b6b8a;');
        console.log('%cNo shell. Just intelligence.', 'font-size: 14px; color: #e8e8f0;');

        // Log initialization
        console.log('[VENOM] Landing page initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        // Cleanup any running animations or intervals
        const canvas = document.getElementById('minds-canvas');
        if (canvas && canvas.__venomVisualization) {
            canvas.__venomVisualization.destroy();
        }
    });

})();
