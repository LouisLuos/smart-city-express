import { Request, Response } from 'express';
import { demandSchema, demandStatusUpdated } from '../schemas/demand.schema.js';
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
    },

    list: async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Usuário não autenticado" });
            }

            const demands = await demandService.getAllSorted();

            if (!demands || demands.length === 0) {
                return res.status(200).json({
                    message: "Nenhuma demanda encontrada",
                    data: []
                });
            }

            return res.status(200).json({
                message: "Dados retornados com sucesso",
                data: demands
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao listar demandas",
                error: error.message
            });
        }
    },

    editStatus: async (req: Request<{ id: string }>, res: Response) => {
        try {
            const { id } = req.params;
            const validatedData = demandStatusUpdated.parse(req.body);
            
            const user = req.user;
            if (!user || user.role !== "MANAGER") {
                return res.status(403).json({ message: "Acesso negado. Apenas gestores podem alterar o status." });
            }

            const updatedDemand = await demandService.updatedStatusDemand(id, validatedData.status);

            return res.status(200).json({
                message: "Status da demanda atualizado com sucesso",
                data: updatedDemand
            });
        } catch (error: any) {
            if (error.errors) {
                return res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors
                });
            }

            return res.status(500).json({
                message: "Erro ao atualizar status",
                error: error.message
            });
        }
    }
};
