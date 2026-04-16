import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const socialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    href: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const experienceSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    highlights: [{ type: String, required: true, trim: true }],
  },
  { _id: false },
);

const aboutMeContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    profile: {
      portfolioLabel: { type: String, required: true, trim: true },
      name: { type: String, required: true, trim: true },
      title: { type: String, required: true, trim: true },
      avatarSrc: { type: String, required: true, trim: true },
      cvUrl: { type: String, required: true, trim: true },
    },
    skills: [{ type: String, required: true, trim: true }],
    contacts: [contactSchema],
    socials: [socialSchema],
    experiences: [experienceSchema],
  },
  {
    timestamps: true,
    collection: "about_me_content",
  },
);

export const AboutMeContentModel =
  mongoose.models.AboutMeContent ||
  mongoose.model("AboutMeContent", aboutMeContentSchema);
