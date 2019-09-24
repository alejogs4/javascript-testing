const axios = require('axios');

const URL = 'https://my-json-server.typicode.com/jubs16/Products/Products';

function add(x, y) {
  return x + y;
}

function fizzbuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) {
    return 'fizzbuzz';
  }
  if (number % 3 === 0) {
    return 'fizz';
  }

  if (number % 5 === 0) {
    return 'buzz';
  }

  return null;
}

function getTotalPriceInCOP() {
  return axios.get(URL)
    .then((response) => response.data)
    .then((products) => {
      const total = products.reduce((total, product) => total + (product.price * 3200), 0);
      return total;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error.message);
    });
}

module.exports = {
  add,
  fizzbuzz,
  getTotalPriceInCOP,
  URL,
};
