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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/webp"];

export const FormSchema = z.object({
    name: z.string().min(4, "Name min 4 char"),
    price: z.number().min(1, "Price min 1 char"),
    description: z.string().min(5, "Description min 4 char"),
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, "Max image size is 5 mb")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, jpeg and webp formats are supported",
        ),
    email: z.string().email("Not a valid Email"),
});
