import type { ICreatedBy } from "~/user/user";
import type { IProduct } from "../product/product";

export interface IStore {
    uid: string;
    price: number;
    wholesale_price: number;
    discount: number;
    createdBy: ICreatedBy;
    product: IProduct;
    is_deleted?: boolean;
  }

export interface ICompanyStore{
  uid: string;
  name: string;
  description:string;
  partner: ICreatedBy;
  store: IStore[];
}