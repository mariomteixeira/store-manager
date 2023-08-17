const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { expect } = require('chai');
const { productsModel } = require('../../../src/models');

chai.use(chaiHttp);

const mock = require('../mocks/product.mock');

describe('Testa o model de produtos', function () {
  it('Testa se o model de produtos possui o método findAll', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mock.productAll);
    const request = await productsModel.findAll();
    const response = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
    ];
    expect(request).to.be.deep.equal(response);
  });
  it('Testa se o model de produtos possui o método findById', async function () {
    sinon.stub(productsModel, 'findById').resolves(mock.productDBbyId);
    const request = await productsModel.findById(1);
    const response = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
    ];
    expect(request).to.be.deep.equal(response);
  });
  it('Testa se o model usando findById retorna NOT FOUND', async function () {
    sinon.stub(productsModel, 'findById').resolves({ message: 'Product not found' });
    const { message } = await productsModel.findById(3321);
    const response = 'Product not found';
    expect(message).to.be.equal(response);
  });
  afterEach(function () {
    sinon.restore();
  });
});