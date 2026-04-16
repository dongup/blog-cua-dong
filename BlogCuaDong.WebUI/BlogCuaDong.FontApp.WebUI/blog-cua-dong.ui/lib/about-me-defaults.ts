import type { AboutMeContent } from "./about-me-types";

export const ABOUT_ME_DEFAULTS: AboutMeContent = {
  profile: {
    portfolioLabel: "Portfolio",
    name: "Nguyen Van Dong",
    title: "Software Engineer",
    avatarSrc: "/avatar-square.jpg",
    cvUrl: "/NGUYEN-VAN-DONG.pdf",
  },
  skills: [
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
  ],
  contacts: [
    {
      label: "Email",
      value: "thanhdongn195@gmail.com",
      href: "mailto:thanhdongn195@gmail.com",
    },
    { label: "Phone", value: "0968730102", href: "tel:+84968730102" },
    { label: "Location", value: "Ho Chi Minh City, Vietnam", href: "#" },
    {
      label: "Experience",
      value: "7 years in software engineering",
      href: "#",
    },
  ],
  socials: [
    {
      name: "Email",
      href: "mailto:thanhdongn195@gmail.com",
      icon: "email",
    },
    {
      name: "Phone",
      href: "tel:+84968730102",
      icon: "phone",
    },
    {
      name: "Address",
      href: "https://maps.google.com/?q=Thu+Duc+Ho+Chi+Minh+City",
      icon: "location",
    },
  ],
  experiences: [
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
  ],
};
