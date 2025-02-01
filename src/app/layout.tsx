'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { usePathname } from "next/navigation";
import { ProvideAuth } from "@/hooks/use-auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {pathname.startsWith('/login') || pathname.startsWith('/signup') ? (
          <>
            {children}
          </>
        ) :
          <ProvideAuth>
            <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger />
              {children}
            </SidebarProvider>
          </ProvideAuth>
        }
      </body>
    </html>
  );
}
