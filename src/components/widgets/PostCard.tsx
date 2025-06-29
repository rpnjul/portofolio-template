// components/ProjectCard.tsx
import Image from "next/image";
import { MdArrowRightAlt } from "react-icons/md";

interface PostCardProps {
  title: string;
  description: string;
  img: string;
}

const PostCard = ({ title, description, img }: PostCardProps) => {
    return (
      <div className="group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl transform-gpu bg-background [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] transition-[filter,opacity] duration-500 ease">
        <div>
          <Image
            width={800}
            height={500}
            src={img ? img : "/"}
            alt={title}
            className="absolute left-0 top-0 h-full w-full border-none transition-all duration-300 ease-out opacity-70 [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105 object-cover"
          />
        </div>
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10 custom">
          <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 m-0 custom">
            {title}
          </h2>
          <p className="max-w-lg text-neutral-400 m-0 custom">{description}</p>
        </div>

        <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 custom ml-2">
          <div className="pointer-events-auto custom bg-white rounded-lg py-1 px-2 text-xs text-black flex gap-2 items-center cursor-pointer hover:bg-white/80 transition-colors">
            Read more
            <div className="ml-2 h-4 w-4 icn">
              <MdArrowRightAlt />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"></div>
      </div>
    );
};

export default PostCard;
