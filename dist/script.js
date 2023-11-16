import axios from 'axios';
const year = new Date().getFullYear();
const newYear = document.createElement('div');
const footer = document.querySelector('footer');
const btn = document.querySelector('button');
const price = document.getElementsByClassName('price');


newYear.innerText = `Copyright © ${year} Saurabh Kirve`;
footer.appendChild(newYear);


let config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://rest.coinapi.io/v1/exchangerate/BTC/USD',
  headers: { 
    'Accept': 'text/plain', 
    'X-CoinAPI-Key': 'A517A41F-E8C5-470A-9191-040C74AAE069'
  }
};

async function getPrice() {
  
    try {
      const response = await axios(config);
      const rate = Math.round(response.data.rate * 100) / 100;
      document.querySelector('.price').innerHTML += `<h1>Price of Bitcoin in USD is: $ ${rate} </h1>`;
      
    } catch (error) {
      console.error(error);
    }
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    getPrice();
    console.log("btn clicked!"); 
  });