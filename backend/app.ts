const express = require('express');
const cors = require('cors');
const app = express();

express.json({ limit: '10mb' })
app.use(cors({
    origin: 'http://localhost:3000',
    method: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());


// Rota de exemplo
app.get('/', (_req: any, res: any) => {
    res.json({ message: 'Smart City Express API' });
});

module.exports = app;
