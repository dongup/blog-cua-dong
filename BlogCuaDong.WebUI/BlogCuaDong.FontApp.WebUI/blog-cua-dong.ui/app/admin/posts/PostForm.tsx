"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestJson } from "@/lib/client-request";
import type { Post, PostStatus } from "@/lib/post-types";

interface PostFormProps {
  /** Pass an existing post to edit it; omit for create mode. */
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tags, setTags] = useState(post?.tags.join(", ") ?? "");
  const [status, setStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      title: title.trim(),
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status,
    };

    try {
      if (isEdit) {
        await requestJson(`/api/posts/${post._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await requestJson("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="post-title"
            className="text-sm font-medium text-slate-700"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="post-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="post-tags"
            className="text-sm font-medium text-slate-700"
          >
            Tags
            <span className="ml-1.5 font-normal text-slate-400">
              (comma separated)
            </span>
          </label>
          <input
            id="post-tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. React, TypeScript, Architecture"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="post-status"
            className="text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="post-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as PostStatus)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="post-content"
            className="text-sm font-medium text-slate-700"
          >
            Content
          </label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows={20}
            className="rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={saving}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Post"}
        </button>
      </div>
    </form>
  );
}
