const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const { productAll, productDBbyId } = require('../mocks/product.mock');

describe('Testa o service de produtos', function () {
  it('Testa se o service de produtos possui o método findAll', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productAll);

    const request = await productsService.findAll();
    expect(request.status).to.be.equal('SUCCESSFUL');
    expect(request.data).to.be.deep.equal(productAll);
  });
  it('Testa se o service de produtos possui o método findById', async function () {
    sinon.stub(productsModel, 'findById').resolves(productDBbyId);

    const request = await productsService.findById(1);
    expect(request.status).to.be.equal('SUCCESSFUL');
    expect(request.data).to.be.deep.equal(productDBbyId);
  });
  afterEach(function () {
    sinon.restore();
  });
});