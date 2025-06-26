import { experienceInterface, projectInterface } from "@/types/HomeData";
import { DiPostgresql } from "react-icons/di";
import { FaLaravel } from "react-icons/fa";
import { SiNextdotjs, SiNodedotjs } from "react-icons/si";

export const experienceData: experienceInterface[] = [
    {
        company: "Hitztar",
        link: "https://www.hitztar.com",
        job: "Fullstack Developer",
        date: "2023 - Present",
        description: "Led cross-platform application development for web and mobile using Next.JS, and React Native. Designed and managed backend systems with Laravel and Express.JS, enhanced performance and user experience, implemented livestreaming with Node.JS, integrated in-app purchases (Android/iOS), and developed a secure payment gateway.",
    },
    {
        company: "PT. Rekayasa Aplikasi Digital",
        link: "https://www.rapdig.com",
        job: "Fullstack Developer",
        date: "2020 - 2023",
        description: "Developed full-stack solutions for edu-tech and e-commerce platforms using React and Laravel. Designed APIs and system flows for smooth integration. Key projects: SekolahDigi, BantuBeli, CariMontir, and KBL Apps.  ",
    },
]

export const projectData: projectInterface[] = [
    {
        id: 1,
        slug: "test",
        img: "/image/img.png",
        title: "Hitztar",
        iconURL: "https://www.hitztar.com/favicon.ico",
        stack: [
            { icon: SiNextdotjs, name: "Next.JS"},
            { icon: FaLaravel, name: "Laravel"},
            { icon: FaLaravel, name: "Laravel"},
            { icon: SiNodedotjs, name: "Node.js"},
            { icon: DiPostgresql, name: "PostgreSQL"},
        ],
        description: "Social Media for Entertainment.",
    },
];