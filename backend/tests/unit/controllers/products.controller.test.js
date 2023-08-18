const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const mock = require('../mocks/product.mock');

chai.use(sinonChai);

describe('Testa o controller de produtos', function () {
  it('Testa se o controller de produtos possui o método findAll', async function () {
    sinon.stub(productsService, 'findAll').resolves(mock.productsFound);
    const request = {
      params: {},
    };
    const response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.findAll(request, response);
    expect(response.status).to.be.calledWith(200);
    expect(response.json).to.be.calledWith(mock.productsFound.data);
  });
});