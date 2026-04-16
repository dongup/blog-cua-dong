const skills = [
  "C#",
  ".NET Core",
  "ReactJS",
  "TypeScript",
  "Angular",
  "Microservices",
  "SQL Server",
  "MongoDB",
  "Azure Functions",
  "Service Bus",
  "Clean Architecture",
  "DDD",
  "EDD",
  "Unit Testing",
  "Integration Testing",
];

export default function SkillsSection() {
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
