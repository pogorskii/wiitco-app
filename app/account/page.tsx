"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

export default function Page() {
  const { user, error, isLoading } = useUser();
  if (!user || error) redirect(`api/auth/login/`);

  if (isLoading) return <Spinner />;

  const updatedDate = user.updated_at ? new Date(user.updated_at) : null;

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account", active: true },
        ]}
      />
      <h1 className="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Account information
      </h1>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>
          <strong>Name:</strong> {user.name}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        {updatedDate && (
          <li>
            <strong>Account last updated at:</strong>{" "}
            {updatedDate.toDateString()}
          </li>
        )}
      </ul>
      <a
        className="flex h-10 w-fit items-center justify-center gap-2 self-start whitespace-nowrap rounded-lg bg-destructive px-4 py-2 text-lg font-semibold tracking-wider text-primary-foreground ring-offset-background transition-all hover:gap-4 hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        href="/api/auth/logout"
      >
        <span>Log Out</span>
      </a>
    </>
  );
}
