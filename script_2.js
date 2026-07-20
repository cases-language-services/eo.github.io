/**
 * Esperanto Educational Website
 * Smooth UI Features, Active Navigation Detection, Glassmorphism Tilt FX, & Interactive Quizzes.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Highlight Active Page Link in Navigation
    const highlightActiveNav = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // 2. Interactive Radio Quiz Feedback
    const setupQuizFeedback = () => {
        const fieldsets = document.querySelectorAll('fieldset');

        fieldsets.forEach(fieldset => {
            const radioButtons = fieldset.querySelectorAll('input[type="radio"]');

            radioButtons.forEach(radio => {
                radio.addEventListener('change', () => {
                    // Remove existing validation styles
                    fieldset.classList.remove('correct-answer', 'wrong-answer');

                    // Check selected value (Assuming option 'b' or 'a' depends on content structure,
                    // here giving active selection state visual clarity)
                    if (radio.checked) {
                        fieldset.style.borderColor = 'var(--eo-green-light)';
                        fieldset.style.boxShadow = '0 0 10px rgba(34, 197, 94, 0.2)';
                    }
                });
            });
        });
    };

    // 3. Subtle Glass Card 3D Tilt Effect on Mouse Move
    const setupCardTilt = () => {
        const cards = document.querySelectorAll('.card, .dialogue-card, .exercise-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within element
                const y = e.clientY - rect.top;  // y position within element

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    };

    // 4. Scroll Reveal Fade-in Animations
    const setupScrollReveal = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatableElements = document.querySelectorAll('section, .card, .dialogue-card, .exercise-card');
        
        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    };

    // Initialize all functionality
    highlightActiveNav();
    setupQuizFeedback();
    setupCardTilt();
    setupScrollReveal();
});