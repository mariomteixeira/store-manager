const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
});

// Iniciando projeto