const experiences = [
  {
    period: "Aug 2024 - Now",
    role: "Software Engineer",
    company: "Axon Active - Galliker Transport (Team SA)",
    summary:
      "Contributed to the digital transformation of Galliker Transport logistics systems across vehicle, order, and invoice domains.",
    highlights: [
      "Led code reviews and technical sharing on error handling, DDD, and Clean Architecture.",
      "Refactored backend flows to better respect domain boundaries and read/write separation.",
      "Built advanced frontend features with ReactJS, Zustand, TanStack Query/Router, and MSAL SSO.",
      "Maintained 80%+ test coverage with unit and integration tests.",
    ],
  },
  {
    period: "Sep 2022 - Aug 2024",
    role: "Back-end Developer",
    company: "Joblogic Service Management Software",
    summary:
      "Developed and maintained SaaS services for field service businesses, including scheduling, invoicing, and customer workflows.",
    highlights: [
      "Built microservices with .NET Core, SignalR, SQL Server, Azure Functions, and Service Bus.",
      "Integrated Stripe, Xero, SOAP APIs, and SendGrid in event-driven backend flows.",
      "Implemented background jobs and migration tools for billing and subscription transitions.",
      "Used MongoDB for metrics, mobile sync data, and auditing.",
    ],
  },
  {
    period: "Jan 2022 - Sep 2022",
    role: "Full-Stack Developer",
    company: "STEPMEDIA - Deloitte Auditing Platform",
    summary:
      "Built and maintained digital audit modules using .NET Core, ReactJS, and microservice architecture.",
    highlights: [
      "Developed drawing-to-image functionality and shared annotation features.",
      "Resolved backend and frontend defects and improved engagement loading performance.",
    ],
  },
  {
    period: "May 2021 - Jan 2022",
    role: "Full-Stack Developer",
    company: "IOTSOFTVN - Warehouse Management System",
    summary:
      "Developed production and warehouse management software for resistant chip manufacturing operations.",
    highlights: [
      "Gathered requirements directly with customers and documented technical specifications.",
      "Built REST APIs with .NET 5 and EF Core; developed ReactJS + TypeScript UI.",
      "Delivered accounting reports for material loss, import/export, and consumption tracking.",
    ],
  },
];

export default function ExperienceTimeline() {
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
