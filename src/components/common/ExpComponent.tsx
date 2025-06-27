"use client"; // kalau kamu pakai Next.js app router

import { Experience } from "@/types/Experience";
import { useEffect, useState } from "react";
import ExpCard from "../widgets/ExpCard";
import ExpSkeleton from "../skeleton/ExpSkeleton";


const getExperience = async (limit?: number): Promise<Experience[]> => {
    const url = limit
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/experience?limit=${limit}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/experience`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch experience data");
    }
    const data = await res.json();
    return data.data;
};
  
  
interface ExpPropsInt {
  limit?: number;
}
  

const ExpComponent = ({ limit }: ExpPropsInt) => {
  const [expData, setExpData] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperience(limit);
        setExpData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [limit]);

    return (
        <>
            <h1 className="home-title">Experience</h1>
            {isLoading ? (
                <ExpSkeleton />
            ) : (
                <>
                    {expData.length > 0 ? (
                        <section className="relative flex flex-col justify-center overflow-hidden">
                            <div className="w-full max-w-6xl mx-auto">
                                <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:pb-4">
                                    <div className="w-full max-w-3xl mx-auto">
                                        <div className="-my-6 flex flex-col items-center">
                                            {expData.map((v, i) => (
                                                <ExpCard
                                                    key={i}
                                                    company={v.company}
                                                    link={v.link}
                                                    job={v.job}
                                                    date={v.date}
                                                    desc={v.description}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <h1>NO DATA FOUND</h1>
                    )}
                </>
            )}
        </>
    );
};

export default ExpComponent;
