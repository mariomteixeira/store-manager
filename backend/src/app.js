const express = require('express');
const { productController, salesController } = require('./controllers');
const { validate } = require('./middlewares/validateNames');
const { validateProducts, validateQuantity } = require('./middlewares/validateSale');

const app = express();

app.use(express.json());
app.get('/products', productController.findAll);
app.get('/products/:id', productController.findById);

app.get('/sales', salesController.findAll);
app.get('/sales/:id', salesController.findById);

app.post('/products', validate, productController.insert);
app.post('/sales', validateProducts, validateQuantity, salesController.insert);

app.put('/products/:id', validate, productController.update);
// app.delete('/products/:id', productController.deleteProduct);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
