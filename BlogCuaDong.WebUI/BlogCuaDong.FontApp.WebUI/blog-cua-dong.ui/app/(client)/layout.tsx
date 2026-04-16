import Navbar from "../components/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="client-bg min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
}
