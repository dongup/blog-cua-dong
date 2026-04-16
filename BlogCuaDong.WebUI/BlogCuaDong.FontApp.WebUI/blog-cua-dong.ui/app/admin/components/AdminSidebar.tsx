"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M3 3h7v7H3V3Zm0 11h7v7H3v-7Zm11-11h7v7h-7V3Zm0 11h7v7h-7v-7Z" />
      </svg>
    ),
  },
  {
    label: "Posts",
    href: "/admin/posts",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6Zm7 1.5L18.5 9H14a1 1 0 0 1-1-1V3.5ZM8 13h8a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2Zm0-4h3a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2Z" />
      </svg>
    ),
  },
  {
    label: "About Me",
    href: "/admin/about-me",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4Z" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-14 items-center border-b border-slate-200 px-4">
        <Link
          href="/admin"
          className="text-sm font-bold uppercase tracking-[0.12em] text-slate-900"
        >
          Admin Panel
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-200 p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1ZM4 14a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1.09A7.001 7.001 0 0 1 4.07 14H4Zm10-4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
          </svg>
          View Site
        </Link>
      </div>
    </aside>
  );
}
