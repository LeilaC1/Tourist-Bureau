"use strict";
window.onload = function () {
    let dropdownMenuCategories = document.getElementById("activityCategories");
    categories.forEach(function (category) {
        let option = document.createElement("option");
        option.text = category;
        dropdownMenuCategories.add(option);
    });

    let dropdownMenuActivities = document.getElementById("activities");
    activities.forEach(function (activity) {
        let option = document.createElement("option");
        option.text = activity.name;
        option.value = activity.name;
        option.setAttribute("data-category", activity.category);
        dropdownMenuActivities.add(option);
    });

    // btn event listener
    document.getElementById("next").addEventListener("click", nextBtn);
    document.getElementById("submit").addEventListener("click", submitBtn);
    document.getElementById("purchaseForm").addEventListener("submit", function (event) {
        event.preventDefault();
        purchase();
    });
}

// function for next btn
function nextBtn() {
    document.getElementById("activitiesSections").style.display = "block";
}

// function for submit btn
function submitBtn() {
    let results = document.getElementById("results");
    let categorySelected = document.getElementById('activityCategories');
    let activitySelected = document.getElementById('activities');
    let selectedCategory = categorySelected.value;
    let selectedActivityName = activitySelected.value;

    let selectedActivity = activities.find(activity => activity.name === selectedActivityName);

    if (selectedCategory !== "selectOne" && selectedActivityName !== "selectOne") {
        let activityCategory = activitySelected.options[activitySelected.selectedIndex].getAttribute("data-category");

        if (activityCategory === selectedCategory && selectedActivity) {
            results.innerHTML = `
                Selected Category: ${selectedCategory} | Selected Activity: ${selectedActivityName} <br>
                <b>Name: </b>${selectedActivity.name} <br>
                <b>Id: </b>${selectedActivity.id} <br>
                <b>Location:  </b>${selectedActivity.location} <br>
                <b>Price:  </b>$${selectedActivity.price}`;
        } else {
            alert("Please select an activity that matches the selected category.");
        }
    } else {
        alert("Please select a category and an activity.");
    }
}
function purchase() {
    let numTickets = document.getElementById("numTickets").value;
    let creditCard = document.getElementById("creditCard").value;
    let email = document.getElementById("email").value;
    let activitySelected = document.getElementById('activities');
    let selectedActivity = activities.find(activity => activity.name === activitySelected.value);

    //  confirmation message
    let purchaseConfirmed = document.getElementById("purchaseConfirmed");
    purchaseConfirmed.innerHTML = `Your credit card has been charged $${(selectedActivity.price * numTickets).toFixed(2)} for ${numTickets} ticket(s) to ${selectedActivity.name}. A confirmation email has been sent to ${email}.`;
}