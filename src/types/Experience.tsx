import { RowDataPacket } from "mysql2";

export interface Experience extends RowDataPacket {
  exp_id: number;
  company: string;
  job: string;
  link: string;
  description: string;
  date: string;
}
