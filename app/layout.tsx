import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/ui/theme-provider";
import { ReduxProvider } from "@/redux/provider";
import { BackToTop } from "./ui/back-to-top";
import Header from "./ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | WIITCO",
    default: "When Is It Coming Out?",
  },
  description: "Your personal movies and video games release dates calendar",
  metadataBase: new URL("https://wiitco.vercel.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} `}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative px-6 sm:px-10 lg:px-20">
              <BackToTop />
              <Header />
              <div className="flex-grow">{children}</div>
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
