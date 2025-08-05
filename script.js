// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.leadership-card, .achievement-item, .news-article, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = navbar.offsetHeight;
        
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active state styles for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
const countUp = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target === parseInt(target)) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = current.toFixed(1);
        }
        
        if (element.textContent.includes('SADC')) {
            element.textContent = 'SADC';
        }
    }, 16);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            if (text.includes('+')) {
                const number = parseInt(text);
                statNumber.textContent = '0+';
                countUp(statNumber, number, 1500);
                setTimeout(() => {
                    statNumber.textContent = number + '+';
                }, 1500);
            } else if (!text.includes('SADC')) {
                const number = parseInt(text);
                if (!isNaN(number)) {
                    statNumber.textContent = '0';
                    countUp(statNumber, number, 1500);
                }
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
});

// Add hover effects to cards
document.querySelectorAll('.leadership-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for sections
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, revealOptions);

// Add reveal styles and observe sections
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .about-content,
    .expertise-areas {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .about-content.revealed,
    .expertise-areas.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.about-content, .expertise-areas');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus trap for mobile menu
const focusableElements = navMenu.querySelectorAll('a');
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

document.addEventListener('keydown', (e) => {
    if (!navMenu.classList.contains('active')) return;
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
});
        function copyCode(codeId) {
            const codeElement = document.getElementById(codeId);
            const textToCopy = codeElement.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(function() {
                showToast();
            }).catch(function(err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast();
            });
        }

        function showToast() {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Add syntax highlighting effect
        document.addEventListener('DOMContentLoaded', () => {
            const codeBlocks = document.querySelectorAll('pre');
            codeBlocks.forEach(block => {
                let html = block.innerHTML;
                
                // Simple syntax highlighting for HTML, CSS, and JS
                html = html.replace(/(&lt;\/?[^&gt;]+&gt;)/g, '<span style="color: #e06c75;">$1</span>');
                html = html.replace(/(\/\*[^*]*\*\/)/g, '<span style="color: #5c6370; font-style: italic;">$1</span>');
                html = html.replace(/(\/\/[^\n]*)/g, '<span style="color: #5c6370; font-style: italic;">$1</span>');
                html = html.replace(/\b(function|const|let|var|if|else|for|while|return|class|extends|import|export|default)\b/g, '<span style="color: #c678dd;">$1</span>');
                html = html.replace(/\b(color|background|margin|padding|width|height|display|position|font-family|font-size)\b/g, '<span style="color: #d19a66;">$1</span>');
                html = html.replace(/(['"][^'"]*['"])/g, '<span style="color: #98c379;">$1</span>');
                
                block.innerHTML = html;
            });
        });