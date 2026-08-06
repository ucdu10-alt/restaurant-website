import { Hero } from "@/components/hero";
import { Concept } from "@/components/concept";
import { About } from "@/components/about";
import { Course } from "@/components/course";
import { Reservation } from "@/components/reservation";
import { Footer } from "@/components/footer";
import { PhotoInterlude } from "@/components/photo-interlude";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Concept />

      <Reveal>
        <PhotoInterlude src="/images/interlude-incense.jpg" alt="古伊万里の香炉から立ちのぼる香" />
      </Reveal>

      <About />

      <Reveal>
        <PhotoInterlude
          src="/images/interlude-chef.jpg"
          alt="一花の店主。誂えた白衣に一花の文字。"
          align="right"
          narrow
        />
      </Reveal>

      <Course />

      <Reveal>
        <PhotoInterlude src="/images/closing-counter.jpg" alt="麻の葉文様の行灯とカウンター" align="left" />
      </Reveal>

      <Reservation />
      <Footer />
    </>
  );
}
