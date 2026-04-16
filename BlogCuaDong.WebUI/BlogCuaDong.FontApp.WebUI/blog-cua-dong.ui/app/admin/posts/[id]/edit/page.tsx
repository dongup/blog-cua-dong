import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/post-service";
import PostForm from "../../PostForm";

export const metadata = {
  title: "Admin | Edit Post",
};

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Post</h1>
          <p className="mt-1 text-sm text-slate-500 truncate max-w-md">
            {post.title}
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Back
        </Link>
      </div>

      <PostForm post={post} />
    </div>
  );
}
