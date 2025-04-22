"use client";

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar (Left) */}
        <div className="w-[240px] bg-[#2D3748] flex-shrink-0">
          <Menu />
        </div>

        {/* Main Content (Right) */}
        <div className="flex flex-col flex-1 bg-[#F7F8FA] overflow-y-auto">
          <Navbar />
          <main className="p-4 flex-1">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
