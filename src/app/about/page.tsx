import ExpComponent from "@/components/common/ExpComponent";
import "../../styles/pages/about.css"
import EduComponent from "@/components/common/EduComponents";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const About = () => (
  <>
    <div className="flex flex-col items-center text-center mb-8">
      <Image
        src="/assets/img/satria.png"
        alt="Satria Aprilian"
        width={200}
        height={200}
        className="rounded-full border-4 border-indigo-500 mb-4"
      />
      <div className="flex gap-2 justify-center">
        <Link
          href="mailto:satriaaprilian18@gmail.com"
          target="_blank"
          aria-label="Email"
        >
          <div className="card p-[10px] leading-none">
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
          <div className="card p-[10px] leading-none">
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
          <div className="card p-[10px] leading-none">
            <div className="w-[20px] h-[20px]">
              <FaInstagram />
            </div>
          </div>
        </Link>
      </div>
      <h1 className="unset text-4xl font-bold mb-2">Hey there!</h1>
    </div>

    <p className="my-8">
      I’m Satria — a software engineer who’s been building web and mobile apps
      for a few years now. I work mostly as a full-stack developer, which
      basically means I enjoy getting my hands dirty with both frontend and
      backend stuff. I’ve built everything from scalable e-commerce platforms to
      real-time features like livestreaming and in-app purchases.
    </p>
    <p className="my-8">
      I’m a big fan of clean, fast, and minimalistic websites — no unnecessary
      clutter, just stuff that works. I enjoy using tools like{" "}
      <strong>React</strong>, <strong>Next.js</strong>, <strong>Laravel</strong>
      , and <strong>Node.js</strong>, and I’ve also dabbled in mobile
      development with <strong>React Native</strong>.
    </p>
    <p className="my-8">
      Lately, I’ve been helping companies solve problems through smart
      architecture, smooth user experiences, and secure systems. Whether it’s
      designing APIs, setting up payment gateways, or just making sure things
      don’t crash — that’s my jam.
    </p>
    <p className="my-8">
      When I’m not coding, I’m probably tweaking side projects, exploring new
      tech, or just trying to make the web a little bit better.
    </p>
    <p className="my-8">
      Oh yeah, this website source-code is open-source! So if you want a site
      like this too, feel free to check out the code on my GitHub{" "}
      <a href="https://github.com/rpnjul/portofolio-template">here</a>. And if
      you get stuck while setting it up, don’t worry — you can always reach out
      and ask me anything!
    </p>
    <div className="mt-16">
      <ExpComponent />
    </div>
    <div className="mt-16">
      <EduComponent />
    </div>
  </>
);

export default About;