import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRouter)

// Rota de exemplo
app.get('/', (_req, res) => {
    res.json({ message: 'Smart City Express API' });
});

export default app;
