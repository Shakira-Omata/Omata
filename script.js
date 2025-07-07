// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile menu toggle functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
    
    // Change icon between hamburger and close
    const icon = mobileMenuButton.querySelector('i');
    if (mobileMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        mobileMenuButton.querySelector('i').classList.remove('fa-times');
        mobileMenuButton.querySelector('i').classList.add('fa-bars');
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formResponse = document.getElementById('formResponse');
    
    // Show loading state
    formResponse.classList.remove('hidden');
    formResponse.innerHTML = `
        <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Sending...</strong>
            <span class="block sm:inline">Your message is being sent. Please wait.</span>
        </div>
    `;
    
    fetch('https://formsubmit.co/ajax/omatashakira254@gmail.com', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        formResponse.innerHTML = `
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Success!</strong>
                <span class="block sm:inline">Your message has been sent. I'll get back to you soon!</span>
            </div>
        `;
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        formResponse.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Error!</strong>
                <span class="block sm:inline">There was a problem sending your message. Please try again later.</span>
            </div>
        `;
    });
});

// Smooth scrolling for navigation links (optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optional: Refresh AOS on window resize for better responsiveness
window.addEventListener('resize', function() {
    AOS.refresh();
});