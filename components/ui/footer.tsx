import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Separator } from "./separator";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary px-6 py-10 text-primary-foreground sm:px-20">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-3xl font-medium">WIITCO</p>
        <div className="flex gap-4">
          <Link className="font-semibold" href="/">
            Home
          </Link>
          <Link className="font-semibold" href="/about">
            About
          </Link>
          <Link className="font-semibold" href="/account">
            Account
          </Link>
        </div>
      </div>
      <Separator className="mb-4 mt-8" />
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center">
          <p className="text-sm tracking-wider">
            Developed by{" "}
            <a
              className="font-semibold underline underline-offset-4"
              href="https://www.linkedin.com/in/pogorskii/"
              target="_blank"
            >
              Stanislav Pogorskii
            </a>{" "}
            &copy; 2023-2024
          </p>
        </div>
        <div className="col-span-1 flex items-center gap-2 sm:justify-end">
          <a href="mailto:stanislav.pogorskii@gmail.com?subject=Let's work together">
            <MdAlternateEmail size={36} />
          </a>
          <a href="https://github.com/pogorskii" target="_blank">
            <FaGithubSquare size={36} />
          </a>
          <a href="https://www.linkedin.com/in/pogorskii/" target="_blank">
            <FaLinkedin size={36} />
          </a>
        </div>
      </div>
    </footer>
  );
}
