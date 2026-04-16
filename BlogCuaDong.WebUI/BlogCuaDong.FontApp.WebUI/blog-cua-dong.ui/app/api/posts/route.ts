import { NextResponse } from "next/server";
import { withApiErrorHandler, HttpError } from "@/lib/api-error-handler";
import { getAllPosts, createPost } from "@/lib/post-service";
import type { CreatePostPayload } from "@/lib/post-types";

export const GET = withApiErrorHandler(async () => {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
});

export const POST = withApiErrorHandler(async (request) => {
  const body = (await request.json()) as Partial<CreatePostPayload>;

  if (!body.title?.trim()) {
    throw new HttpError("Title is required", 400);
  }

  const post = await createPost({
    title: body.title.trim(),
    content: body.content ?? "",
    tags: Array.isArray(body.tags) ? body.tags : [],
    status: body.status === "published" ? "published" : "draft",
  });

  return NextResponse.json(post, { status: 201 });
});
