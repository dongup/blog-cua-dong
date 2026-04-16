import type { SocialIconKey, SocialItem } from "@/lib/about-me-types";

type SocialSectionProps = {
  socials: SocialItem[];
  cvUrl: string;
};

function SocialIcon({ icon }: { icon: SocialIconKey }) {
  if (icon === "email") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2.34-.25 6.33 5.08a.5.5 0 0 0 .66 0l6.33-5.08H5.34Zm13.16 2.06-5.22 4.19a2.5 2.5 0 0 1-3.12 0L5 8.56v8.69c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75V8.56Z" />
      </svg>
    );
  }

  if (icon === "phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6.62 2.25c.63 0 1.18.45 1.29 1.08l.38 2.15a1.5 1.5 0 0 1-.43 1.36L6.58 8.11c.98 2.1 2.69 3.81 4.79 4.79l1.27-1.28a1.5 1.5 0 0 1 1.36-.43l2.15.38c.63.11 1.08.66 1.08 1.29V17.5A2.25 2.25 0 0 1 14.98 19.75h-.73C7.48 19.75 2 14.27 2 7.5v-.73A2.25 2.25 0 0 1 4.25 4.5h2.37Z" />
      </svg>
    );
  }

  if (icon === "location") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2a7 7 0 0 0-7 7c0 5.18 5.38 11.81 6.08 12.65a1.2 1.2 0 0 0 1.84 0C13.62 20.81 19 14.18 19 9a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 3a1 1 0 0 1 1 1v2.05a6.98 6.98 0 0 1 4.95 4.95H20a1 1 0 1 1 0 2h-2.05A6.98 6.98 0 0 1 13 17.95V20a1 1 0 1 1-2 0v-2.05A6.98 6.98 0 0 1 6.05 13H4a1 1 0 1 1 0-2h2.05A6.98 6.98 0 0 1 11 6.05V4a1 1 0 0 1 1-1Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
    </svg>
  );
}

export default function SocialSection({ socials, cvUrl }: SocialSectionProps) {
  return (
    <>
      <section>
        <h2 className="about-section-title-dark text-sm font-semibold uppercase tracking-[0.14em]">
          Social
        </h2>
        <div className="mt-4 flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="about-social-link inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:-translate-y-0.5"
            >
              <SocialIcon icon={social.icon} />
            </a>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <a
          href={cvUrl}
          download
          className="about-download-btn inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition"
        >
          Download CV
        </a>
      </section>
    </>
  );
}
