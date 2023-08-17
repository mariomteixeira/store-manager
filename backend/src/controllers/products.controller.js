const { productsService } = require('../services');

const findAll = async (req, res) => {
  const products = await productsService.findAll();
  if (products.status === 'SUCCESSFUL') {
    return res.status(200).json(products.data);
  }
  return res.status(404).json(products.data);
};

const findById = async (req, res) => {
  const { id } = req.params.id;
  const product = await productsService.findById(id);
  if (product.status === 'SUCCESSFUL') {
    return res.status(200).json(product.data);
  }
  return res.status(404).json(product.data);
};

module.exports = {
  findAll,
  findById,
};
