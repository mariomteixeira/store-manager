const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const salesQuery = `
    SELECT s.id AS saleId, s.date, sp.product_id, sp.quantity
    FROM sales AS s
    JOIN sales_products AS sp ON s.id = sp.sale_id
    `;
  const [sales] = await connection.execute(salesQuery);
  return camelize(sales);
};

const findById = async (id) => {
  const salesQuery = `
    SELECT s.date, sp.product_id, sp.quantity
    FROM sales AS s
    JOIN sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ?
    `;
  const [sales] = await connection.execute(salesQuery, [id]);
  return camelize(sales);
};

const newSale = async () => {
  const idQuery = 'SELECT MAX(id) AS maxId FROM sales';
  const [[{ maxId }]] = await connection.execute(idQuery);
  const query = 'INSERT INTO sales (id) VALUES (?)';
  const id = maxId + 1;
  await connection.execute(query, [id]);
  return id;
};

const insert = async (saleId, productId, quantity) => {
  const salesQuery = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  await connection.execute(salesQuery, [saleId, productId, quantity]);
  const responseQuery = 'SELECT product_id, quantity FROM sales_products WHERE sale_id = ?';
  const [response] = await connection.execute(responseQuery, [saleId]);
  return camelize(response);
};

module.exports = {
  findAll,
  findById,
  insert,
  newSale,
};
