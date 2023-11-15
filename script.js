import axios from 'axios';
const year = new Date().getFullYear();
const newYear = document.createElement('div');
const footer = document.querySelector('footer');

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
      
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
