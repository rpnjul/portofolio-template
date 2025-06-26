import { IconType } from "react-icons";

export interface experienceInterface {
    id?: number;
    company: string;
    link: string;
    job: string;
    date: string;
    description: string;
}

export interface projectInterface {
    id?: number;
    slug?: string;
    img: string;
    title: string;
    iconURL?: string;
    stack: projectStack[];
    description: string;
}

export interface projectStack {
    icon: IconType;
    name: string;
}