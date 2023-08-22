const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { expect } = chai;
chai.use(chaiHttp);

const mock = require('../mocks/sales.mock');

describe('Testes na service de vendas', function () {
  it('Retornar um objeto com o find all de vendas', async function () {
    sinon.stub(salesModel, 'findAll').resolves(mock.salesAll);
    const { status } = await salesService.findAll();
    const expected = 'SUCCESSFUL';
    expect(status).to.deep.equal(expected);
  });
  it('Retornar um objeto com o find by id de vendas', async function () {
    sinon.stub(salesModel, 'findById').resolves(mock.salesByProductId);
    const { status } = await salesService.findById();
    const expected = 'SUCCESSFUL';
    expect(status).to.deep.equal(expected);
  });
  afterEach(function () {
    sinon.restore();
  });
});