const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return camelize(products);
};

const findById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return camelize(product);
};

const insert = async (name) => {
  const [result] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  const insertedProductId = result.insertId;
  return { id: insertedProductId, name };
};

module.exports = {
  findAll,
  findById,
  insert,
};
