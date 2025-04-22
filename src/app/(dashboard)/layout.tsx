"use client";

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="h-screen flex">
        {/* LEFT SIDEBAR */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-gray-900 text-white">
          <Menu />
        </div>

        {/* MAIN CONTENT */}
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
          <Navbar />
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
