import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth-server";
import AdminDashboardClient from "@/app/admin/AdminDashboardClient";

export default async function AdminPage() {
  const user = await getServerUser();

  if (!user) {
    redirect(`/auth/signin?returnTo=${encodeURIComponent("/admin")}`);
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return <AdminDashboardClient />;
}
