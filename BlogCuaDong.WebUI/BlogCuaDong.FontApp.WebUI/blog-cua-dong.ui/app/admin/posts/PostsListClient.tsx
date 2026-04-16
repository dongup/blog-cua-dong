"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Post } from "@/lib/post-types";

const STATUS_COLORS: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
};

interface PostsListClientProps {
  initialPosts: Post[];
}

export default function PostsListClient({
  initialPosts,
}: PostsListClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert((err as { message?: string }).message ?? "Failed to delete post");
        return;
      }
      setPosts((prev) => prev.filter((p) => p._id !== id));
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <svg
            viewBox="0 0 24 24"
            className="h-10 w-10 text-slate-300"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6Zm7 1.5L18.5 9H14a1 1 0 0 1-1-1V3.5ZM8 13h8a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2Zm0-4h3a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2Z" />
          </svg>
          <p className="text-sm font-medium text-slate-500">No posts yet</p>
          <Link
            href="/admin/posts/new"
            className="text-sm font-medium text-slate-900 underline underline-offset-2 hover:text-slate-600"
          >
            Create your first post
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left">
            <th className="px-4 py-3 font-medium text-slate-600">Title</th>
            <th className="px-4 py-3 font-medium text-slate-600">Tags</th>
            <th className="px-4 py-3 font-medium text-slate-600">Status</th>
            <th className="px-4 py-3 font-medium text-slate-600">Created</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {posts.map((post) => (
            <tr key={post._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-medium text-slate-900 max-w-xs truncate">
                {post.title}
              </td>
              <td className="px-4 py-3 text-slate-500">
                {post.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-slate-400">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded border px-2 py-0.5 text-xs font-medium capitalize ${STATUS_COLORS[post.status] ?? ""}`}
                >
                  {post.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/posts/${post._id}/edit`}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post._id, post.title)}
                    disabled={deleting === post._id}
                    className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {deleting === post._id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
