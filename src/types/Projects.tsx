import { RowDataPacket } from "mysql2";

export interface Projects extends RowDataPacket {
    project_id: number;
    slug: string;
    cover: string;
    icon: string;
    title: string;
    description: string;
    content: string;
    link: string;
    tech: string;
    tech_map: string[];
    created_at: Date;
    updated_at: Date;
}

