document.addEventListener('DOMContentLoaded', async () => {
    // Navbar burger menu functionality
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('#navbarMenuHeroC');
    
    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    });

    // Add page transitions
    function addPageTransition(selector, targetPage) {
        const link = document.querySelector(selector);
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent immediate navigation
                
                // Add fade-out effect to current page
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = targetPage;
                }, 100);
            });
        }
    }

    // Add transitions for both pages
    addPageTransition('a[href="lantai.html"]', 'lantai.html');
    addPageTransition('a[href="chulin.html"]', 'chulin.html');

    // Contact modal functionality
    const contactButton = document.getElementById('contactButton');
    const contactModal = document.getElementById('contactModal');
    const modalBackground = contactModal.querySelector('.modal-background');
    const modalClose = contactModal.querySelector('.delete');

    // Load contact information
    async function loadContactInfo() {
        try {
            const response = await fetch('data/contact_information.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error loading contact information:', error);
            return null;
        }
    }

    // Update modal content with contact information
    async function updateContactModal() {
        const contactInfo = await loadContactInfo();
        if (!contactInfo) return;

        const modalBody = contactModal.querySelector('.modal-card-body .content');
        modalBody.innerHTML = `
            <div class="contact-item">
                <span class="icon">
                    <i class="fas fa-map-marker-alt"></i>
                </span>
                <span>${contactInfo.address}</span>
            </div>
            <div class="contact-item">
                <span class="icon">
                    <i class="fas fa-phone"></i>
                </span>
                <span>${contactInfo.phone}</span>
            </div>
            <div class="contact-item">
                <div class="icon-text">
                    <span class="icon">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <div class="contact-info">
                        ${contactInfo.contacts.map(contact => `
                            <p class="contact-line">
                                <strong>${contact.name}</strong> (${contact.title}) ${contact.extension} - 
                                <span class="email-text">${contact.email}</span>
                            </p>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="contact-item">
                <a href="${contactInfo.social.instagram}" target="_blank" class="icon-text">
                    <span class="icon">
                        <i class="fab fa-instagram"></i>
                    </span>
                    <span>Follow us on Instagram</span>
                </a>
            </div>
        `;
    }

    // Update modal content when button is clicked
    contactButton.addEventListener('click', async () => {
        await updateContactModal();
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