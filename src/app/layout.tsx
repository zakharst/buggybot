import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buggybot",
  description: "Slack → Azure DevOps bug automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-[15px] leading-relaxed">{children}</body>
    </html>
  );
}
