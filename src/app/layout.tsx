import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EEFCI School Management Dashboard",
  description: "School Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        {/* ✅ TYPE-SAFE WORKAROUND TO FIX TS ISSUE */}
        <MantineProvider
          {...({
            withGlobalStyles: true,
            withNormalizeCSS: true,
          } as React.ComponentProps<typeof MantineProvider>)}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
