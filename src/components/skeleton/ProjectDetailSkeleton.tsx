import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectDetailSkeleton = () => {
    return (
      <>
        <figure className="full-width">
          <picture>
            <Skeleton
              width={800}
              height={400}
              className="w-full h-auto rounded-[10px]"
            />
          </picture>
        </figure>
        <div className="card">
            <div className="flex gap-4 items-center">
                <Skeleton
                    width={50}
                    height={50}
                    className="h-12 w-12"
                />
                <Skeleton width={200} height={52} className="m-0"/>
            </div>
            <div className="flex gap-2 mt-4 custom flex-wrap">
                {[...Array(3)].map((_,i) => (
                    <div className="mb-0 card p-2 flex items-center custom" key={i}>
                        <div className="h-6 mr-2 custom icon"><Skeleton width={20} height={20} /></div>
                        <Skeleton width={60} height={20} />
                    </div>
                ))}
            </div>
            <p className="mb-0"><Skeleton width={"100%"} /></p>
        </div>
        <div className="mt-8">
            <p className="my-8">
                <Skeleton width={"100%"} count={12} />
            </p>
        </div>
      </>
    );
}
export default ProjectDetailSkeleton;