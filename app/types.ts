import { z } from "zod";

export const ProductSchema = z.object({
    id: z.string(),
    created_at: z.string(),
    name: z.string(),
    description: z.string(),

    imageUrl: z.string(),
    price: z.number(),
    boost: z.boolean(),
    contactEmail: z.string(),
});

export type ProductType = z.infer<typeof ProductSchema>;
