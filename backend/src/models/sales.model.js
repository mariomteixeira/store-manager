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

module.exports = {
  findAll,
  findById,
};
