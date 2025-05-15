import type { ICategory } from "../category/category"

export interface IProduct {
    uid: string
    name: string
    description: string
    category: ICategory
}