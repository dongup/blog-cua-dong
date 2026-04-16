type SkillsSectionProps = {
  skills: string[];
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <>
      <h2 className="about-section-title-dark text-sm font-semibold uppercase tracking-[0.14em]">
        Skills
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="about-chip rounded-full border px-3 py-1 text-sm"
          >
            {skill}
          </li>
        ))}
      </ul>
    </>
  );
}
