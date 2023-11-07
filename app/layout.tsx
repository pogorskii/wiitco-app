import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WIITCO",
  description: "Your personal movies and video games release dates calendar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
