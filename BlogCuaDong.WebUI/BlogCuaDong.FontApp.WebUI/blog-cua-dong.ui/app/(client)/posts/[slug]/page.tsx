import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/post-service";
import type { Metadata } from "next";
import type { Post } from "@/lib/post-types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post ? post.title : "Post not found",
  };
}

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

function excerpt(content: string, maxLength = 120): string {
  const plain = content.replace(/[#*`>_~[\]]/g, "").trim();
  return plain.length <= maxLength
    ? plain
    : plain.slice(0, maxLength).trimEnd() + "\u2026";
}

function readTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/**
 * Very light Markdown-to-HTML renderer covering the subset used in posts:
 * headings (#, ##, ###), bold (**), inline code (`), paragraphs, and blank-line separation.
 */
function renderContent(content: string): string {
  const lines = content.split("\n");
  const html: string[] = [];
  let inParagraph = false;

  const closeParagraph = () => {
    if (inParagraph) {
      html.push("</p>");
      inParagraph = false;
    }
  };

  const inlineFormat = (text: string) =>
    text
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (!line) {
      closeParagraph();
      continue;
    }

    const h3 = line.match(/^###\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h1 = line.match(/^#\s+(.*)/);

    if (h1) {
      closeParagraph();
      html.push(`<h1>${inlineFormat(h1[1])}</h1>`);
    } else if (h2) {
      closeParagraph();
      html.push(`<h2>${inlineFormat(h2[1])}</h2>`);
    } else if (h3) {
      closeParagraph();
      html.push(`<h3>${inlineFormat(h3[1])}</h3>`);
    } else {
      if (!inParagraph) {
        html.push("<p>");
        inParagraph = true;
      } else {
        html.push(" ");
      }
      html.push(inlineFormat(line));
    }
  }

  closeParagraph();
  return html.join("");
}

function RelatedPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col rounded-xl border border-slate-200/80 bg-white/75 backdrop-blur-sm p-4 shadow-sm transition hover:shadow-md hover:bg-white/90"
    >
      <div className="flex flex-wrap gap-1 mb-2">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${TAG_COLORS[tag] ?? "bg-slate-100 text-slate-600"}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-600 leading-snug">
        {post.title}
      </p>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-500">
        {excerpt(post.content)}
      </p>
      <p className="mt-3 text-xs text-slate-400">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </Link>
  );
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") notFound();

  const [bodyHtml, related] = await Promise.all([
    Promise.resolve(renderContent(post.content)),
    getRelatedPosts(post._id, post.tags),
  ]);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition mb-8"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        Back to Blog
      </Link>

      <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm shadow-sm px-6 py-8 sm:px-10">
        <header className="mb-8">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[tag] ?? "bg-slate-100 text-slate-600"}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{readTime(post.content)}</span>
          </div>
        </header>

        <hr className="border-slate-200 mb-8" />

        {/* Body */}
        <article
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900 mb-5">
            Related Posts
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RelatedPostCard key={r._id} post={r} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
