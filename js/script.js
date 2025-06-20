// Mobile Menu Toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('closeMenu');

if (burger && mobileMenu && overlay && closeMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    closeMenu.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    overlay.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Scroll Reveal Animation
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
if (scrollRevealElements.length) {
    const revealOnScroll = () => {
        scrollRevealElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
}

// Particle Animation
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    const particleCount = 30;

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.bottom = `-10px`;
        particle.style.animation = `particleMove ${duration}s linear ${delay}s infinite`;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (burger && mobileMenu && overlay) {
                burger.classList.remove('open');
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
});

// Number Animation
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    const speed = 200; // Animation speed

    statNumbers.forEach(statNumber => {
        const target = +statNumber.dataset.target;
        const suffix = statNumber.textContent.match(/[^0-9]/g)?.join('') || '';
        const start = 0;
        const increment = target / speed;

        let current = start;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                statNumber.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateNumber);
            } else {
                statNumber.textContent = target + suffix;
            }
        };

        updateNumber();
    });
}

// Intersection Observer for Number Animation
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);
}

// Platform Redirect Function
function redirectToPlatform() {
    const pcUrl = 'https://private.deepex.finance/';
    const mobileUrl = 'https://mobile.deepex.finance/';

    // Modern mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    window.location.href = isMobile ? mobileUrl : pcUrl;
}

// Initialize all buttons with redirect functionality
document.querySelectorAll('.account-btn').forEach(button => {
    button.addEventListener('click', redirectToPlatform);
});

// Enhanced Animations
function initAnimations() {
    // Coin animation
    const coins = document.querySelectorAll('.coin');
    if (coins.length) {
        coins.forEach((coin, index) => {
            const duration = 3 + Math.random() * 2;
            coin.style.animation = `coinFloat ${duration}s infinite ease-in-out`;
        });
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.account-btn, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 10px 20px rgba(0, 247, 255, 0.3)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 0 15px rgba(0, 247, 255, 0.3)';
        });
    });

    // Account card animations
    const accountCards = document.querySelectorAll('.account-card');
    accountCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });

    // Volume indicator animation
    const volumeBar = document.querySelector('.volume-bar');
    if (volumeBar) {
        const widths = ['70%', '65%', '75%', '80%', '68%'];
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % widths.length;
            volumeBar.style.width = widths[currentIndex];
        }, 3000);
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();

    // Set delays for mobile devices
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.feature-card, .step-card, .account-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }
});