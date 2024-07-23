import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mood2Manga",
  description:
    "Discover the perfect manga for your mood! Our website helps you find manga tailored to your feelings, whether you're looking for something uplifting, thrilling, or heartwarming. Explore curated recommendations and dive into stories that match your emotions. Find your next favorite read today!",
  openGraph: {
    title: "Mood2Manga - Find the perfect manga for your mood",
    description: "Stop spending hours searching for manga to read. Let your emotions make the choice for you",
    url: "https://mood2manga.vercel.app",
    siteName: "Mood2Manga",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
