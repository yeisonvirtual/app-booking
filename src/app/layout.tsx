import type { Metadata } from "next";
import "./globals.css";
import { Header } from '@/components/Header'
import { UserProvider } from "@/context/UserProvider";

export const metadata: Metadata = {
  title: "Booking app",
  description: "Owner Yeison Rojas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
        <p className="text-center text-gray-500 text-xs py-[20px]">
          &copy;2024 Yeison Rojas. All rights reserved.
        </p>
      </body>
    </html>
  );
}
