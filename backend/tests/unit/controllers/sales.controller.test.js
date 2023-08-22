const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

const mock = require('../mocks/sales.mock');
// const { validateQuantity, validateProducts } = require('../../../src/middlewares/validateSale');

chai.use(sinonChai);

describe('Testes no controller de vendas', function () {
  it('Testa se o sales controller possui o metodo findAll', async function () {
    sinon.stub(salesService, 'findAll').resolves(mock.salesFound);
    const request = {
      params: {},
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findAll(request, response);
    expect(response.status).to.be.calledWith(200);
    expect(response.json).to.be.calledWith(mock.salesFound.data);
  });
  it('Testa se o sales controller possui o metodo findById', async function () {
    sinon.stub(salesService, 'findById').resolves(mock.salesFound);
    const request = {
      params: { id: 1 },
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findById(request, response);
    expect(response.status).to.be.calledWith(200);
    expect(response.json).to.be.calledWith(mock.salesFound.data);
  });
  afterEach(function () {
    sinon.restore();
  });
});