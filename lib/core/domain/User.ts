export interface IUser {
    _id: string
    name?: string
    description?: string;
    metadata?: any;
}

export interface IFullUser extends IUser {
    email?: string;
    phone?: string;
}