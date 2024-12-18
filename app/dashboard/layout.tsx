import { cookies } from "next/headers";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import "@/app/globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // Redirect to login if not authenticated
  }

  // Extract user details from session (if any)
  const user = {
    name: session?.user?.name || null,
    email: session?.user?.email || null,
    avatar: "/avatars/shadcn.jpg", // or dynamically if you have it
  };

  const teams = {
    name: session?.user?.company || null,
    logo: session?.user?.logo || null,
    plan: session?.user?.plan || null,
  };

  return (
    <div lang="en" className="h-full">
      <div className="h-full flex overflow-hidden">
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar user={user} teams={teams} />
          <main className="flex-1 flex flex-col bg-background overflow-hidden">
            <SidebarTrigger />
            <SidebarInset className="flex-1 overflow-y-auto w-full px-4">{children}</SidebarInset>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
