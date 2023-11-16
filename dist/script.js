import axios from "axios";

const year = new Date().getFullYear();
const newYear = document.createElement("div");
const footer = document.querySelector("footer");
const updateButton = document.querySelector("button");
const loadingIndicator = document.createElement("div");
const priceContainer = document.querySelector(".price");



newYear.innerText = `Copyright © ${year} Saurabh Kirve`;
footer.appendChild(newYear);

const apiConfig = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://rest.coinapi.io/v1/exchangerate/BTC/USD",
  headers: {
    Accept: "text/plain",
    "X-CoinAPI-Key": 'A517A41F-E8C5-470A-9191-040C74AAE069',
  },
};

async function getPrice() {
  try {
    loadingIndicator.textContent = "Loading...";
    priceContainer.innerHTML = ""; // Clear previous content
    priceContainer.appendChild(loadingIndicator);

    const response = await axios(apiConfig);

    if (response.status === 200) {
      const rate = Math.round(response.data.rate * 100) / 100;
      const priceHTML = `<h1 class="text-xl">Current Price of Bitcoin in USD is: $ ${rate}</h1>`;

      priceContainer.innerHTML = priceHTML; // Replace loading indicator with actual content
      updateButton.textContent = "Update Price!";
    }
    else if (response.status === 429) {
      console.error("Too Many API Requests! Please try again later.");}
    else {
      console.error(`Unexpected response status: ${response.status}`);
    }

  } catch (error) {
    console.error("Error fetching Bitcoin price:", error.message);
    // You may want to handle different types of errors separately here
  } finally {
    loadingIndicator.style.display = "none"; // Ensure loading indicator is hidden
  }
}

updateButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearPrice();
  getPrice();
  console.log("Button clicked!");
});

function clearPrice() {
  document.querySelector(".price").innerHTML = "";
}