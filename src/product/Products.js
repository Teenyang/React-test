const PRODUCTS = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

// 確認排序：sort by category
PRODUCTS.sort((a, b) => a.category - b.category)
PRODUCTS.sort(function (a, b) {
  var categoryA = a.category.toUpperCase(); // ignore upper and lowercase
  var categoryB = b.category.toUpperCase(); // ignore upper and lowercase
  if (categoryA < categoryB) {
    return -1;
  }
  if (categoryA > categoryB) {
    return 1;
  }
  // names must be equal
  return 0;
});

export default PRODUCTS;