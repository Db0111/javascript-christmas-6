import ErrorMessage from '../constants/ErrorMessage.js';

function splitInput(input) {
  const parsedInput = input.split(',');
  const productMap = {};

  parsedInput.forEach(item => {
    const [name, quantity] = item.split('-');
    const trimmedName = name.trim();

    if (productMap[trimmedName]) {
      throw new Error(`${ErrorMessage.DUPLICATED_ORDER}`);
    }
    productMap[trimmedName] = parseInt(quantity.trim(), 10);
  });
  return productMap;
}
export default splitInput;
