import { Demand } from '../../shared/types/Demand.js'
import { DemandStatus } from '../../shared/types/Status.js';
import { v4 as uuidv4 } from 'uuid';

let demandasMock: Demand[] = [
  {
    id: 'CIV-2938',
    title: 'Poste apagado',
    description: 'Poste apagado há 3 dias na Rua das Flores.',
    category: 'PUBLIC_LIGHTING',
    location: 'Rua das Flores, Centro',
    status: 'PENDING',
    userId: '1',
    createdAt: '2026-03-25',
    updatedAt: '2026-03-25',
  },
  {
    id: 'CIV-2940',
    title: 'Reparo asfáltico',
    description: 'Reparo asfáltico emergencial na via.',
    category: 'ROAD_MAINTENANCE',
    location: 'Av. Central',
    status: 'IN_PROGRESS',
    userId: '1',
    createdAt: '2026-03-26',
    updatedAt: '2026-03-26',
  },
  {
    id: 'CIV-2941',
    title: 'Acúmulo de lixo',
    description: 'Acúmulo de resíduos sólidos em via pública.',
    category: 'GARBAGE_COLLECTION',
    location: 'Praça da Matriz',
    status: 'RESOLVED',
    userId: '1',
    createdAt: '2026-03-20',
    updatedAt: '2026-03-20',
  }
];


export class DemandRepository { 
    async findAll(): Promise<Demand[] | undefined> {
        return demandasMock
    }

    async findById(id: string): Promise<Demand | undefined> {
        const DemandActual = demandasMock.find(demand => demand.id === id)
        if (!DemandActual) return undefined;

        return DemandActual;
    }

    async create(demandData: Omit<Demand, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Demand> {
        const newDemanda: Demand = {
            ...demandData,
            id: uuidv4(),
            userId: userId,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        
        demandasMock.push(newDemanda);
        return newDemanda;
    }

    
    async updateStatus(id: string, novoStatus: DemandStatus): Promise<Demand | undefined> {
         // 1. Encontra o índice da demanda no seu array mock
         const index = demandasMock.findIndex(d => d.id === id);
    
         // 2. Se não encontrar, retorna undefined (ou lança um erro)
         if (index === -1) return undefined;
    
        // 3. Atualiza o objeto mantendo o que já existia e trocando o status
        demandasMock[index] = {
            ...demandasMock[index],
            status: novoStatus,
            updatedAt: new Date().toISOString() // Importante atualizar o timestamp
        };
   
        // 4. Retorna a demanda atualizada
        return demandasMock[index];
    }


}

export const demandRepository = new DemandRepository()