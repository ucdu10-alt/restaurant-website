import { Reveal } from "@/components/reveal";

export function Concept() {
  return (
    <section className="flex min-h-[70dvh] items-center justify-center px-6 py-28 sm:py-36">
      <Reveal className="max-w-xl text-center">
        <p className="font-en tracking-label text-xs text-wood">Concept</p>
        <p className="mt-8 font-serif text-[1.35rem] leading-[2.4] text-ink sm:text-2xl sm:leading-[2.3]">
          静けさの中に、
          <br />
          美しさがある。
          <br />
          派手さではなく、余白と光で。
        </p>
      </Reveal>
    </section>
  );
}
