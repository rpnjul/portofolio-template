import { ObjectId } from "mongodb";

export interface Projects {
    _id?: ObjectId;
    slug?: string;
    cover?: string;
    icon?: string;
    title: string;
    description: string;
    content: string;
    link?: string;
    tech?: string;
    tech_map?: string[];
    created_at: Date;
    updated_at: Date;
}
