const salesModel = require('../models/sales.model');

const findAll = async () => {
  const response = await salesModel.findAll();
  return { status: 'SUCCESSFUL', data: response };
};

const findById = async (id) => {
  const response = await salesModel.findById(id);
  if (!response || response.length === 0) {
 return { status: 'NOT FOUND', data: { message: 'Sale not found' } };
}
  return { status: 'SUCCESSFUL', data: response };
};

const insert = async (sale) => {
  const salesId = await salesModel.newSale();
  const promises = sale
  .map(({ productId, quantity }) => 
  salesModel.insert(salesId, productId, quantity));
  const promisesRes = await Promise.all(promises);
  return { 
    status: 'SUCCESSFUL',
    data: {
      id: salesId,
      itemsSold: promisesRes[1],
    } };
};

module.exports = {
  findAll,
  findById,
  insert,
};