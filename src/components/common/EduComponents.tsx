"use client";
import ExpCard from "../widgets/ExpCard";

const EduComponent = () => {
  return (
    <>
      <h1 className="home-title">Education</h1>
      <section className="relative flex flex-col justify-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:pb-4">
            <div className="w-full max-w-3xl mx-auto">
              <div className="-my-6 flex flex-col items-center">
                <ExpCard
                  company={"Bina Nusantara University"}
                  link={"https://binus.ac.id/"}
                  job={"Bachelor’s Degree in Information Systems"}
                  date={"2021 - 2025"}
                  desc={""}
                />
                <ExpCard
                  company={"Bina Sarana Informatika University"}
                  link={"https://bsi.ac.id/"}
                  job={"Diploma Degree in Information Systems"}
                  date={"2017 - 2020"}
                  desc={""}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EduComponent;
