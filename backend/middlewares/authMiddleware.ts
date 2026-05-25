import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface UserPayload {
    userId: string;
    role: string;
    name: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ message: 'Erro no token' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token malformatado' });
    }

    const secret = process.env.JWT_SECRET || 'your-default-secret';

    try {
        const decoded = jwt.verify(token, secret) as UserPayload;
        
        if (!decoded || !decoded.userId || !decoded.role || !decoded.email || !decoded.name) {
             return res.status(401).json({ message: 'Token inválido: payload incompleto' });
        }

        req.user = {
            userId: decoded.userId,
            role: decoded.role,
            name: decoded.name,
            email: decoded.email
        };
        
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
