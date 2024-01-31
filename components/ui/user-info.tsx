import { Claims, getSession } from "@auth0/nextjs-auth0";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, Settings, User, Calendar } from "lucide-react";

export default async function ProfileClient() {
  const session = await getSession();
  if (!session) return <LoginLink />;
  const { user } = session;

  return <UserDropdownMenu user={user} />;
}

export function UserDropdownMenu({ user }: { user: Claims }) {
  const { picture, name, sub } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <Avatar>
            <AvatarImage src={picture || undefined} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <ChevronDown
            className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Hello, {name}.</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>My calendar</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/api/auth/logout" className="flex w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LoginLink() {
  return (
    <a
      className="ms-2 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-none bg-primary p-4 text-xl font-semibold tracking-wider text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:m-0 sm:rounded-full sm:px-4 sm:py-2 sm:text-sm"
      href="/api/auth/login"
    >
      Log In
    </a>
  );
}
