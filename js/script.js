// --- Modal Window Logic ---
const bookingModal = document.getElementById('bookingModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const bookNowBtn = document.querySelector('.cta-button[href="#booking"]');

const policiesModal = document.getElementById('policiesModal');
const closePoliciesBtn = document.getElementById('closePoliciesBtn');
const openPoliciesBtn = document.getElementById('openPoliciesBtn'); // Exists only on index.html
const policiesLinkHere = document.getElementById('policiesLinkHere'); // Exists only on index.html

// Function to open the modal
const openModal = () => {
    if (bookingModal) {
        bookingModal.classList.add('active');
    }
};

// Function to close the modal
const closeModal = () => {
    if (bookingModal) {
        bookingModal.classList.remove('active');
    }
};

// Event Listeners for bookingModal (check if elements exist)
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor link behavior
        openModal();
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (bookingModal) {
    // Close modal when clicking on the overlay (outside the content)
    bookingModal.addEventListener('click', (event) => {
        if (event.target === bookingModal) {
            closeModal();
        }
    });
}

// --- Event Listener for the "here" link ---
// Check if the element exists before adding a listener
if (policiesLinkHere) {
    policiesLinkHere.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the link from jumping to the top of the page
        policiesModal.classList.add('active');
    });
}

// --- Event Listeners for Policies Modal ---
// Check if the element exists before adding a listener
if (openPoliciesBtn) {
    openPoliciesBtn.addEventListener('click', () => {
        policiesModal.classList.add('active');
    });
}

if (closePoliciesBtn) {
    closePoliciesBtn.addEventListener('click', () => {
        policiesModal.classList.remove('active');
    });
}

if (policiesModal) {
    policiesModal.addEventListener('click', (event) => {
        if (event.target === policiesModal) {
            policiesModal.classList.remove('active');
        }
    });
}

// Close modal when pressing the "Escape" key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (bookingModal && bookingModal.classList.contains('active')) {
            bookingModal.classList.remove('active');
        }
        if (policiesModal && policiesModal.classList.contains('active')) {
            policiesModal.classList.remove('active');
        }
    }
});

// --- Sticky Header on Scroll ---
const header = document.querySelector('.main-header');

// Check if header exists before adding scroll listener
if (header) {
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
}

// --- Menu ---
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    // Check if burger and nav exist
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Dropdown logic for mobile
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContainer = document.querySelector('.nav-item-dropdown');

    if (dropdownToggle && dropdownContainer) {
        dropdownToggle.addEventListener('click', (e) => {
            // Check if we are in mobile view (burger is visible)
            if (window.getComputedStyle(burger).display !== 'none') {
                e.preventDefault(); // Prevent link from navigating
                dropdownContainer.classList.toggle('open');
            }
        });
    }
};

navSlide();

// --- Image Slider Logic ---
// This part is already safe because it runs after the DOM is loaded
// and the forEach loop won't execute if no sliders are found.
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-container');

    sliders.forEach(slider => {
        const sliderWrapper = slider.querySelector('.slider-wrapper');
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        const dotsContainer = slider.querySelector('.dots-container');

        if (!sliderWrapper || !prevBtn || !nextBtn || !dotsContainer || slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        const dots = dotsContainer.querySelectorAll('.dot');

        const goToSlide = (index) => {
            sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            currentIndex = index;
        };

        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % totalSlides;
            goToSlide(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(prevIndex);
        });

        goToSlide(0);
    });
});