let users = [];
let sales = [];

exports.users = users;
exports.sales = sales;

exports.addUser = (username, password) => {
  const existingUser = users.find(user => user.username === username);
  if (existingUser) return false;
  
  users.push({ username, password });
  return true;
};

exports.authenticateUser = (username, password) => {
  return users.some(user => 
    user.username === username && user.password === password
  );
};

exports.addSale = (product, price, quantity) => {
  sales.push({
    id: Date.now(),
    product,
    price,
    quantity,
    total: price * quantity,
    date: new Date().toLocaleString()
  });
};

exports.getSales = () => sales;