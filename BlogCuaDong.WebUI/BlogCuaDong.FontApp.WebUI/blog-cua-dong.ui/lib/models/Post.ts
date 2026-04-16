import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, default: "" },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
    collection: "posts",
  },
);

export const PostModel =
  mongoose.models.Post ?? mongoose.model("Post", PostSchema);
