import WIITCOLogo from "@/components/ui/wiitco-logo";
import { NavLinks } from "@/components/ui/nav-links";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { GlobalSearch } from "./search-module/global-search";

export default function Header() {
  return (
    <div className="relative z-40 py-2.5">
      <div className="flex justify-between">
        <WIITCOLogo />
        <div className="hidden sm:flex">
          <NavLinks />
        </div>
        <div className="hidden gap-4 sm:flex">
          <GlobalSearch placeholder="Search..." />
          <ThemeToggle />
          <form>
            <Button className="ms-2 rounded-none p-4 text-xl sm:m-0  sm:rounded-full sm:px-4 sm:py-2 sm:text-sm">
              {" "}
              <div>Log In</div>{" "}
            </Button>
          </form>
        </div>
        <div className="flex gap-4 sm:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
