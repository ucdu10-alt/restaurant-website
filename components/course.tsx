import { Reveal } from "@/components/reveal";

export function Course() {
  return (
    <section className="bg-paper-deep px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="font-en tracking-label text-xs text-wood">Course</p>

        <p className="mt-8 font-serif text-lg leading-[2.3] text-ink sm:text-xl">
          お祝いなど、ハレの日に。
          <br />
          少し贅沢をしたい、何気ない夜に。
        </p>

        <div className="mt-14 space-y-8">
          <div>
            <p className="font-serif text-base text-ink sm:text-lg">おまかせコース</p>
            <p className="mt-2 font-en text-lg tracking-wide text-wood">
              6,600<span className="text-xs text-stone">円 ／ 税込</span>
            </p>
          </div>
          <div className="h-px w-10 bg-hairline mx-auto" />
          <div>
            <p className="font-serif text-base text-ink sm:text-lg">特選おまかせコース</p>
            <p className="mt-2 font-en text-lg tracking-wide text-wood">
              8,800<span className="text-xs text-stone">円 ／ 税込</span>
            </p>
          </div>
        </div>

        <p className="mt-14 font-sans text-xs leading-loose text-stone">
          アラカルトのご用意もございます。
          <br />
          お好みに合わせて、その日の一皿をどうぞ。
        </p>
      </Reveal>
    </section>
  );
}
