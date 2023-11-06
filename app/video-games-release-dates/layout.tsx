import Header from "@/app/ui/header";
import { SectionNav } from "@/app/ui/video-games/section-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Games",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-20">
      <Header />
      <SectionNav />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
