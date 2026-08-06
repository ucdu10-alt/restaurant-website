import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 bg-paper-deep px-6 pb-14 pt-4 text-center">
      <Image
        src="/images/logo-mark.png"
        alt={siteConfig.name}
        width={16}
        height={28}
        className="h-6 w-auto opacity-70"
      />
      <p className="font-en text-[0.65rem] tracking-label text-stone">
        &copy; {new Date().getFullYear()} {siteConfig.nameEn}
      </p>
    </footer>
  );
}
