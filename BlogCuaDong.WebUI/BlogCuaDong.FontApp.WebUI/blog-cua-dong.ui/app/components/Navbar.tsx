"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Blog", href: "/" },
  { label: "About Me", href: "/about-me" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-orange-200/80 bg-[linear-gradient(135deg,rgba(127,29,29,0.96),rgba(185,28,28,0.94)_42%,rgba(249,115,22,0.9))] text-white shadow-[0_12px_30px_-20px_rgba(127,29,29,0.9)] backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-3 py-2 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/12"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200/30 bg-white/12 text-orange-50 shadow-inner shadow-red-950/20">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.5 9.5c-1.6 0-3-1.2-3.3-2.8-.1-.4.2-.8.7-.8h2.2l1.3-1.9c.2-.3.6-.4.9-.2.3.2.4.6.2.9L7.8 6h1c.4 0 .7.3.7.7 0 1.6-1.4 2.8-3 2.8Zm11 0c-1.6 0-3-1.2-3-2.8 0-.4.3-.7.7-.7h1l-1.3-1.3c-.2-.3-.1-.7.2-.9.3-.2.7-.1.9.2L17.3 6h2.2c.5 0 .8.4.7.8-.3 1.6-1.7 2.7-3.3 2.7ZM9 10.5c0-1.7 1.3-3 3-3s3 1.3 3 3v.8c2.2.4 4 2.3 4 4.7 0 2.8-3.1 5-7 5s-7-2.2-7-5c0-2.4 1.8-4.3 4-4.7v-.8Zm2.2.2a.8.8 0 1 0 0-1.5.8.8 0 0 0 0 1.5Zm1.6 0a.8.8 0 1 0 0-1.5.8.8 0 0 0 0 1.5Zm-4.5 2.7a3.8 3.8 0 0 0-2 2.1c.8.1 1.7.4 2.4 1 .3.2.3.6.1.9-.2.3-.6.3-.9.1a4.3 4.3 0 0 0-2-.8v.3c0 2 2.7 3.7 6 3.7s6-1.7 6-3.7v-.3c-.7.1-1.4.4-2 .8-.3.2-.7.2-.9-.1-.2-.3-.2-.7.1-.9.7-.5 1.6-.9 2.4-1a3.8 3.8 0 0 0-2-2.1c-.8.9-1.9 1.4-3.6 1.4s-2.8-.5-3.6-1.4Z" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.68rem] tracking-[0.22em] text-orange-100/80">
              A Craby Journal
            </span>
            <span className="mt-1 text-sm text-white">Blog Cua Dong</span>
          </span>
        </Link>
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-50 text-red-900 shadow-sm"
                      : "text-orange-50/88 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
