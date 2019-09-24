const axios = require('axios');
const { add, fizzbuzz, getTotalPriceInCOP, URL } = require('../basics');

jest.mock('axios');

describe('Tests basicos', () => {
  describe('Tests para la funcion de suma', () => {
    it('Deberia retornar 5 dado 3 y 2', () => {
      expect(add(3, 2)).toBe(5);
    });

    it('Deberia retornar 9 dado 3 y 6', () => {
      expect(add(3, 6)).toBe(9);
    });
  });

  describe('Tests para la funcion de fizzbuzz', () => {
    it('Deberia retornar fizz dado un multiplo de 3', () => {
      expect(fizzbuzz(9)).toBe('fizz');
    });

    it('Deberia retornar buzz dado un multiplo de 5', () => {
      expect(fizzbuzz(5)).toBe('buzz');
    });

    it('Deberia retornar fizzbuzz dado un multiplo de 3 y de 5', () => {
      expect(fizzbuzz(15)).toBe('fizzbuzz');
    });
  });

  describe('Tests para la funcion que consigue precio total en pesos colombianos', () => {
    it('Deberia retornar la suma total en pesos colombianos', async () => {
      const products = [
        { price: 110 },
        { price: 91 },
        { price: 94 },
      ];

      axios.get.mockResolvedValue({
        data: [
          ...products,
        ],
      });

      const total = await getTotalPriceInCOP();

      expect(total).toBe(944000);
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toBeCalledWith(URL);
    });
  });
});
