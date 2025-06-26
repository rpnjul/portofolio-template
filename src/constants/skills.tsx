import { JSX } from "react";
import { FaBootstrap, FaGithub, FaGitlab, FaJava, FaLaravel, FaNodeJs, FaPhp, FaReact, FaRust } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiExpress,
  SiJavascript,
  SiOracle,
  SiPostgresql,
  SiTypescript,
  SiVitess,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

export const iconMap: Record<string, JSX.Element> = {
  bootstrap: <FaBootstrap />,
  tailwind: <RiTailwindCssFill />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  react: <FaReact />,
  nextjs: <RiNextjsFill />,
  mysql: <GrMysql />,
  postgre: <SiPostgresql />,
  oracle: <SiOracle />,
  vite: <SiVitess />,
  nodejs: <FaNodeJs />,
  express: <SiExpress />,
  laravel: <FaLaravel />,
  rust: <FaRust />,
  github: <FaGithub />,
  gitlab: <FaGitlab />,
  java: <FaJava />,
  rn: <TbBrandReactNative />,
  php: <FaPhp />,
};

export const labelMap: Record<string, string> = {
  bootstrap: "Bootstrap",
  tailwind: "Tailwind CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  nextjs: "Next.JS",
  mysql: "MySQL",
  postgre: "PostgreSQL",
  oracle: "Oracle",
  vite: "Vite",
  nodejs: "Node.js",
  express: "Express",
  laravel: "Laravel",
  rust: "Rust",
  github: "Github",
  gitlab: "Gitlab",
  java: "Java",
  rn: "React Native",
  php: "PHP",
};