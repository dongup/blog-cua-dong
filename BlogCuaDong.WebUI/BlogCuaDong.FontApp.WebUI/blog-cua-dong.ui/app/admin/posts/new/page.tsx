import Link from "next/link";
import PostForm from "../PostForm";

export const metadata = {
  title: "Admin | New Post",
};

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Post</h1>
          <p className="mt-1 text-sm text-slate-500">
            Write and publish a new blog post.
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Back
        </Link>
      </div>

      <PostForm />
    </div>
  );
}
