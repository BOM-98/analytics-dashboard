// app/auth/layout.tsx
import { ReactNode } from "react";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/providers/provider";
import { ArrowRight, ArrowUpRight, Edit2, Globe, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Auth Pages",
};

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  if (!session) {
    redirect("/signup"); // Redirect to signup if not authenticated
  }

  // Extract user details from session (if any)
  const user = {
    name: session?.user?.name || null,
    email: session?.user?.email || null,
    avatar: "/avatars/shadcn.jpg", // or dynamically if you have it
  };

  const teams = {
    name: session?.user?.company || undefined,
    logo: null,
    plan: session?.user?.plan || undefined,
  };
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <Provider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar user={user} teams={teams} />
            <main className="flex-1 flex flex-col bg-background overflow-hidden">
              <SidebarTrigger />
              <SidebarInset className="flex-1 overflow-y-auto w-full px-4">{children}</SidebarInset>
            </main>
          </SidebarProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
