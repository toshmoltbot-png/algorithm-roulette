import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Algorithm Roulette 🎰",
  description: "See what the other side sees. Spin the wheel, land in someone else's algorithm.",
  openGraph: {
    title: "Algorithm Roulette 🎰",
    description: "See what the other side sees.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
