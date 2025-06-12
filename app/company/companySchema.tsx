import z from "zod";

export const addCompanySchema = z
    .object({
        name: z
            .string({ message: "El nombre debe de ser una cadena de caracteres" })
            .min(3, "El nombre debe de tener minimo 3 caracteres")
            .max(50, "El nombre debe de tener maximo 50 caracteres"),
        description: z
            .string({ message: "La descripción debe de ser una cadena de caracteres" })
            .min(5, "La descripción debe de tener minimo 5 caracteres")
            .max(50, "La descripción de tener maximo 100 caracteres"),
        partner_uid: z
            .string({ message: "Debes de proveer un socio" })
            .min(32, "El codigo del socio debe de tener minimo 32 caracteres")
            .max(48, "El codigo del socio debe de tener maximo 48 caracteres")
            .optional(),
    });

export type TaddCompanySchema = z.infer<typeof addCompanySchema>;

export const editCompanySchema = z
    .object({
        name: z
            .string({ message: "El nombre debe de ser una cadena de caracteres" })
            .min(3, "El nombre debe de tener minimo 3 caracteres")
            .max(50, "El nombre debe de tener maximo 50 caracteres"),
        description: z
            .string({ message: "La descripción debe de ser una cadena de caracteres" })
            .min(5, "La descripción debe de tener minimo 5 caracteres")
            .max(50, "La descripción de tener maximo 100 caracteres"),
    });

export type TeditCompanySchema = z.infer<typeof editCompanySchema>;