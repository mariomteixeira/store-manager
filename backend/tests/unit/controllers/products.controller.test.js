const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const mock = require('../mocks/product.mock');
const middleware = require('../../../src/middlewares/validateNames');

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
  it('Testa se o controller tem a função de insert', async function () {
    sinon.stub(productsService, 'insert').resolves(mock.productAll);
    const request = { body: { name: 'Martelo de Thor' } };
    const response = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productController.insert(request, response);
    sinon.assert.calledOnce(productsService.insert);
    sinon.assert.calledWith(response.status, 201);
    sinon.assert.calledWith(response.json, mock.productDBbyId.name);
    productsService.insert.restore();
    });
  it('Testa se o controller tem as validações de name', async function () {
    const next = sinon.stub().returns();
    const request = { body: { name: 'Martelo de Thor' } };
    const response = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await middleware.validate(request, response, next);
    sinon.assert.calledWithExactly(next);
  });
  it('Testa se o controller retorna o erro 400 quando o name não é informado', async function () {
    const next = sinon.stub().returns();
    const request = { body: { name: '' } };
    const response = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await middleware.validate(request, response, next);
    sinon.assert.calledWithExactly(response.status, 400);
    sinon.assert.calledWithExactly(response.json, { message: '"name" is required' });
  });
  it('Testa se o controller retorna o erro 422 quando o name é menor que 5 caracteres', async function () {
    const next = sinon.stub().returns();
    const request = { body: { name: 'Mart' } };
    const response = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await middleware.validate(request, response, next);
    sinon.assert.calledWithExactly(response.status, 422);
    sinon.assert.calledWithExactly(response.json, { message: '"name" length must be at least 5 characters long' });
  });
  it('Retorna um erro ao tentar inserir um produto novo com um nome inválido na DB', async function () {
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const req = { body: { name: 'abc' } };

    await middleware.validate(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  afterEach(function () {
    sinon.restore();
  });
});