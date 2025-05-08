import type { ICategory } from "./category"

export interface IProduct {
    uid: string
    name: string
    description: string
    category: ICategory
}