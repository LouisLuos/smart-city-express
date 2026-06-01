export const DEMAND_CATEGORIES = [
  'ROAD_MAINTENANCE',
  'PUBLIC_LIGHTING',
  'GARBAGE_COLLECTION',
  'SANITATION',
  'INSPECTION',
  'OTHER'
] as const;

export type DemandCategory = (typeof DEMAND_CATEGORIES)[number];
