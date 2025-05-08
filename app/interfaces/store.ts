import type { IProduct } from "./product"
import type { ICreatedBy } from "./user"

export interface IStore {
    price: number
    wholesale_price: number
    discount: number
    createdBy: ICreatedBy
    product: IProduct
  }