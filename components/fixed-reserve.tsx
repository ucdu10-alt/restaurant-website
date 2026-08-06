import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function FixedReserve() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6">
      <Button
        render={<a href={siteConfig.phoneHref} />}
        nativeButton={false}
        className="!h-auto w-full !rounded-none border-t border-wood/30 !bg-ink px-6 py-4 text-center font-en text-xs tracking-label !text-paper hover:!bg-ink/90 sm:w-auto sm:!rounded-[2px] sm:border sm:px-8 sm:py-3.5"
      >
        お電話でのご予約 — {siteConfig.phone}
      </Button>
    </div>
  );
}
