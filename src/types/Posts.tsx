import { RowDataPacket } from "mysql2";

export interface PostsData extends RowDataPacket{
    post_id ?: number;
    slug: string;
    cover: string;
    title: string;
    description: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}