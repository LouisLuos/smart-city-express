import { DemandStatus } from './Status';
import { DemandCategory } from './Category';
export interface Demand {
    id: string;
    title: string;
    description: string;
    category: DemandCategory;
    location: string;
    status: DemandStatus;
    imageUrl?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}
export type CreateDemandDTO = Omit<Demand, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'userId'>;
