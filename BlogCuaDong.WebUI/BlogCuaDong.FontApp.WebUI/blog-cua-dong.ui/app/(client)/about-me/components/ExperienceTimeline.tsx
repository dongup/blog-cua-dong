import type { ExperienceItem } from "@/lib/about-me-types";

type ExperienceTimelineProps = {
  experiences: ExperienceItem[];
};

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  return (
    <div className="p-6 about-content-panel">
      <div className="about-heading-divider mb-6 border-b pb-4">
        <p className="about-section-caption text-sm uppercase tracking-[0.2em]">
          Experience
        </p>
        <h2 className="about-section-heading mt-2 text-3xl font-bold">
          Professional Timeline
        </h2>
      </div>

      <ol className="about-timeline-line relative border-l-2 pl-7">
        {experiences.map((experience) => (
          <li key={experience.period} className="relative pb-10 last:pb-0">
            <span className="about-timeline-dot absolute -left-[39px] top-1 h-4 w-4 rounded-full border-4" />
            <p className="about-period text-sm font-semibold uppercase tracking-[0.12em]">
              {experience.period}
            </p>
            <h3 className="about-role mt-1 text-xl font-bold">
              {experience.role}
            </h3>
            <p className="about-company text-base">{experience.company}</p>
            <p className="about-summary mt-3">{experience.summary}</p>
            <ul className="about-highlight-list mt-3 list-disc space-y-2 pl-5">
              {experience.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
