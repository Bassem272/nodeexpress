const fetch = require('node-fetch');
const fs = require('fs');

const exchangeRateApiKey = 'dd1d238b1702aca38c8d67af'; // Replace with your ExchangeRate-API key
const baseCurrency = 'USD';
const targetCurrency = 'EGP';

const conversionRateUrl = `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/pair/${baseCurrency}/${targetCurrency}`;

fetch(conversionRateUrl)
  .then(response => response.json())
  .then(rateData => {
    if (rateData.result === 'success') {
      const rate =  parseFloat(ratedta)
       const conversionRate = rateData.conversion_rate;

      // Fetch products and perform currency conversion
      fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(products => {
          const categorizedProducts = {};

          products.forEach(product => {
            const categoryId = product.category.id;
            if (!categorizedProducts[categoryId]) {
              categorizedProducts[categoryId] = [];
            }
            categorizedProducts[categoryId].push(product);
          });

          // Perform currency conversion on product prices
          Object.values(categorizedProducts).forEach(category => {
            category.forEach(product => {
              product.price = product.price * conversionRate;
            });
          });

          // Write categorized products to a JSON file
          fs.writeFile('./categorizedProducts.json', JSON.stringify(categorizedProducts), err => {
            if (err) throw err;
            console.log('Categorized products saved to categorizedProducts.json');
          });
        })
        .catch(error => console.log(error));
    } else {
      console.log('Error retrieving conversion rate:', rateData['error-type']);
    }
  })
  .catch(error => console.log(error));fetch('condvef', adnd to that)

