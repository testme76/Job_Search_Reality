import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Search Reality - Anonymous Job Market Data",
  description: "See real job search statistics from 100+ candidates. Applications, interviews, offers, and response rates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
