import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export default function WIITCOLogo() {
  return (
    <Link href="/" className={`${GeistSans.className} flex gap-2 items-center`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        className="mx-auto"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="#3B82F6" />
        <path strokeWidth="2" stroke="#F97316" d="M12 12V8" />
        <path strokeWidth="2" stroke="#3B82F6" d="M12 12H16" />
        <line
          x1="12"
          y1="12"
          x2="18"
          y2="12"
          strokeWidth="2"
          stroke="#F97316"
        />
        <circle cx="12" cy="12" r="1" fill="#F97316" />
      </svg>
      <p className="text-2xl font-medium">WIITCO</p>
    </Link>
  );
}
