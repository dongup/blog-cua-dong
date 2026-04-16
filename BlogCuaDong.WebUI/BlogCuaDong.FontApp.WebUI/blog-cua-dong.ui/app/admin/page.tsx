const stats = [
  { label: "Total Posts", value: "6", change: "+2 this month" },
  { label: "Total Views", value: "1,240", change: "+18% vs last month" },
  { label: "Subscribers", value: "84", change: "+5 this week" },
  { label: "Avg. Read Time", value: "7.8 min", change: "Stable" },
];

const recentActivity = [
  {
    action: "Post published",
    detail: "Clean Architecture in .NET — A Practical Guide",
    time: "2 hours ago",
  },
  {
    action: "About Me updated",
    detail: "Profile and experience section edited",
    time: "1 day ago",
  },
  {
    action: "Post published",
    detail: "State Management Patterns with Zustand",
    time: "3 days ago",
  },
  {
    action: "Subscriber joined",
    detail: "New subscriber via blog RSS",
    time: "5 days ago",
  },
  {
    action: "Post published",
    detail: "Event-Driven Microservices with Azure Service Bus",
    time: "12 days ago",
  },
];

const quickLinks = [
  {
    label: "Edit About Me",
    href: "/admin/about-me",
    description: "Update profile, skills, contacts and experience",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back. Here&apos;s what&apos;s happening with your blog.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-slate-400">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* Recent activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Recent Activity
          </h2>
          <ul className="mt-4 divide-y divide-slate-100">
            {recentActivity.map((item, i) => (
              <li
                key={i}
                className="flex items-start justify-between gap-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-slate-800">{item.action}</p>
                  <p className="mt-0.5 text-slate-500">{item.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Quick Actions
          </h2>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex flex-col rounded-xl border border-slate-200 p-3 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <span className="text-sm font-medium text-slate-900">
                    {link.label}
                  </span>
                  <span className="mt-0.5 text-xs text-slate-500">
                    {link.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
