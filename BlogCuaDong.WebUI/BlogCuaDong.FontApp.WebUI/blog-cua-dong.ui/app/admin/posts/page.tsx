import Link from "next/link";
import { getAllPosts } from "@/lib/post-service";
import PostsListClient from "./PostsListClient";

export const metadata = {
  title: "Admin | Posts",
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Posts</h1>
          <p className="mt-1 text-sm text-slate-500">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1Z" />
          </svg>
          Create Post
        </Link>
      </div>

      <PostsListClient initialPosts={posts} />
    </div>
  );
}
