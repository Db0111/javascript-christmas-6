function formatOrderedList(orderedList) {
  return Object.entries(orderedList)
    .map(([menuName, quantity]) => {
      return `${menuName} ${quantity}개`;
    })
    .join('\n');
}

export default formatOrderedList;
