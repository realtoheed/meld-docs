import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meld | Private collaborative documents",
  description: "A self-hosted, real-time collaborative document workspace.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
