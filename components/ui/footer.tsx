import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export function Footer() {
  return (
    <footer className="grid sm:grid-cols-6 gap-8 p-10 bg-primary text-background">
      <div className="col-span-5 flex items-center">
        <p className="tracking-wide text-sm">
          Developed by{" "}
          <a
            className="font-semibold underline underline-offset-4"
            href="https://www.linkedin.com/in/pogorskii/"
          >
            Stanislav Pogorskii
          </a>{" "}
          &copy; 2023-2024
        </p>
      </div>
      <div className="col-span-1 flex sm:justify-end items-center gap-2">
        <a href="mailto:stanislav.pogorskii@gmail.com?subject=Let's work together">
          <MdAlternateEmail size={36} />
        </a>
        <a href="https://github.com/pogorskii">
          <FaGithubSquare size={36} />
        </a>
        <a href="https://www.linkedin.com/in/pogorskii/">
          <FaLinkedin size={36} />
        </a>
      </div>
    </footer>
  );
}
