const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const { expect } = chai;
chai.use(chaiHttp);

const mock = require('../mocks/sales.mock');

describe('Testes na model de vendas', function () {
  it('Retornar um objeto com o find all de vendas', async function () {
    sinon.stub(salesModel, 'findAll').resolves(mock.salesAll);
    const response = await salesModel.findAll();
    const expected = [
      {
        saleId: 1,
        date: '2023-08-18T04:50:19.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 1,
        date: '2023-08-18T04:50:19.000Z',
        productId: 2,
        quantity: 10,
      },
      {
        saleId: 2,
        date: '2023-08-18T04:50:19.000Z',
        productId: 3,
        quantity: 15,
      },
    ];
    expect(response).to.be.deep.equal(expected);
  });
  it('Retorna um NOT FOUND quando não encontra sale pelo id', async function () {
    sinon.stub(salesModel, 'findById').resolves({ message: 'Sale not found' });
    const { message } = await salesModel.findById(3321);
    const expected = 'Sale not found';
    expect(message).to.be.equal(expected);
  });
  it('Retorna um objeto com o find by id de vendas', async function () {
    sinon.stub(salesModel, 'findById').resolves(mock.salesByProductId);
    const response = await salesModel.findById(1);
    const expected = [
      {
        date: '2023-08-18T04:50:19.000Z',
        productId: 1,
        quantity: 5,
      },
    ];
    expect(response).to.be.deep.equal(expected);
  });
  afterEach(function () {
    sinon.restore();
  });
});