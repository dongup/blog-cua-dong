import { NextResponse } from "next/server";
import { withApiErrorHandler, HttpError } from "@/lib/api-error-handler";
import { getPostById, updatePost, deletePost } from "@/lib/post-service";
import type { UpdatePostPayload } from "@/lib/post-types";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;
  return withApiErrorHandler(async () => {
    const post = await getPostById(id);
    if (!post) throw new HttpError("Post not found", 404);
    return NextResponse.json(post);
  })(request);
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  return withApiErrorHandler(async () => {
    const body = (await request.json()) as UpdatePostPayload;
    const post = await updatePost(id, body);
    if (!post) throw new HttpError("Post not found", 404);
    return NextResponse.json(post);
  })(request);
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { id } = await params;
  return withApiErrorHandler(async () => {
    const deleted = await deletePost(id);
    if (!deleted) throw new HttpError("Post not found", 404);
    return new Response(null, { status: 204 });
  })(request);
}
