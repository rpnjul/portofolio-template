import { ObjectId } from "mongodb";

export interface Experience {
  _id?: ObjectId;
  company: string;
  job: string;
  link: string;
  description: string;
  date: string;
  createdAt?: Date;
}
