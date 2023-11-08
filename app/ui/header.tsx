import WIITCOLogo from "@/app/ui/wiitco-logo";
import NavLinks from "@/app/ui/nav-links";
import { LogInButton } from "./buttons";
import { ThemeToggle } from "./theme-toggle";

export default function SideNav() {
  return (
    <div className="py-2.5">
      <div className="flex justify-between">
        <WIITCOLogo />
        <div className="flex">
          <NavLinks />
        </div>
        <div className="flex gap-4">
          <ThemeToggle />
          <form>
            <LogInButton />
          </form>
        </div>
      </div>
    </div>
  );
}
