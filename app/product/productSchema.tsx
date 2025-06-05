import z from "zod";

export const addProductSchema = z
    .object({
        name: z
            .string({ message: "El nombre debe de ser una cadena de caracteres" })
            .min(3, "El nombre debe de tener minimo 3 caracteres")
            .max(50, "El nombre debe de tener maximo 50 caracteres"),
        description: z
            .string({ message: "La descripción debe de ser una cadena de caracteres" })
            .min(5, "La descripción debe de tener minimo 5 caracteres")
            .max(50, "La descripción de tener maximo 100 caracteres"),
        category_uid: z
            .string({ message: "La categoría debe de ser una cadena de caracteres" })
            .min(32, "La descripción debe de tener minimo 32 caracteres")
            .max(48, "La descripción de tener maximo 48 caracteres"),
    });

export type TaddProductSchema = z.infer<typeof addProductSchema>;