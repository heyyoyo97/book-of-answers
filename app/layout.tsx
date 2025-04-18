import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "答案之书",
  description: "一本神奇的书，为你解答困惑",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
