"use client";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import FAQChatbox from '@/components/FAQChatbox'
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/school-logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">EEFCI</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar onChatToggle={() => setIsChatOpen((prev) => !prev)}/>
        {children}
        <FAQChatbox isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      </div>
    </div>
  );
}
