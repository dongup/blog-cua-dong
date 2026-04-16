import AboutMeAdminForm from "./AboutMeAdminForm";

export const metadata = {
  title: "Admin | About Me",
};

export default function AboutMeAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit About Me</h1>
        <p className="mt-1 text-sm text-slate-500">
          Changes here update the public About Me page and are stored in
          MongoDB.
        </p>
      </div>
      <AboutMeAdminForm />
    </div>
  );
}
