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

    const images = document.querySelectorAll('.section img, .toggle div img, .section video, .toggle div video');

    images.forEach(item => {
        // No need to add 'lightbox-image' class if styles target img/video directly
        // item.classList.add('lightbox-image'); 
        item.addEventListener('click', (e) => {
            e.preventDefault();
            lightboxOverlay.classList.add('visible');
            document.body.classList.add('no-scroll');

            // Clear previous content
            const existingMedia = lightboxContent.querySelector('img, video');
            if (existingMedia) {
                existingMedia.remove();
            }

            let mediaElement;
            if (item.tagName === 'VIDEO') {
                mediaElement = document.createElement('video');
                mediaElement.src = item.src || item.querySelector('source')?.src;
                mediaElement.controls = true;
                mediaElement.autoplay = true; 
            } else {
                mediaElement = document.createElement('img');
                mediaElement.src = item.src;
            }
            mediaElement.alt = item.alt || 'Lightbox image';
            lightboxContent.insertBefore(mediaElement, closeButton); // Insert before close button
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
