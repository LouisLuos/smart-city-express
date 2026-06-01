import * as z from "zod";
import { DEMAND_CATEGORIES } from "../../shared/types/Category.js";
import { DEMAND_STATUS } from "../../shared/types/Status.js";

export const demandSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  category: z.enum(DEMAND_CATEGORIES, {
    message: "Selecione uma categoria válida"
  }),
  location: z.string().min(1, "A localização é obrigatória"),
  imageUrl: z.string().optional(),
  status: z.enum(DEMAND_STATUS).default('PENDING')
});

export type DemandSchemaType = z.infer<typeof demandSchema>;
