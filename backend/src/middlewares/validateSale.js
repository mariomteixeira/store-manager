const { productsModel } = require('../models');

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  console.log('Request Body:', req.body);
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0) {
    console.log('Invalid quantity:', quantity);
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateProducts = async (req, res, next) => {
  const products = req.body;
  if (products.some((product) => !product.productId || !product.productId.lenght <= 0)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  const promise = await Promise.all(products.map(async (product) => {
    const { productId } = product;
    const productPromise = await productsModel.findById(productId);
    return !productPromise ? null : products;
  }));
  if (promise.some((product) => !product)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validateQuantity,
  validateProducts,
};
