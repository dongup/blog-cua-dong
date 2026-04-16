import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b border-slate-200 bg-white px-6">
          <p className="text-sm font-medium text-slate-500">Blog Admin</p>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
