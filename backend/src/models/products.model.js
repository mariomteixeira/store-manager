const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const queryProducts = 'SELECT * FROM products';
  const [products] = await connection.execute(queryProducts);
  return camelize(products);
};

const findById = async (id) => {
  const queryProducts = 'SELECT * FROM products WHERE id=?';
  const [products] = await connection.execute(queryProducts, [id]);
  return camelize(products);
};

module.exports = {
  findAll,
  findById,
};
