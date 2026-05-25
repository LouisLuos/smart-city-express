import { Request, Response } from "express";
import { userSchema, loginSchema } from "../schemas/auth.schema.js";
import { authService } from "../services/auth.service.js";

export const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const validatedData = userSchema.parse(req.body);
            const user = await authService.register(validatedData);
            return res.status(201).json(user);
        } catch (error: any) {
            return res.status(400).json({ 
                message: error.message || "Erro interno no servidor"
            });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const validatedCredentials = loginSchema.parse(req.body);
            const result = await authService.login(validatedCredentials);
            return res.json(result);
        } catch (error: any) {
            return res.status(401).json({ 
                message: error.message || "Credenciais inválidas"
            });
        }
    }
};