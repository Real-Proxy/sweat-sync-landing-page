document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Set launch date (3 months from now)
    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 3);

    // Countdown timer
    function updateCountdown() {
        const now = new Date();
        const diff = launchDate - now;

        if (diff <= 0) {
            document.querySelector('.countdown-timer').innerHTML = '<div class="launch-message">IMPULSE has launched! Download now!</div>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Email modal
    const modal = document.getElementById('email-modal');
    const earlyAccessBtn = document.getElementById('early-access-btn');
    const earlyAccessLinks = document.querySelectorAll('.early-access-link');
    const closeModal = document.querySelector('.close-modal');
    const emailForm = document.getElementById('early-access-form');
    const modalEmailForm = document.getElementById('modal-email-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    earlyAccessBtn.addEventListener('click', openModal);
    earlyAccessLinks.forEach(link => link.addEventListener('click', openModal));
    closeModal.addEventListener('click', closeModalFunc);

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // Form submission
    function handleFormSubmit(form, emailInputId) {
        return function(e) {
            e.preventDefault();
            const email = document.getElementById(emailInputId).value;
            
            // In a real app, you would send this to your backend
            console.log('Email submitted:', email);
            
            // Show thank you message
            if (form === emailForm) {
                emailForm.style.display = 'none';
                thankYouMessage.style.display = 'block';
            } else {
                closeModalFunc();
                alert('Thank you for your interest! We\'ll be in touch soon about early access.');
            }
            
            // Reset form
            form.reset();
        };
    }

    emailForm.addEventListener('submit', handleFormSubmit(emailForm, 'email'));
    modalEmailForm.addEventListener('submit', handleFormSubmit(modalEmailForm, 'modal-email'));

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});