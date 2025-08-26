// gallery.js

document.addEventListener('DOMContentLoaded', () => {
    // Select all the elements we need
    const galleryImages = document.querySelectorAll('.masonry-item img');
    const modal = document.getElementById('galleryModal');
    const modalImage = modal.querySelector('.modal-gallery-image');
    const closeModalBtn = modal.querySelector('.modal-gallery-close');

    // Function to open the modal
    const openModal = (e) => {
        const imgSrc = e.target.src;
        modalImage.src = imgSrc;
        modal.classList.add('active');
    };

    // Function to close the modal
    const closeModal = () => {
        modal.classList.remove('active');
        // Reset zoom state when closing
        modalImage.classList.remove('zoomed');
    };

    // Function to handle zooming
    const toggleZoom = () => {
        modalImage.classList.toggle('zoomed');
    };

    // Add click listeners to every gallery image
    galleryImages.forEach(img => {
        img.addEventListener('click', openModal);
    });

    // Add click listener to the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Add click listener to the modal overlay to close it
    if (modal) {
        modal.addEventListener('click', (e) => {
            // Close only if the overlay itself is clicked, not the image
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Add click listener to the image inside the modal to zoom
    if (modalImage) {
        modalImage.addEventListener('click', toggleZoom);
    }

    // Add keyboard listener to close with the 'Escape' key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});