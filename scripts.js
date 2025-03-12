// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 4, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // Typing effect
    const texts = ['BACK-END DEVELOPER', 'VIRTUAL ASSISTANT'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000;

    function type() {
        if (!isDeleting && index <= currentText.length) {
            // Typing
            letter = currentText.slice(0, index);
            document.querySelector('.typing-text').textContent = letter;
            index++;
            setTimeout(type, typingDelay);
        } else if (isDeleting && index > 0) {
            // Erasing
            letter = currentText.slice(0, index - 1);
            document.querySelector('.typing-text').textContent = letter;
            index--;
            setTimeout(type, erasingDelay);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                count = (count + 1) % texts.length;
                currentText = texts[count];
                index = 1;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(type, newTextDelay);
            }
        }
    }

    // Initialize typing effect
    currentText = texts[0];
    type();

    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        mobileMenu.querySelector('i').classList.toggle('fa-times');
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.querySelector('i').classList.toggle('fa-sun');
        themeToggle.querySelector('i').classList.toggle('fa-moon');
    });

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById("back-to-top");
    
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // Form animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            input.addEventListener('focus', () => group.classList.add('focused'));
            input.addEventListener('blur', () => {
                if (!input.value) group.classList.remove('focused');
            });
        }
    });

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});