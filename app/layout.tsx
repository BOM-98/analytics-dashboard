// app/auth/layout.tsx
import { ReactNode } from "react";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/providers/Provider";

export const metadata = {
  title: "Auth Pages",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
