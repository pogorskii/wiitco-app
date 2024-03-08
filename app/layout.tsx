import type { Metadata } from "next";
import { firaSans } from "../components/ui/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { BackToTop } from "../components/ui/back-to-top";
import Header from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { SearchProvider } from "@/components/ui/search-module/search-context";
import { GlobalSearch } from "@/components/ui/search-module/global-search";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: {
    template: "%s | ReleaseNexus",
    default: "ReleaseNexus",
  },
  description: "Your personal movies and video games release dates calendar",
  metadataBase: new URL("https://releasenexus.vercel.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider>
        <body className={`${firaSans.className} `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen px-6 sm:px-10 lg:px-20">
              <BackToTop />
              <SearchProvider>
                <Header />
                <GlobalSearch />
              </SearchProvider>
              <main className="flex-grow pb-8">{children}</main>
            </div>
            <Footer />
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
