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

module.exports = {
  findAll,
  findById,
};
