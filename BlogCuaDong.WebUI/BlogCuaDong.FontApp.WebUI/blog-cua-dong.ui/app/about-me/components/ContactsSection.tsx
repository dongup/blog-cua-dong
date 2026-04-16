const contacts = [
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
];

export default function ContactsSection() {
  return (
    <>
      <h2 className="about-section-title-dark text-sm font-semibold uppercase tracking-[0.14em]">
        Contact
      </h2>
      <ul className="mt-4 space-y-3 text-sm">
        {contacts.map((item) => (
          <li
            key={item.label}
            className="about-contact-item rounded-lg px-3 py-2"
          >
            <p className="about-contact-label text-xs uppercase tracking-[0.12em]">
              {item.label}
            </p>
            <a
              href={item.href}
              className="about-contact-link mt-1 block transition"
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
