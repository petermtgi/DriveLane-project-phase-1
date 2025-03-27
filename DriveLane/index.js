document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.querySelector(".car-container");

    fetch("cars.json")
        .then(response => response.json())
        .then(data => {
            carContainer.innerHTML = "";

            data.forEach(car => {
                const carCard = document.createElement("div");
                carCard.classList.add("car-card");

                carCard.innerHTML = `
                    <img src="${car.image}" alt="${car.name}">
                    <h2>${car.name}</h2>
                    <p>${car.description}</p>
                `;

                carContainer.appendChild(carCard);
            });
        })
        .catch(error => console.error("Error loading cars:", error));
});
