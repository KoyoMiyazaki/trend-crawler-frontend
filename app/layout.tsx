import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const fontNotoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trend Crawler",
    template: "%s | Trend Crawler",
  },
  description:
    "A web application to track and analyze trends across various platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${fontNotoSansJP.className} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
