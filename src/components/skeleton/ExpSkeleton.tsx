import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExpSkeleton = () => {
    return (
        <section className="relative flex flex-col justify-center overflow-hidden">
            <div className="w-full max-w-6xl mx-auto">
                <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:pb-4">
                    <div className="w-full max-w-3xl mx-auto">
                        <div className="-my-6 flex flex-col items-center">
                            {[...Array(2)].map((_, i) => (
                            <div key={i} className="relative pl-8 py-6 group" style={{ marginLeft: 0 }}>
                                <div className="font-medium text-indigo-500 mb-1 sm:mb-0">
                                    <div
                                        rel="noopener"
                                        className="relative inline-block group"
                                    >
                                        <span className="relative z-10">
                                            <Skeleton width={200} height={20} />
                                            <span className="absolute bottom-[0px] left-0 w-full h-0.5 bg-accent origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover/linkihate:scale-x-100" />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[0.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-accent after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[0.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                                    <div className="text-xl font-bold text-slate-100" style={{ margin: 0 }}>
                                        <Skeleton width={130} height={20} />
                                    </div>
                                    <div className="text-sm text-slate-400" style={{ margin: 0 }}>
                                        <Skeleton width={100} height={20} />
                                    </div>
                                </div>
                                <div className="text-slate-300 timeline-content">
                                    <Skeleton width={300} height={20} />
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
  );
};

export default ExpSkeleton;
