// Mobile Menu Toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('closeMenu');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

closeMenu.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

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
});

// Scroll Reveal Animation
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    scrollRevealElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
            element.classList.add('revealed');

            // Добавляем задержку для мобильных устройств
            if (window.innerWidth <= 768) {
                element.style.transitionDelay = `${element.dataset.delay || '0.1s'}`;
            }
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Particle Animation
const particlesContainer = document.getElementById('particles');
const particleCount = 30;

for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random parameters
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

    // Recreate particle after animation completes
    setTimeout(() => {
        particle.remove();
        createParticle();
    }, (duration + delay) * 1000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            burger.classList.remove('open');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

// Анимация чисел
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200; // Скорость анимации

    statNumbers.forEach(statNumber => {
        if (!statNumber.dataset.target) return;

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

// Запуск анимации при появлении секции
const aboutSection = document.querySelector('#about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(aboutSection);

// ===== НОВЫЕ АНИМАЦИИ ===== //



// Анимация монет в герое
function animateCoins() {
    const coins = document.querySelectorAll('.coin');
    if (!coins.length) return;

    coins.forEach((coin, index) => {
        // Разные скорости анимации для каждой монеты
        const duration = 3 + Math.random() * 2;
        coin.style.animation = `coinFloat ${duration}s infinite ease-in-out`;

        // Случайные небольшие движения в стороны
        coin.addEventListener('animationiteration', () => {
            const randomX = (Math.random() - 0.5) * 20;
            coin.style.transform = `translate(${randomX}px, -10px) rotate(5deg)`;

            setTimeout(() => {
                coin.style.transform = `translate(0, 0) rotate(0)`;
            }, duration * 500);
        });
    });
}

// Анимация кнопок при наведении
function enhanceButtons() {
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

        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(1px)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px)';
        });
    });
}

// Анимация карточек счетов
function animateAccountCards() {
    const cards = document.querySelectorAll('.account-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

// Анимация для мобильного меню
function enhanceMobileMenu() {
    const burger = document.getElementById('burger');
    const spans = burger.querySelectorAll('span');

    burger.addEventListener('click', () => {
        spans.forEach((span, index) => {
            span.style.transform = burger.classList.contains('open') ?
                'rotate(0) translateY(0)' :
                `rotate(${index === 1 ? '0' : index === 0 ? '45deg' : '-45deg'}) translateY(${index === 0 ? '8px' : index === 2 ? '-8px' : '0'})`;
        });
    });
}

// Анимация индикатора объема торгов
function animateVolumeIndicator() {
    const volumeBar = document.querySelector('.volume-bar');
    if (!volumeBar) return;

    const widths = ['70%', '65%', '75%', '80%', '68%'];
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % widths.length;
        volumeBar.style.width = widths[currentIndex];
        volumeBar.style.transition = 'width 1.5s ease-in-out';
    }, 3000);
}

// Анимация бейджей популярности
function animatePopularityBadges() {
    const badges = document.querySelectorAll('.popularity-badge');
    if (!badges.length) return;

    badges.forEach(badge => {
        setInterval(() => {
            badge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 500);
        }, 3000);
    });
}

// Параллакс эффект для частиц
function setupParallax() {
    const particles = document.getElementById('particles');
    if (!particles) return;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        particles.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
}

// Анимация линий тренда в карточках
function animateTrendLines() {
    const trendLines = document.querySelectorAll('.trend-line');
    if (!trendLines.length) return;

    trendLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.width = '100%';
            line.style.transition = 'width 1s ease-in-out';
        }, index * 200);
    });
}

// Инициализация всех анимаций
function initAnimations() {
    animatePriceChange();
    animateChart();
    animateCoins();
    enhanceButtons();
    animateAccountCards();
    enhanceMobileMenu();
    animateVolumeIndicator();
    animatePopularityBadges();
    setupParallax();
    animateTrendLines();

    // Установка задержек для мобильных устройств
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.feature-card, .step-card, .account-card').forEach((card, index) => {
            card.dataset.delay = `${index * 0.1}s`;
        });
    }
}

// Запуск при полной загрузке страницы
window.addEventListener('DOMContentLoaded', initAnimations);