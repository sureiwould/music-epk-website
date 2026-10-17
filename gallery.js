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