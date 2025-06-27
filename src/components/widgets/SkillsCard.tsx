import { iconMap, labelMap } from "@/constants/skills";

type SkillsCardProps = {
  data: string[];
};

const SkillCard = ({ data }: SkillsCardProps) => {
  return (
    <div className="group flex overflow-hidden p-2 [--duration:30s] [--gap:1rem] [gap:var(--gap)] flex-row relative">
      {Array(3).fill(0).map((_, i) => (
        <div
          key={i}
          className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
          style={{ maxWidth: 'none' }}
        >
            <div className="flex gap-[1rem]" style={{ maxWidth: 'none' }}>
                {data.map((skill, index) => {
                    const lower = skill.toLowerCase();
                    const icon = iconMap[lower];
                    const label = labelMap[lower] || skill;

                    return (
                        <div key={index} className="flex items-center gap-1 text-sm text-white">
                            <div className="h-8 icn">{icon}</div>
                            <span>{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
      ))}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background" />
    </div>
  );
};

export default SkillCard;
