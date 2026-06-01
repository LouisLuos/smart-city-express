export const DEMAND_STATUS = ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'] as const;

export type DemandStatus = (typeof DEMAND_STATUS)[number];
