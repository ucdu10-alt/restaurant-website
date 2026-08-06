import { Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Map } from "@/components/map";
import { siteConfig } from "@/lib/site-config";

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Reservation() {
  return (
    <section
      id="reservation"
      className="flex min-h-[80dvh] flex-col items-center justify-center bg-paper-deep px-6 py-32 text-center sm:py-40"
    >
      <Reveal>
        <p className="font-en tracking-label text-xs text-wood">Reservation</p>

        <p className="mt-8 font-serif text-lg leading-[2.2] text-ink sm:text-xl">
          ご予約はお電話にて承っております。
        </p>

        <div className="mt-10">
          <Button
            render={<a href={siteConfig.phoneHref} />}
            nativeButton={false}
            size="lg"
            className="!h-auto !rounded-[2px] !bg-ink px-10 py-4 font-en text-sm tracking-label !text-paper hover:!bg-ink/90"
          >
            <Phone className="!size-3.5" />
            {siteConfig.phone}
          </Button>
        </div>

        <p className="mt-5 font-sans text-xs text-stone">
          お問い合わせ可能時間　{siteConfig.phoneHours}
        </p>

        <a
          href={siteConfig.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 font-en text-xs tracking-label text-stone transition-colors hover:text-ink"
        >
          <InstagramGlyph />
          {siteConfig.instagram.handle}
        </a>

        <div className="mt-16 space-y-1.5 font-sans text-xs leading-loose text-stone">
          <p>{siteConfig.address}</p>
          <p>
            {siteConfig.hours} ／ {siteConfig.closed}
          </p>
        </div>

        <Map />
      </Reveal>
    </section>
  );
}
