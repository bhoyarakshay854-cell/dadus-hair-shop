document.addEventListener('DOMContentLoaded', () => {
    // ---- Mobile Navigation Toggle ----
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when an item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ---- Sticky Header ----
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = '';
        const pageYOffset = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            // Check if the href matches the current section id (e.g., #home matches current='home')
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ---- Scroll Animation (Intersection Observer) ----
    const animateElements = document.querySelectorAll('.fade-up, .fade-in, .fade-left, .fade-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ---- Setup initial state for header if loaded scrolled ----
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // ---- Booking Form Submission to WhatsApp Admin ----
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const serviceSelect = document.getElementById('service');
            const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            // Format the message for WhatsApp
            const message = `*New Appointment Request*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${serviceText}%0A*Date:* ${date}%0A*Time:* ${time}%0A%0APlease confirm the booking.`;

            // Admin WhatsApp number
            const adminNumber = '918830862117';

            // Open WhatsApp with the pre-filled message
            window.open(`https://wa.me/${adminNumber}?text=${message}`, '_blank');

            // Reset the form
            bookingForm.reset();
        });
    }
});
