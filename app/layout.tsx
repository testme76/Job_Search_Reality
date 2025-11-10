import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Job Search Reality - Anonymous Job Market Data",
  description: "See real job search statistics from 110+ software engineering candidates. Explore applications, response rates, interviews, and offers with interactive filtering by major, GPA, sponsorship status, and more.",
  keywords: ["job search", "software engineering", "tech recruiting", "job market data", "interview statistics", "cs careers", "new grad jobs"],
  authors: [{ name: "Job Search Reality" }],
  openGraph: {
    title: "Job Search Reality - Anonymous Job Market Data",
    description: "Real job search statistics from 110+ software engineering candidates. You're not alone in this brutal market.",
    type: "website",
    locale: "en_US",
    siteName: "Job Search Reality",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Search Reality - Anonymous Job Market Data",
    description: "Real job search statistics from 110+ software engineering candidates. You're not alone in this brutal market.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
