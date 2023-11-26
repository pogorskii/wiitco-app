import Header from "../ui/header";
import { BackToTop } from "../ui/back-to-top";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative px-6 sm:px-10 lg:px-20">
      <BackToTop />
      <Header />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
