// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// MOBILE MENU TOGGLE
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ACTIVE LINK HIGHLIGHTING
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// COUNTDOWN TIMER
function updateCountdown() {
    const countdownDate = new Date("June 12, 2026 20:30:00").getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    
    if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.innerHTML = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.innerHTML = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        const countdownSection = document.querySelector(".countdown");
        if (countdownSection) {
            countdownSection.innerHTML = "<h2>FESTIVAL IS LIVE!</h2>";
        }
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// PARALLAX EFFECT FOR HERO
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image-layer');
    const scrolled = window.pageYOffset;
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.001})`;
    }
});

// SPONSOR CAROUSEL - CLONAZIONE PER EFFETTO INFINITO
document.addEventListener('DOMContentLoaded', function() {
    const sponsorCarousel = document.getElementById('sponsorCarousel');
    
    if (sponsorCarousel) {
        // Clona TUTTE le card sponsor per creare un effetto veramente infinito
        const cards = Array.from(sponsorCarousel.children);
        
        // Clona ogni card almeno 3 volte per assicurare continuità
        for (let i = 0; i < 3; i++) {
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                sponsorCarousel.appendChild(clone);
            });
        }
        
        // Regola la durata dell'animazione in base al numero di card
        const totalCards = sponsorCarousel.children.length;
        const cardWidth = window.innerWidth <= 768 ? 310 : 380; // larghezza + gap
        const totalWidth = cardWidth * totalCards;
        
        // Crea una nuova animazione personalizzata
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes scrollSponsorsDynamic {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${totalWidth / 3}px); }
            }
            .sponsor-carousel {
                animation: scrollSponsorsDynamic 60s linear infinite;
            }
        `;
        document.head.appendChild(style);
    }
});

// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
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

document.querySelectorAll('.vibe-card, .artist-card, .ticket-card, .sponsor-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// SPONSOR CAROUSEL - MIGLIORATO
document.addEventListener('DOMContentLoaded', function() {
    const sponsorTrack = document.getElementById('sponsorTrack');
    
    if (sponsorTrack) {
        // Clona le righe per effetto infinito
        const rows = document.querySelectorAll('.carousel-row');
        if (rows.length >= 2) {
            // La seconda riga è già un clone, ma possiamo aggiungerne altre
            for (let i = 0; i < 2; i++) {
                rows.forEach(row => {
                    const clone = row.cloneNode(true);
                    sponsorTrack.appendChild(clone);
                });
            }
        }
    }
});

// EFFETTO PARALLAX PER GLI SPONSOR
window.addEventListener('scroll', () => {
    const sponsorsSection = document.querySelector('.sponsors-premium');
    if (sponsorsSection) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.2;
        const cards = document.querySelectorAll('.sponsor-card');
        cards.forEach((card, index) => {
            card.style.transform = `translateY(${rate * (index % 2 === 0 ? 1 : -1)}px)`;
        });
    }
});