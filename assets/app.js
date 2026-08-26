import './stimulus_bootstrap.js';
import './styles/app.css';


// Apparition au scroll
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.05
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


// Navigation par ancres
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');

        if (!targetId || targetId === '#') {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        // Affiche immédiatement le contenu de la section
        const revealElement = target.querySelector('.reveal');

        if (revealElement) {
            revealElement.classList.add('is-visible');
            observer.unobserve(revealElement);
        }

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        history.replaceState(null, '', targetId);
    });
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = carousel.querySelectorAll('.project-slide');
    const dots = carousel.querySelectorAll('[data-carousel-dot]');
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');

    let currentIndex = 0;

    const showSlide = (index) => {
        slides[currentIndex].classList.remove('is-active');
        dots[currentIndex].classList.remove('is-active');

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add('is-active');
        dots[currentIndex].classList.add('is-active');
    };

    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
});
