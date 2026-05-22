const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rota de exemplo
app.get('/', (_req: any, res: any) => {
    res.json({ message: 'Smart City Express API' });
});

module.exports = app;
