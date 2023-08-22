const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { validateProducts, validateQuantity } = require('../../../src/middlewares/validateSale');

chai.use(sinonChai);
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa o middleware de validação de quantity', function () {
  it('should return a status 400 when quantity is not a number', async function () {
    const req = {
      body: [{ }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    validateQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('should return a status 422 when quantity is less than 1', async function () {
    const req = {
      body: [{ quantity: 0 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    validateQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  it('should call next when quantity is valid', async function () {
    const req = {
      body: [{ quantity: 1 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    validateQuantity(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  it('should return a status 400 when productId is empty', async function () {
    const req = {
      body: [{ productId: '' }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    validateProducts(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
});