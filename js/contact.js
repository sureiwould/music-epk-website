const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function () {
    let numbers = phoneInput.value.replace(/\D/g, "").slice(0, 10);

    if (numbers.length > 6) {
        phoneInput.value = numbers.slice(0, 3) + "-" +
                           numbers.slice(3, 6) + "-" +
                           numbers.slice(6);
    } else if (numbers.length > 3) {
        phoneInput.value = numbers.slice(0, 3) + "-" +
                           numbers.slice(3);
    } else {
        phoneInput.value = numbers;
    }
});
