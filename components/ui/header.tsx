import WIITCOLogo from "@/components/ui/wiitco-logo";
import { NavLinks } from "@/components/ui/nav-links";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { GlobalSearch } from "./global-search";

export default function Header() {
  return (
    <div className="relative z-40 py-2.5">
      <div className="flex justify-between">
        <WIITCOLogo />
        <div className="hidden sm:flex">
          <NavLinks />
        </div>
        <div className="hidden sm:flex gap-4">
          <GlobalSearch placeholder="Search..." />
          <ThemeToggle />
          <form>
            <Button className="ms-2 sm:m-0 p-4 sm:px-4 sm:py-2  text-xl sm:text-sm rounded-none sm:rounded-full">
              {" "}
              <div>Log In</div>{" "}
            </Button>
          </form>
        </div>
        <div className="sm:hidden flex gap-4">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}