export type ContactItem = {
  label: string;
  value: string;
  href: string;
};

export type SocialIconKey = "email" | "phone" | "location" | "link";

export type SocialItem = {
  name: string;
  href: string;
  icon: SocialIconKey;
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  summary: string;
  highlights: string[];
};

export type AboutMeContent = {
  profile: {
    portfolioLabel: string;
    name: string;
    title: string;
    avatarSrc: string;
    cvUrl: string;
  };
  skills: string[];
  contacts: ContactItem[];
  socials: SocialItem[];
  experiences: ExperienceItem[];
};
