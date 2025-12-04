import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    username: string;
    name: string;
    password: string;
    avatar?: string;
}
