document.addEventListener('DOMContentLoaded', () => {
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.classList.add('lightbox-overlay');
    document.body.appendChild(lightboxOverlay);

    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    lightboxOverlay.appendChild(lightboxContent);

    const closeButton = document.createElement('button');
    closeButton.classList.add('lightbox-close');
    closeButton.innerHTML = '&times;';
    lightboxContent.appendChild(closeButton);

    const triggers = document.querySelectorAll('.lightbox-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent link from opening in new tab
            lightboxOverlay.classList.add('visible');
            document.body.classList.add('no-scroll');

            // Clear previous content
            const existingMedia = lightboxContent.querySelector('img, video');
            if (existingMedia) {
                existingMedia.remove();
            }

            const sourceUrl = trigger.href;
            const isVideo = sourceUrl.match(/\.(mp4|webm|mov)$/i);
            
            let mediaElement;
            if (isVideo) {
                mediaElement = document.createElement('video');
                mediaElement.src = sourceUrl;
                mediaElement.controls = true;
                mediaElement.autoplay = true; 
            } else {
                mediaElement = document.createElement('img');
                mediaElement.src = sourceUrl;
            }
            
            mediaElement.alt = trigger.querySelector('img')?.alt || 'Lightbox content';
            lightboxContent.insertBefore(mediaElement, closeButton);
        });
    });

    const closeLightbox = () => {
        lightboxOverlay.classList.remove('visible');
        document.body.classList.remove('no-scroll');
        const mediaElement = lightboxContent.querySelector('img, video');
        if (mediaElement && mediaElement.tagName === 'VIDEO') {
            mediaElement.pause(); // Stop video playback
        }
    };

    closeButton.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) { // Only close if clicking on the overlay itself
            closeLightbox();
        }
    });

    // Bot card scroller
    const scrollContainer = document.querySelector('.bot-cards-container');
    const scrollRightBtn = document.getElementById('scroll-bots-right');

    if (scrollContainer && scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => {
            const card = scrollContainer.querySelector('.bot-card');
            if (!card) return;
            const cardWidth = card.offsetWidth;
            const gap = 20; // As defined in CSS
            const scrollAmount = cardWidth + gap;

            // If we are near the end, scroll back to the beginning
            if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 5) { // 5px tolerance
                scrollContainer.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                scrollContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Scroll to Top Button Logic ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Optional: Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('visible')) {
            closeLightbox();
        }
    });
});
