"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400, 600], [0, 0, 1]);
  const translateY = useTransform(scrollY, [0, 600], [-8, 0]);

  return (
    <motion.header
      style={{ opacity, y: translateY }}
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10"
    >
      <Link href="#top" className="flex items-center gap-3" aria-label={siteConfig.name}>
        <Image
          src="/images/logo-mark.png"
          alt={siteConfig.name}
          width={22}
          height={39}
          className="h-8 w-auto"
        />
      </Link>
      <Link
        href="#reservation"
        className="font-en text-xs tracking-label text-ink/70 transition-colors hover:text-ink"
      >
        RESERVATION
      </Link>
    </motion.header>
  );
}
