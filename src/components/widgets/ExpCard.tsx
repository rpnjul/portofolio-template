interface ExpCardInt {
    company: string;
    link: string;
    job: string;
    date: string;
    desc: string;
}

const ExpCard = ({ company, link, job, date, desc }: ExpCardInt) => {
    return (
      <div className="relative pl-8 py-6 group" style={{ marginLeft: 0 }}>
        <div className="font-medium text-indigo-500 mb-1 sm:mb-0">
          <a
            href={`${link}`}
            target="_blank"
            rel="noopener"
            className="relative inline-block group/linkihate"
          >
            <span className="relative z-10">
              {company}
              <span className="absolute bottom-[0px] left-0 w-full h-0.5 bg-indigo-500 origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover/linkihate:scale-x-100" />
            </span>
          </a>
        </div>
        <div className="flex flex-col items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[0.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-500 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[0.5rem] after:-translate-x-1/2 after:translate-y-1.5">
          <div
            className="text-xl font-bold text-slate-100"
            style={{ margin: 0 }}
          >
            {job}
          </div>
          <div className="text-sm text-slate-400" style={{ margin: 0 }}>
            {date}
          </div>
        </div>
        <div className="text-slate-300 timeline-content">{desc}</div>
      </div>
    );
}

export default ExpCard;