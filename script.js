// Protect profile image from downloading
const profileImage = document.querySelector('.profile-image img');
if (profileImage) {
    profileImage.addEventListener('contextmenu', (e) => e.preventDefault());
    profileImage.addEventListener('dragstart', (e) => e.preventDefault());
}

// Animation on click
document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple animation
        if (!this.querySelector('.ripple')) {
            const style = document.createElement('style');
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, transparent 70%);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                
                @keyframes ripple-animation {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);

        // Add pulse animation
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 600);
    });

    // Add mousedown effect
    card.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-8px) scale(0.98)';
    });

    card.addEventListener('mouseup', function() {
        this.style.transform = '';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Add a subtle shine effect on load
window.addEventListener('load', () => {
    document.querySelectorAll('.link-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        }, 100 + index * 50);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const cards = document.querySelectorAll('.link-card');
    if (e.key === 'Enter' && document.activeElement.classList.contains('link-card')) {
        document.activeElement.click();
    }
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const bgElements = document.querySelectorAll('.animated-bg-1, .animated-bg-2');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    bgElements.forEach((element, index) => {
        const offset = (index + 1) * 10;
        element.style.transform = `translate(${x * offset}px, ${y * offset}px)`;
    });
});

// Add console message for fun
console.log('%cZane Karter - Artiste Musicien', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cBienvenue sur ma page de liens!', 'font-size: 16px; color: #0099ff;');
