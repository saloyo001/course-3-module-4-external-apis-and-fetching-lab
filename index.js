// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

async function fetchWeatherAlerts(state) {
    const response = await fetch(
        `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch weather alerts.");
    }

    const data = await response.json();

    console.log(data);

    return data;
}

function displayAlerts(data) {
    alertsDisplay.innerHTML = "";

    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${data.features.length}`;
    alertsDisplay.appendChild(summary);

    data.features.forEach(function(alert) {
        const paragraph = document.createElement("p");
        paragraph.textContent = alert.properties.headline;
        alertsDisplay.appendChild(paragraph);
    });
}

fetchButton.addEventListener("click", async function() {
    const state = stateInput.value.trim().toUpperCase();

    alertsDisplay.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    stateInput.value = "";

    try {
        const data = await fetchWeatherAlerts(state);
        displayAlerts(data);
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
        console.log(error);
    }
});