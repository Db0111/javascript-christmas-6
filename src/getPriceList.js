import { menuList } from './MenuList.js';

export function findPrice(menuList, itemName) {
  for (const [category, items] of Object.entries(menuList)) {
    if (itemName in items) {
      return { category, price: items[itemName] };
    }
  }
  return null;
}

export function getPriceList(orderedList) {
  const priceList = {};
  for (const [name, quantity] of Object.entries(orderedList)) {
    const { category, price } = findPrice(menuList, name);
    priceList[name] = {
      category,
      price: Number(price),
      quantity: Number(quantity),
    };
  }
  return priceList;
}

export function getTotalPrice(priceList) {
  let totalPrice = 0;
  for (const value of Object.values(priceList)) {
    totalPrice += value.price * value.quantity;
  }
  return totalPrice;
}
