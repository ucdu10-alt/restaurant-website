"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative h-[100dvh] w-full overflow-hidden bg-ink">
      <h1 className="sr-only">
        {siteConfig.name} — {siteConfig.description}
      </h1>

      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduce ? 1 : 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <Image
          src="/images/hero.jpg"
          alt="一花 カウンター席。麻の葉文様の行灯といけばな。"
          fill
          preload
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          initial={{ filter: reduce ? "blur(0px)" : "blur(18px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 2.6, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Image
            src="/images/logo-mark.png"
            alt={siteConfig.name}
            width={220}
            height={390}
            preload
            className="h-[22vh] w-auto max-h-[240px] [filter:brightness(0)_invert(1)_drop-shadow(0_6px_30px_rgba(0,0,0,0.45))]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
        className="absolute inset-x-0 bottom-10 flex justify-center sm:bottom-14"
      >
        <div className="h-14 w-px overflow-hidden">
          <motion.div
            className="h-full w-full bg-paper/70"
            initial={{ y: "-100%" }}
            animate={reduce ? { y: "0%" } : { y: ["-100%", "0%", "100%"] }}
            transition={{ duration: 2.6, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
