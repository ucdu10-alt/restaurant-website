import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section className="px-6 py-28 sm:py-40">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-14 sm:flex-row sm:items-center sm:gap-20">
        <Reveal className="relative order-2 h-[52dvh] w-full sm:order-1 sm:h-[64dvh] sm:w-[42%]">
          <div className="relative h-full w-full">
            <Image
              src="/images/about.jpg"
              alt="流木のいけばなと竹の鳥かご"
              fill
              sizes="(max-width: 640px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="order-1 sm:order-2 sm:w-[52%]">
          <p className="font-en tracking-label text-xs text-wood">About</p>
          <p className="mt-8 font-serif text-lg leading-[2.3] text-ink sm:text-xl sm:leading-[2.3]">
            鹿児島・天文館。
            <br />
            雑居ビルの二階、暖簾の向こうに一花はあります。
            <br />
            旬の食材と、季節の設え。
            <br />
            静かにもてなす、小さな店です。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
