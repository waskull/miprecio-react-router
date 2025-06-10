import z from "zod";

export const addProductStoreSchema = z
    .object({
        price: z
            .coerce
            .number({
                message: "El precio debe de ser un un numero entero",
                invalid_type_error: "El precio debe de ser un un numero entero"
            })
            .min(1, "El precio debe de ser minimo 1").transform((value) => Number(value)),
        wholesale_price: z
            .coerce
            .number({
                message: "El precio al mayor debe de ser un un numero entero",
                invalid_type_error: "El precio debe de ser un un numero entero"
            })
            .min(1, "El precio debe de ser minimo 1")
            .optional(),
        discount: z
            .coerce
            .number({
                message: "El descuento debe de ser un numero",
                invalid_type_error: "El precio debe de ser un un numero entero"
            })
            .int({ message: "El descuento debe de ser un numero entero" })
            .min(0, "El descuento no puede ser menor a 0")
            .max(100, "El descuento no puede ser mayor a 100").transform((value) => Number(value)),
        product_uid: z
            .string({ message: "El producto debe de ser una cadena de caracteres" })
            .min(32, "El producto debe de tener un codigo con un minimo de 32 caracteres")
            .max(48, "El producto de tener un codigo con un maximo de 48 caracteres"),
    }).refine((data) => data?.wholesale_price !== undefined && data?.wholesale_price < data?.price, {
        message: "El precio al mayor debe de ser menor al precio al detal",
        path: ["wholesale_price"],
    });

export type TaddProductStoreSchema = z.infer<typeof addProductStoreSchema>;

export const editProductStoreSchema = z
    .object({
        price: z
            .coerce
            .number({
                message: "El precio debe de ser un un numero entero",
                invalid_type_error: "El precio debe de ser un un numero entero"
            })
            .min(1, "El precio debe de ser minimo 1").transform((value) => Number(value)),
        wholesale_price: z
            .coerce
            .number({
                message: "El precio al mayor debe de ser un un numero entero",
                invalid_type_error: "El precio debe de ser un un numero entero"
            })
            .min(1, "El precio debe de ser minimo 1")
            .optional(),
        discount: z
            .coerce
            .number({
                message: "El descuento debe de ser un numero",
                invalid_type_error: "El precio debe de ser un un numero entero"
            })
            .int({ message: "El descuento debe de ser un numero entero" })
            .min(0, "El descuento no puede ser menor a 0")
            .max(100, "El descuento no puede ser mayor a 100").transform((value) => Number(value)),
    }).refine((data) => data?.wholesale_price !== undefined && data?.wholesale_price < data?.price, {
        message: "El precio al mayor debe de ser menor al precio al detal",
        path: ["wholesale_price"],
    });

export type TeditProductStoreSchema = z.infer<typeof editProductStoreSchema>;