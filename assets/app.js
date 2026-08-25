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
