import { cookies } from "next/headers";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import "@/app/globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en" className="h-full">
      <body className="h-full flex overflow-hidden">
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <main className="flex-1 flex flex-col bg-background overflow-hidden">
            <SidebarTrigger />
            <SidebarInset className="flex-1 overflow-y-auto w-full px-4">{children}</SidebarInset>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
