import { Request, Response } from "express";
import { userSchema } from "../schemas/auth.schema.js";
import { authService } from "../services/auth.service.js";

export const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const validatedData = userSchema.parse(req.body);
            const user = await authService.register(validatedData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ 
                message: error.message || "Erro na requisição", 
                details: error.errors || error 
            });
        }
    }
};