import { connectMongo } from "./mongodb";
import { PostModel } from "./models/Post";
import type { Post, CreatePostPayload, UpdatePostPayload } from "./post-types";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPost(doc: any): Post {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    content: doc.content ?? "",
    tags: doc.tags ?? [],
    status: doc.status,
    createdAt: doc.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString() ?? new Date().toISOString(),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  await connectMongo();
  const docs = await PostModel.find({}).sort({ createdAt: -1 }).lean();
  return docs.map(toPost);
}

export async function getPostById(id: string): Promise<Post | null> {
  await connectMongo();
  const doc = await PostModel.findById(id).lean();
  return doc ? toPost(doc) : null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await connectMongo();
  const doc = await PostModel.findOne({ slug }).lean();
  return doc ? toPost(doc) : null;
}

export async function getRelatedPosts(
  currentId: string,
  tags: string[],
  limit = 3,
): Promise<Post[]> {
  await connectMongo();
  const docs = await PostModel.find({
    _id: { $ne: currentId },
    status: "published",
    tags: { $in: tags },
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return docs.map(toPost);
}

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  await connectMongo();
  let slug = slugify(payload.title) || "untitled";
  const existing = await PostModel.findOne({ slug }).lean();
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }
  const doc = await PostModel.create({ ...payload, slug });
  return toPost(doc.toObject());
}

export async function updatePost(
  id: string,
  payload: UpdatePostPayload,
): Promise<Post | null> {
  await connectMongo();
  const doc = await PostModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true },
  ).lean();
  return doc ? toPost(doc) : null;
}

export async function deletePost(id: string): Promise<boolean> {
  await connectMongo();
  const result = await PostModel.findByIdAndDelete(id);
  return result !== null;
}
