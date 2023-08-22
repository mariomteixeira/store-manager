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

const insert = async (name) => {
  const insertedProduct = await productsModel.insert(name);
  return { status: 'SUCCESSFUL', data: insertedProduct };
};

const update = async (productName, productId) => {
  const productsId = (await productsModel.findAll()).map((product) => product.id);
  if (!productsId.includes(productId)) {
    return { status: 'NOT FOUND', data: { message: 'Product not found' } };
  }
  await productsModel.update(productId, productName);
  const updatedProduct = await productsModel.findById(productId);
  return { 
    status: 'SUCCESSFUL',
    data: {
      id: updatedProduct.id,
      name: updatedProduct.name,
    },
  };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};
