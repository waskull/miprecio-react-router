import type { IUser } from "~/user/user";

export interface ICompany{
    uid: string;
    name: string;
    description: string;
    created_at?: Date;
    update_at?: Date;
    partner: IUser;
    user: IUser;
}