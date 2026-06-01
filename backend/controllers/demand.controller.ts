import { Request, Response } from 'express';
import { demandSchema } from '../schemas/demand.schema.js';
import { demandService } from '../services/demand.service.js';

export const demandController = {
    create: async (req: Request, res: Response) => {
        try {
            // Valida os dados do corpo da requisição usando o schema do Zod
            const validatedData = demandSchema.parse(req.body);
            const idUser = req.user?.userId;

            if (!idUser) {
                return res.status(401).json({ message: "Usuário não autenticado" });
            }

            const demand = await demandService.create(validatedData, idUser);

            return res.status(201).json({
                message: "Demanda criada com sucesso",
                data: demand
            });
        } catch (error: any) {
            // Se a validação falhar, o Zod lança um erro que podemos capturar
            if (error.errors) {
                return res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors
                });
            }

            return res.status(500).json({
                message: "Erro interno do servidor",
                error: error.message
            });
        }
    }
};
