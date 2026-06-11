// ========================================
// BLINKTALK WEBSITE - MAIN JAVASCRIPT
// ========================================

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initScrollAnimations();
    initNavbar();
    initMobileMenu();
});

// ===== ANIMATED PARTICLES BACKGROUND =====
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particle.style.cssText += `
            position: absolute;
            background: radial-gradient(circle, #00e5ff, transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${duration}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        container.appendChild(particle);
    }
}

// Add particle animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        25% {
            transform: translate(20px, -20px) scale(1.2);
        }
        50% {
            transform: translate(-10px, -40px) scale(0.8);
        }
        75% {
            transform: translate(-30px, -20px) scale(1.1);
        }
    }
`;
document.head.appendChild(style);

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for grids
                if (entry.target.parentElement.classList.contains('impact-grid') ||
                    entry.target.parentElement.classList.contains('features-grid') ||
                    entry.target.parentElement.classList.contains('team-grid')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = (index * 0.1) + 's';
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with card-animate class
    const animatedElements = document.querySelectorAll('.card-animate');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinksContainer = document.getElementById('navLinks');
                navLinksContainer.classList.remove('active');
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (toggle) {
        toggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// ===== USER GUIDE INTERFACE =====
function showApp() {
    const landingPage = document.getElementById('landing-page');
    const navbar = document.getElementById('navbar');
    const appInterface = document.getElementById('app-interface');
    
    // Hide landing page and navbar
    landingPage.classList.add('hidden');
    navbar.classList.add('hidden');
    
    // Show app interface
    appInterface.classList.remove('hidden');
    appInterface.style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeApp() {
    const landingPage = document.getElementById('landing-page');
    const navbar = document.getElementById('navbar');
    const appInterface = document.getElementById('app-interface');
    
    // Show landing page and navbar
    landingPage.classList.remove('hidden');
    navbar.classList.remove('hidden');
    
    // Hide app interface
    appInterface.classList.add('hidden');
    appInterface.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// ===== DEMO VIDEO =====
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-container video');
    
    if (video) {
        // Add custom video controls styling on play
        video.addEventListener('play', function() {
            this.parentElement.style.borderColor = 'var(--primary)';
        });
        
        video.addEventListener('pause', function() {
            this.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    }
});

// ===== SMOOTH SCROLL FOR ALL INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hrefs
        if (href === '#') return;
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create confetti effect
    const colors = ['#00e5ff', '#7c4dff', '#ff6b6b'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
    
    // Show message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px 60px;
        border-radius: 20px;
        font-size: 2rem;
        font-weight: bold;
        color: white;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        text-align: center;
    `;
    message.innerHTML = `
        🎉 Easter Egg Unlocked! 🎉<br>
        <span style="font-size: 1rem; opacity: 0.9;">You found the secret!</span>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transition = 'opacity 0.5s';
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// ===== CURSOR TRAIL EFFECT (Optional Enhancement) =====
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', function(e) {
    // Only on desktop
    if (window.innerWidth > 768) {
        createTrailDot(e.clientX, e.clientY);
    }
});

function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: radial-gradient(circle, #00e5ff, transparent);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        z-index: 9998;
        opacity: 0.6;
    `;
    
    document.body.appendChild(dot);
    cursorTrail.push(dot);
    
    // Fade out and remove
    setTimeout(() => {
        dot.style.transition = 'opacity 0.5s';
        dot.style.opacity = '0';
        setTimeout(() => {
            dot.remove();
            cursorTrail = cursorTrail.filter(d => d !== dot);
        }, 500);
    }, 200);
    
    // Limit trail length
    if (cursorTrail.length > maxTrailLength) {
        const oldDot = cursorTrail.shift();
        oldDot.remove();
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(function() {
    updateActiveNavLink();
}, 100));

// ===== LOG INITIALIZATION =====
console.log(`
%c
╔═══════════════════════════════════════╗
║     BLINKTALK WEBSITE LOADED ✓        ║
║   Empowering Communication 2025       ║
╚═══════════════════════════════════════╝
`,
'color: #00e5ff; font-weight: bold; font-size: 12px;'
);

console.log('%cWebsite Features:', 'color: #00e5ff; font-weight: bold; font-size: 14px;');
console.log('✓ Animated particles background');
console.log('✓ Scroll-triggered animations');
console.log('✓ Smooth scrolling navigation');
console.log('✓ Mobile-responsive design');
console.log('✓ User guide interface');
console.log('✓ Easter egg activated with Konami code');
console.log('%cTry: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #7c4dff; font-style: italic;');