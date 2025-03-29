document.addEventListener("DOMContentLoaded", () => {
    const carContainer = document.querySelector(".car-container");
    const addCarButton = document.getElementById("addCarButton");

    if (!carContainer) {
        console.error("Error: .car-container not found.");
        return;
    }

    console.log("Car Container found:", carContainer);
    console.log("Add Car Button found:", addCarButton);

        // fetching cars from db.json
    fetch("http://localhost:3000/cars")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load cars: ${response.statusText}`);
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
                `;

                carContainer.appendChild(carCard);
            });
        })
        .catch(error => console.error("Error loading cars:", error));

          // event listener for adding a new cars
    if (addCarButton) {
        addCarButton.addEventListener("click", () => {
            console.log("Add Car button clicked!");

            const carName = document.getElementById("carName").value.trim();
            const carImage = document.getElementById("carImage").value.trim();
            const carPrice = document.getElementById("carPrice").value.trim();
            const carDescription = document.getElementById("carDescription").value.trim();

            if (!carName || !carImage || !carPrice || !carDescription) {
                alert("Please fill in all fields.");
                return;
            }

            const newCar = {
                name: carName,
                image: carImage,
                price: carPrice,
                description: carDescription
            };

                // send post request to save car to db.json
            fetch("http://localhost:3000/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCar)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to save car to database.");
                }
                return response.json();
            })
            .then(savedCar => {
                console.log("Car saved:", savedCar);

                    // adds the car
                const carCard = document.createElement("div");
                carCard.classList.add("car-card");

                carCard.innerHTML = `
                    <img src="${savedCar.image}" alt="${savedCar.name}">
                    <h2>${savedCar.name}</h2>
                    <p>${savedCar.description}</p>
                    <span class="price-tag">$${savedCar.price}</span>
                `;

                carContainer.appendChild(carCard);

                        // clears input fields
                document.getElementById("carName").value = "";
                document.getElementById("carImage").value = "";
                document.getElementById("carPrice").value = "";
                document.getElementById("carDescription").value = "";
            })
            .catch(error => console.error("Error saving car:", error));
        });
    } else {
        console.error("Error: Add Car button not found.");
    }
});
