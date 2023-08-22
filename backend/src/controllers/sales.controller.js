const { salesService } = require('../services');

const findAll = async (_req, res) => {
  const sales = await salesService.findAll();
  return res.status(200).json(sales.data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findById(id);
  if (sale.status !== 'SUCCESSFUL') {
    return res.status(404).json(sale.data);
  }
  return res.status(200).json(sale.data);
};

const insert = async (req, res) => {
  const { body } = req;
  const { data } = await salesService.insert(body);
  console.log('Data:', body);
  if (data.status !== 'SUCCESSFUL') {
    switch (data.data.message) {
      case '"quantity" must be greater than or equal to 1':
        return res.status(422).json(data.data);
      case 'Product not found':
        return res.status(404).json(data.data);
      default:
        return res.status(400).json(data.data);
    }
  }
  return res.status(201).json(data);
};

module.exports = {
  findAll,
  findById,
  insert,
};
