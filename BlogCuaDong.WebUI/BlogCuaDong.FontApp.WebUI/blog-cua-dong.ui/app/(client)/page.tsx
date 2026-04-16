import Link from "next/link";
import { getAllPosts } from "@/lib/post-service";
import type { Post } from "@/lib/post-types";

const TAG_COLORS: Record<string, string> = {
  Architecture: "bg-violet-100 text-violet-700",
  ".NET": "bg-blue-100 text-blue-700",
  DDD: "bg-indigo-100 text-indigo-700",
  React: "bg-cyan-100 text-cyan-700",
  TypeScript: "bg-sky-100 text-sky-700",
  "State Management": "bg-teal-100 text-teal-700",
  Azure: "bg-blue-100 text-blue-700",
  Microservices: "bg-purple-100 text-purple-700",
  Backend: "bg-slate-100 text-slate-700",
  Routing: "bg-emerald-100 text-emerald-700",
  Testing: "bg-amber-100 text-amber-700",
  "Clean Code": "bg-orange-100 text-orange-700",
  MongoDB: "bg-green-100 text-green-700",
};

function excerpt(content: string, maxLength = 160): string {
  const plain = content.replace(/[#*`>_~[\]]/g, "").trim();
  return plain.length <= maxLength
    ? plain
    : plain.slice(0, maxLength).trimEnd() + "…";
}

function readTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white/75 backdrop-blur-sm p-5 shadow-sm transition hover:shadow-md hover:bg-white/90">
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[tag] ?? "bg-slate-100 text-slate-600"}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-slate-600">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
        {excerpt(post.content)}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span>{readTime(post.content)}</span>
      </div>
    </article>
  );
}

export default async function Home() {
  const posts = await getAllPosts();
  const published = posts.filter((p) => p.status === "published");

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
          Latest articles
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">Blog</h1>
      </div>

      {published.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <svg
            viewBox="0 0 24 24"
            className="h-10 w-10 text-slate-300"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6Zm7 1.5L18.5 9H14a1 1 0 0 1-1-1V3.5ZM8 13h8a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2Zm0-4h3a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2Z" />
          </svg>
          <p className="text-sm font-medium text-slate-500">
            No published posts yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
