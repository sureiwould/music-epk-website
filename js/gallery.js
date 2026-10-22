
/*
Homework 4: Add Interactivity

For this assignment, I added two interactive features to my
Gallery page. The first is an automatic slideshow that changes pictures every 5 seconds
with buttons that users can press to manually go foward or backward in the slideshow. 
The second feature enables users to click a photo in the grid below the slideshow
to enlarge it, and then close the enlarged image and return to the regular view of the Gallery.
I used JavaScript to select elements, listen for button clicks, 
and update which image is displayed.

*/

/* =========================================
   SECTION 1 | AUTOMATIC SLIDESHOW
   ========================================= 
*/

// Select slideshow images
const slides = document.querySelectorAll(".slides img");
let current = 0;

// Change the active image
function showSlide(index) {
    slides[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
}

if (slides.length > 0) {
    // Previous and Next buttons
    document.querySelector(".slide-next").addEventListener("click", () => showSlide(current + 1));
    document.querySelector(".slide-prev").addEventListener("click", () => showSlide(current - 1));

    // Automatically change photos every 5 seconds
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setInterval(() => showSlide(current + 1), 5000);
    }
}

/* =========================================
   SECTION 2 | CLICK-TO-ENLARGE LIGHTBOX
   ========================================= 
*/

/* Click-to-Enlarge Gallery Images */
const lightbox = document.querySelector(".lightbox");
const enlargedImage = lightbox.querySelector("img");

// Open enlarged image
document.querySelectorAll(".gallery-image").forEach(button => {
    button.addEventListener("click", () => {
        const image = button.querySelector("img");
        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt;
        lightbox.showModal();
    });
});

// Close enlarged image
document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

// Close when clicking outside the image
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) lightbox.close();
});