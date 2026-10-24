const services = document.querySelectorAll(".service-card");

services.forEach((service) => {
    service.addEventListener("click", () => {
        services.forEach((item) => {
            item.classList.remove("selected");
        });

        service.classList.add("selected");
    });
});
