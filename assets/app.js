import './stimulus_bootstrap.js';
import './styles/app.css';


// ========================================
// APPARITION AU SCROLL
// ========================================

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


// ========================================
// NAVIGATION PAR ANCRES
// ========================================

// ========================================
// NAVIGATION PAR ANCRES
// ========================================

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


        // ----------------------------------------
        // Lien d'évitement
        // ----------------------------------------

        if (link.classList.contains('skip-link')) {

            target.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });

            target.focus({
                preventScroll: true
            });

            history.replaceState(null, '', targetId);

            return;
        }


        // ----------------------------------------
        // Ancres classiques
        // ----------------------------------------

        const revealElement = target.matches('.reveal')
            ? target
            : target.querySelector('.reveal');

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


// ========================================
// CARROUSELS
// ========================================

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(
        carousel.querySelectorAll('.project-slide')
    );

    const dots = Array.from(
        carousel.querySelectorAll('[data-carousel-dot]')
    );

    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');

    if (
        slides.length === 0 ||
        dots.length === 0 ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }

    let currentIndex = slides.findIndex((slide) =>
        slide.classList.contains('is-active')
    );

    if (currentIndex === -1) {
        currentIndex = 0;
    }


    // ----------------------------------------
    // Initialise l'accessibilité
    // ----------------------------------------

    slides.forEach((slide, index) => {
        slide.setAttribute(
            'aria-hidden',
            index === currentIndex ? 'false' : 'true'
        );

        slide.setAttribute(
            'aria-label',
            `${index + 1} sur ${slides.length}`
        );

        slide.setAttribute(
            'role',
            'group'
        );
    });

    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.removeAttribute('aria-current');
        }
    });


    // ----------------------------------------
    // Affiche une slide
    // ----------------------------------------

    const showSlide = (index) => {
        slides[currentIndex].classList.remove('is-active');
        slides[currentIndex].setAttribute('aria-hidden', 'true');

        dots[currentIndex].classList.remove('is-active');
        dots[currentIndex].removeAttribute('aria-current');

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add('is-active');
        slides[currentIndex].setAttribute('aria-hidden', 'false');

        dots[currentIndex].classList.add('is-active');
        dots[currentIndex].setAttribute('aria-current', 'true');
    };


    // ----------------------------------------
    // Boutons précédent / suivant
    // ----------------------------------------

    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });


    // ----------------------------------------
    // Navigation par les points
    // ----------------------------------------

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });


    // ----------------------------------------
    // Navigation clavier
    // ----------------------------------------

    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showSlide(currentIndex - 1);
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            showSlide(currentIndex + 1);
        }
    });
});
