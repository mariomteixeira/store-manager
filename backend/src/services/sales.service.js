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

module.exports = {
  findAll,
  findById,
};
