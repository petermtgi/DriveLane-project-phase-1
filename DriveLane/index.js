document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.querySelector(".car-container");
    const addCarButton = document.getElementById("addCarButton");

    if (!carContainer) {
        console.error("Error: .car-container element not found.");
        return;
    }

    fetch("cars.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load cars.json: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            carContainer.innerHTML = "";

            data.forEach(car => {
                const carCard = document.createElement("div");
                carCard.classList.add("car-card");

                carCard.innerHTML = `
                    <img src="${car.image}" alt="${car.name || 'Car Image'}">
                    <h2>${car.name || 'Unknown Car'}</h2>
                    <p>${car.description || 'No description available.'}</p>
                    <span class="price-tag">$${car.price || 'N/A'}</span>
                    <button class="price-button">View Price</button>
                `;

                carContainer.appendChild(carCard);
            });
        })
        .catch(error => console.error("Error loading cars:", error));

    if (addCarButton) {
        addCarButton.addEventListener("click", () => {
            const carName = document.getElementById("carName").value.trim();
            const carImage = document.getElementById("carImage").value.trim();
            const carPrice = document.getElementById("carPrice").value.trim();

            if (!carName || !carImage || !carPrice) {
                alert("Please fill in all fields.");
                return;
            }

            const carCard = document.createElement("div");
            carCard.classList.add("car-card");

            carCard.innerHTML = `
                <img src="${carImage}" alt="${carName}">
                <h2>${carName}</h2>
                <p>No description available.</p>
                <span class="price-tag">$${carPrice}</span>
                <button class="price-button">View Price</button>
            `;

            carContainer.appendChild(carCard);

            document.getElementById("carName").value = "";
            document.getElementById("carImage").value = "";
            document.getElementById("carPrice").value = "";
        });
    } else {
        console.error("Error: Add Car button not found.");
    }
});
