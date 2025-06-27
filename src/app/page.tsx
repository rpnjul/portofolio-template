import ExpComponent from "@/components/common/ExpComponent";
import PostComponent from "@/components/common/PostComponent";
import ProjectComponent from "@/components/common/ProjectComponent";
import SkillsCard from "@/components/widgets/SkillsCard";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";

const Home = async () => {
    return (
      <>
        <div className="card">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row w-full justify-between gap-2">
              <h1 className="unset text-4xl" style={{ margin: 0 }}>
                Satria Aprilian
              </h1>
              <div className="flex gap-2 justify-end" style={{ margin: 0 }}>
                <Link
                  href="mailto:satriaaprilian18@gmail.com"
                  target="_blank"
                  aria-label="Email"
                >
                  <div
                    className="card"
                    style={{ padding: 10, lineHeight: 0, margin: 0 }}
                  >
                    <div className="w-[20px] h-[20px]">
                      <AiOutlineMail />
                    </div>
                  </div>
                </Link>
                <Link
                  href="https://github.com/rpnjul"
                  target="_blank"
                  aria-label="Github"
                >
                  <div
                    className="card"
                    style={{ padding: 10, lineHeight: 0, margin: 0 }}
                  >
                    <div className="w-[20px] h-[20px]">
                      <FaGithub />
                    </div>
                  </div>
                </Link>
                <Link
                  href="https://instagram.com/sssssatria"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <div
                    className="card"
                    style={{ padding: 10, lineHeight: 0, margin: 0 }}
                  >
                    <div className="w-[20px] h-[20px]">
                      <FaInstagram />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div
              className="flex justify-start items-center text-gray-400"
              style={{ margin: 0 }}
            >
              <div className="h-[20px] w-[20px] custom">
                <GrLocationPin />
              </div>
              <span className="w-fit" style={{ margin: 0 }}>
                Jakarta, Indonesia
              </span>
            </div>
          </div>
          <div className="mb-0 mt-4">
            Full-Stack Developer with 5+ years of experience in building fast,
            responsive, and impactful web applications. I turn ideas into real,
            scalable products.
          </div>
        </div>
        <div className="mt-16">
          <h1 className="home-title">What i work with</h1>
          <SkillsCard
            data={[
              "bootstrap",
              "tailwind",
              "javascript",
              "typescript",
              "react",
              "rn",
              "nextjs",
            ]}
          />
          <SkillsCard
            data={[
              "laravel",
              "php",
              "express",
              "nodejs",
              "mysql",
              "postgre",
              "github",
            ]}
          />
          <ExpComponent limit={2} />
        </div>
        <div className="mt-8">
          <ProjectComponent />
        </div>
        <div className="mt-8">
          <PostComponent />
        </div>
      </>
    );
}

export default Home;