
/* Slideshow */
const slides = document.querySelectorAll(".slides img");
let current = 0;

function showSlide(index) {
    slides[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
}

if (slides.length > 0) {
    document.querySelector(".slide-next").onclick = () => showSlide(current + 1);
    document.querySelector(".slide-prev").onclick = () => showSlide(current - 1);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setInterval(() => showSlide(current + 1), 5000);
    }
}

/* Click-to-Enlarge Gallery Images */
const lightbox = document.querySelector(".lightbox");
const enlargedImage = lightbox.querySelector("img");

document.querySelectorAll(".gallery-image").forEach(button => {
    button.onclick = () => {
        const image = button.querySelector("img");
        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt;
        lightbox.showModal();
    };
});

document.querySelector(".lightbox-close").onclick = () => lightbox.close();

lightbox.onclick = event => {
    if (event.target === lightbox) lightbox.close();
};
