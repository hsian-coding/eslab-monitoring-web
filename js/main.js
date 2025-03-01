document.addEventListener('DOMContentLoaded', () => {
    // Navbar burger menu functionality
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('#navbarMenuHeroC');
    
    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    });

    // Add page transition
    const lantaiLink = document.querySelector('a[href="lantai.html"]');
    if (lantaiLink) {
        lantaiLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent immediate navigation
            
            // Add fade-out effect to current page
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Navigate after transition
            setTimeout(() => {
                window.location.href = 'lantai.html';
            }, 300);
        });
    }

    // Contact modal functionality
    const contactButton = document.getElementById('contactButton');
    const contactModal = document.getElementById('contactModal');
    const modalBackground = contactModal.querySelector('.modal-background');
    const modalClose = contactModal.querySelector('.delete');

    contactButton.addEventListener('click', () => {
        contactModal.classList.add('is-active');
    });

    function closeModal() {
        contactModal.classList.remove('is-active');
    }

    modalBackground.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('is-active')) {
            closeModal();
        }
    });
}); 