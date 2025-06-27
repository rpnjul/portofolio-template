import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="m-0">
                <div className="group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl transform-gpu bg-background [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] transition-[filter,opacity] duration-500 ease">
                    <div>
                        <Skeleton
                            width={800}
                            height={500}
                            className="absolute left-0 top-0 h-full w-full border-none transition-all duration-300 ease-out opacity-70 [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105 object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PostSkeleton;