document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            try {
                // Using Formspree for form submission (free service)
                const response = await fetch('https://formspree.io/f/mgvyaogw', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if(response.ok) {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.innerHTML = `
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
                        </svg>
                        <p>Message sent successfully!</p>
                    `;
                    contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        successMsg.style.opacity = '0';
                        setTimeout(() => successMsg.remove(), 300);
                    }, 5000);
                    
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('There was an error sending your message. Please try again later or email me directly at angelhudgins0401@gmail.com');
                console.error('Form submission error:', error);
            }
        });
    }
});