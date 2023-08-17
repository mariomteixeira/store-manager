const express = require('express');
const { productController } = require('./controllers');

const app = express();

app.use(express.json());
app.get('/products', productController.findAll);
app.get('/products/:id', productController.findById);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
