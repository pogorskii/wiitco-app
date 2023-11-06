import { GeistSans } from "geist/font";
import Link from "next/link";

export default function WIITCOLogo() {
  return (
    <Link href="/" className={`${GeistSans.className}`}>
      <p className="text-4xl font-medium">WIITCO</p>
    </Link>
  );
}
