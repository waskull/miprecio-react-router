export interface ICreatedBy {
    uid: string
    email: string
    fullname: string
  }

export interface IUser extends ICreatedBy{
  role:string;
  created_at?: Date;
  update_at?: Date;
  phone?: string;
  address?: string;
  is_verified: boolean;
}

export interface IUserSession {
  email?: string;
  fullname?: string;
  role?: string;
}