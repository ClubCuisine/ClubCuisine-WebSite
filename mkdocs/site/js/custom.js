document.addEventListener("DOMContentLoaded", function() {
    const numPeopleInput = document.getElementById("num-people");
    const adjustButtons = document.querySelectorAll(".adjust-button");
    const defaultQuantity = parseFloat(numPeopleInput.dataset.defaultQuantity) || 1;

    // Initialiser le compteur avec la valeur par défaut
    numPeopleInput.value = defaultQuantity;

    adjustButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            let numPeople = parseFloat(numPeopleInput.value);

            if (button.classList.contains("plus")) {
                numPeople += 1;
            } else if (button.classList.contains("minus") && numPeople > 1) {
                numPeople -= 1;
            }

            numPeopleInput.value = numPeople;
            adjustQuantities(numPeople);
        });
    });

    numPeopleInput.addEventListener("input", function() {
        let numPeople = parseFloat(numPeopleInput.value);
        if (isNaN(numPeople) || numPeople <= 0) {
            numPeople = defaultQuantity;
            numPeopleInput.value = numPeople;
        }
        adjustQuantities(numPeople);
    });

    function adjustQuantities(numPeople) {
        const ingredients = document.querySelectorAll(".ingredient");
        ingredients.forEach(function(ingredient) {
            const baseQuantity = parseFloat(ingredient.dataset.baseQuantity);
            const unit = ingredient.dataset.unit;
            const adjustedQuantity = (baseQuantity * numPeople / defaultQuantity).toFixed(2);
            ingredient.textContent = adjustedQuantity + " " + unit;
        });
    }

    // Ajuster les quantités initialement
    adjustQuantities(defaultQuantity);
});