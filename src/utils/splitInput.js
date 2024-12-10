function splitInput(input) {
  const parsedInput = input.split(',');
  return parsedInput.reduce((acc, item) => {
    const [name, quantity] = item.split('-');
    acc[name.trim()] = parseInt(quantity.trim(), 10);
    return acc;
  }, {});
}
export default splitInput;
