import { siteConfig } from "@/lib/site-config";

export function Map() {
  const query = encodeURIComponent(siteConfig.address);

  return (
    <div className="mx-auto mt-12 h-[280px] w-full max-w-xl overflow-hidden border border-hairline sm:h-[340px]">
      <iframe
        title={`${siteConfig.name} 地図`}
        src={`https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full grayscale-[55%] sepia-[12%] saturate-[65%] contrast-[105%] brightness-[103%]"
        style={{ border: 0 }}
      />
    </div>
  );
}
