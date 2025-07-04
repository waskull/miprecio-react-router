import z from "zod";
import { RoleObject } from "~/util/role-enum";

export const addUserSchema = z
    .object({
        email: z.string({ message: "El correo debe de ser una cadena de caracteres" }).trim().email("Debes proveer un correo valido"),
        password: z
            .string({ message: "La contraseña debe de ser una cadena de caracteres" })
            .min(4, "La contraseña debe de tener minimo 4 caracteres")
            .max(50, "La contraseña debe de tener maximo 50 caracteres"),
        confirmPassword: z
            .string({ message: "La contraseña de confirmación debe de ser una cadena de caracteres" })
            .min(4, "La contraseña de confirmación debe de tener minimo 4 caracteres")
            .max(50, "La contraseña de confirmación debe de tener maximo 50 caracteres"),
        fullname: z
            .string({ message: "El nombre debe de ser una cadena de caracteres" })
            .min(3, "El nombre debe de tener minimo 3 caracteres")
            .max(50, "El nombre debe de tener maximo 50 caracteres"),
        phone: z
            .string({ message: "El telefono debe de ser una cadena de caracteres" })
            .min(9, "El telefono debe de tener minimo 9 caracteres")
            .max(50, "El telefono debe de tener maximo 50 caracteres")
            .optional(),
        dni: z
            .string({ message: "La cedula debe de ser una cadena de caracteres" })
            .min(5, "La cedula debe de tener minimo 5 caracteres")
            .max(50, "La ceduladebe de tener maximo 50 caracteres").optional(),
        role: z.nativeEnum(RoleObject, { errorMap: () => { return { message: "El rol debe de ser uno valido." } } }),
        address: z
            .string({ message: "La dirección debe de ser una cadena de caracteres" })
            .min(5, "La dirección debe de tener minimo 5 caracteres")
            .max(50, "La dirección de tener maximo 100 caracteres")
            .optional(),
        birthdate: z.string().date().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no son iguales",
        path: ["confirmPassword"],
    });

export type TaddUserSchema = z.infer<typeof addUserSchema>;

export const editUserPasswordSchema = z
    .object({
        password: z
            .string({ message: "La contraseña debe de ser una cadena de caracteres" })
            .min(4, "La contraseña debe de tener minimo 4 caracteres")
            .max(50, "La contraseña debe de tener maximo 50 caracteres"),
        confirmPassword: z
            .string({ message: "La contraseña de confirmación debe de ser una cadena de caracteres" })
            .min(4, "La contraseña de confirmación debe de tener minimo 4 caracteres")
            .max(50, "La contraseña de confirmación debe de tener maximo 50 caracteres"),
    }
    )
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no son iguales",
        path: ["confirmPassword"],
    });

export type TeditUserPasswordSchema = z.infer<typeof editUserPasswordSchema>;

export const editUserSchema = z
    .object({
        fullname: z
            .string({ message: "El nombre debe de ser una cadena de caracteres" })
            .min(3, "El nombre debe de tener minimo 3 caracteres")
            .max(50, "El nombre debe de tener maximo 50 caracteres"),
        phone: z
            .string({ message: "El telefono debe de ser una cadena de caracteres" })
            .min(9, "El telefono debe de tener minimo 9 caracteres")
            .max(50, "El telefono debe de tener maximo 50 caracteres")
            .optional(),
        dni: z
            .string({ message: "La cedula debe de ser una cadena de caracteres" })
            .min(5, "La cedula debe de tener minimo 5 caracteres")
            .max(50, "La ceduladebe de tener maximo 50 caracteres").optional(),
        role: z.nativeEnum(RoleObject, { errorMap: () => { return { message: "El rol debe de ser uno valido." } } }),
        address: z
            .string({ message: "La dirección debe de ser una cadena de caracteres" })
            .min(5, "La dirección debe de tener minimo 5 caracteres")
            .max(50, "La dirección de tener maximo 100 caracteres")
            .optional(),
        birthdate: z.string().date().optional(),
    })

export type TeditUserSchema = z.infer<typeof editUserSchema>;