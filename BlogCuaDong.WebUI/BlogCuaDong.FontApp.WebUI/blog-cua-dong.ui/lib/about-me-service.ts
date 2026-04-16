import { ABOUT_ME_DEFAULTS } from "./about-me-defaults";
import type {
  AboutMeContent,
  ContactItem,
  ExperienceItem,
  SocialIconKey,
  SocialItem,
} from "./about-me-types";
import { connectMongo } from "./mongodb";
import { AboutMeContentModel } from "./models/AboutMeContent";

const ABOUT_ME_KEY = "primary";
const VALID_SOCIAL_ICONS: SocialIconKey[] = [
  "email",
  "phone",
  "location",
  "link",
];

function asNonEmptyString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeContacts(value: unknown): ContactItem[] {
  if (!Array.isArray(value)) {
    return ABOUT_ME_DEFAULTS.contacts;
  }

  const contacts = value
    .map((item, index) => {
      const fallback =
        ABOUT_ME_DEFAULTS.contacts[index] ?? ABOUT_ME_DEFAULTS.contacts[0];
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as Partial<ContactItem>;
      return {
        label: asNonEmptyString(candidate.label, fallback.label),
        value: asNonEmptyString(candidate.value, fallback.value),
        href: asNonEmptyString(candidate.href, fallback.href),
      };
    })
    .filter((item): item is ContactItem => item !== null);

  return contacts.length ? contacts : ABOUT_ME_DEFAULTS.contacts;
}

function normalizeSocials(value: unknown): SocialItem[] {
  if (!Array.isArray(value)) {
    return ABOUT_ME_DEFAULTS.socials;
  }

  const socials = value
    .map((item, index) => {
      const fallback =
        ABOUT_ME_DEFAULTS.socials[index] ?? ABOUT_ME_DEFAULTS.socials[0];
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as Partial<SocialItem>;
      const icon = VALID_SOCIAL_ICONS.includes(candidate.icon as SocialIconKey)
        ? (candidate.icon as SocialIconKey)
        : fallback.icon;

      return {
        name: asNonEmptyString(candidate.name, fallback.name),
        href: asNonEmptyString(candidate.href, fallback.href),
        icon,
      };
    })
    .filter((item): item is SocialItem => item !== null);

  return socials.length ? socials : ABOUT_ME_DEFAULTS.socials;
}

function normalizeExperiences(value: unknown): ExperienceItem[] {
  if (!Array.isArray(value)) {
    return ABOUT_ME_DEFAULTS.experiences;
  }

  const experiences = value
    .map((item, index) => {
      const fallback =
        ABOUT_ME_DEFAULTS.experiences[index] ??
        ABOUT_ME_DEFAULTS.experiences[0];

      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as Partial<ExperienceItem>;
      const highlights = Array.isArray(candidate.highlights)
        ? candidate.highlights
            .map((line) => (typeof line === "string" ? line.trim() : ""))
            .filter(Boolean)
        : fallback.highlights;

      return {
        period: asNonEmptyString(candidate.period, fallback.period),
        role: asNonEmptyString(candidate.role, fallback.role),
        company: asNonEmptyString(candidate.company, fallback.company),
        summary: asNonEmptyString(candidate.summary, fallback.summary),
        highlights: highlights.length ? highlights : fallback.highlights,
      };
    })
    .filter((item): item is ExperienceItem => item !== null);

  return experiences.length ? experiences : ABOUT_ME_DEFAULTS.experiences;
}

export function normalizeAboutMeContent(value: unknown): AboutMeContent {
  const raw =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};
  const profileRaw =
    raw.profile && typeof raw.profile === "object"
      ? (raw.profile as Record<string, unknown>)
      : {};

  const skills = Array.isArray(raw.skills)
    ? raw.skills
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
    : ABOUT_ME_DEFAULTS.skills;

  return {
    profile: {
      portfolioLabel: asNonEmptyString(
        profileRaw.portfolioLabel,
        ABOUT_ME_DEFAULTS.profile.portfolioLabel,
      ),
      name: asNonEmptyString(profileRaw.name, ABOUT_ME_DEFAULTS.profile.name),
      title: asNonEmptyString(
        profileRaw.title,
        ABOUT_ME_DEFAULTS.profile.title,
      ),
      avatarSrc: asNonEmptyString(
        profileRaw.avatarSrc,
        ABOUT_ME_DEFAULTS.profile.avatarSrc,
      ),
      cvUrl: asNonEmptyString(
        profileRaw.cvUrl,
        ABOUT_ME_DEFAULTS.profile.cvUrl,
      ),
    },
    skills: skills.length ? skills : ABOUT_ME_DEFAULTS.skills,
    contacts: normalizeContacts(raw.contacts),
    socials: normalizeSocials(raw.socials),
    experiences: normalizeExperiences(raw.experiences),
  };
}

export async function getAboutMeContent() {
  await connectMongo();
  const doc = await AboutMeContentModel.findOne({ key: ABOUT_ME_KEY }).lean();

  if (!doc) {
    return ABOUT_ME_DEFAULTS;
  }

  return normalizeAboutMeContent(doc);
}

export async function saveAboutMeContent(payload: unknown) {
  await connectMongo();
  const normalized = normalizeAboutMeContent(payload);

  await AboutMeContentModel.findOneAndUpdate(
    { key: ABOUT_ME_KEY },
    {
      key: ABOUT_ME_KEY,
      ...normalized,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    },
  );

  return normalized;
}
