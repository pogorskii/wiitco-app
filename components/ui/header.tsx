import WIITCOLogo from "@/components/ui/wiitco-logo";
import { NavLinks } from "@/components/ui/nav-links";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { GlobalSearch } from "./search-module/global-search";
import { GlobalSearchLink } from "./search-module/global-search-link";
import UserInfo from "./user-info";

export default function Header() {
  return (
    <div className="relative z-40 flex justify-between py-2.5">
      <WIITCOLogo />
      <div className="hidden sm:flex">
        <NavLinks />
      </div>
      <div className="hidden gap-4 sm:flex">
        <GlobalSearchLink />
        <ThemeToggle />
        <UserInfo />
      </div>
      <div className="flex gap-4 sm:hidden">
        <GlobalSearchLink />
        <ThemeToggle />
        <MobileMenu />
      </div>
    </div>
  );
}
