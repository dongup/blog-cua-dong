import type { ContactItem } from "@/lib/about-me-types";

type ContactsSectionProps = {
  contacts: ContactItem[];
};

export default function ContactsSection({ contacts }: ContactsSectionProps) {
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
