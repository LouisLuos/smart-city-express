
import { demandRepository } from "../repository/DemandRepository.js";
import { userRepository } from "../repository/UserRepository.js";
import { DemandSchemaType } from "../schemas/demand.schema.js";

export const demandService = {
    create: async (demandData: DemandSchemaType, userId: string) => {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const newDemand = await demandRepository.create(demandData, userId);
        return newDemand;
        },

        getAllSorted: async () => {
        return await demandRepository.orderByDate();
        },

        updatedStatusDemand: async (id: string, status: any) => {
            const updatedDemand = await demandRepository.updateStatus(id, status);
            if (!updatedDemand) {
                throw new Error("Demanda não encontrada");
            }
            return updatedDemand;
        }

        
        };