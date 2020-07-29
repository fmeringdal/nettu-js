import { IUser } from "./User";

export interface IBooking {
    _id: string
    theme: string
    participants: IUser[]
}