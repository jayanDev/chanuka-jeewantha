import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth-server";

export async function requireAdminPage(pathname: string) {
  const user = await getServerUser();

  if (!user) {
    redirect(`/auth/signin?returnTo=${encodeURIComponent(pathname)}`);
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return user;
}
