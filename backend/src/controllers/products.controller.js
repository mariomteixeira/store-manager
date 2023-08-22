const { productsService } = require('../services');

const findAll = async (req, res) => {
  const products = await productsService.findAll();
  if (products.status === 'SUCCESSFUL') {
    return res.status(200).json(products.data);
  }
  return res.status(404).json(products.data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);
  if (product.status === 'SUCCESSFUL') {
    return res.status(200).json(product.data);
  }
  return res.status(404).json(product.data);
};

const insert = async (req, res) => {
  const insertProduct = await productsService.insert(req.body.name);
  return res.status(201).json(insertProduct.data);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const updateProduct = await productsService.update(Number(id), name);
  if (updateProduct.status !== 'SUCCESSFUL') return res.status(404).json(updateProduct.data);
  return res.status(200).json(updateProduct.data);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};
