const { productsModel } = require('../models');

const findAll = async () => {
  const serviceRes = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: serviceRes };
};

const findById = async (id) => {
  const serviceRes = await productsModel.findById(id);
  if (!serviceRes || serviceRes.length === 0) {
    return { status: 'NOT FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: serviceRes };
};

module.exports = {
  findAll,
  findById,
};
