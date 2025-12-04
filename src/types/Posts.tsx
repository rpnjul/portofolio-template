import { ObjectId } from "mongodb";

export interface PostsData {
    _id?: ObjectId;
    slug?: string;
    cover?: string;
    title: string;
    description: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}
