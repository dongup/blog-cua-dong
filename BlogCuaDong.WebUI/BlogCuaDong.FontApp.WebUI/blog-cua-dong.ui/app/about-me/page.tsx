import Image from "next/image";
import "./about-me-theme.css";
import {
  ContactsSection,
  ExperienceTimeline,
  SkillsSection,
  SocialSection,
} from "./components";

export default function AboutMe() {
  return (
    <div className="about-page-bg h-[100dvh] overflow-hidden p-4 sm:p-6 lg:p-8">
      <main className="about-main-card mx-auto flex h-full w-full max-w-6xl flex-col gap-6 overflow-hidden rounded-3xl border backdrop-blur lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="about-sidebar min-h-0 overflow-y-auto rounded-2xl px-6">
          <div className="about-sidebar-header sticky top-0 z-10 -mx-2 mb-2 p-2 pt-6 pb-4 backdrop-blur">
            <div className="flex items-center gap-4">
              <Image
                src="/avatar-square.jpg"
                alt="Profile avatar"
                width={84}
                height={84}
                priority
                className="about-avatar-border h-21 w-21 rounded-2xl border-2 object-cover"
              />
              <div>
                <p className="about-label-accent text-sm uppercase tracking-[0.18em]">
                  Portfolio
                </p>
                <h1 className="text-2xl font-bold leading-tight">
                  Nguyen Van Dong
                </h1>
                <p className="about-text-on-dark-muted mt-1 text-sm">
                  Software Engineer
                </p>
              </div>
            </div>
          </div>

          <section className="mt-6 snap-start">
            <SkillsSection />
          </section>

          <section className="mt-8">
            <ContactsSection />
          </section>

          <div className="about-footer-gradient sticky bottom-0 z-10 -mx-2 mt-8 px-2 pb-5 pt-5">
            <SocialSection />
          </div>
        </aside>

        <section className="min-h-0 overflow-y-auto rounded-2xl">
          <ExperienceTimeline />
        </section>
      </main>
    </div>
  );
}
