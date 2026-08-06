import Image from "next/image";

type PhotoInterludeProps = {
  src: string;
  alt: string;
  align?: "left" | "center" | "right";
  narrow?: boolean;
};

export function PhotoInterlude({ src, alt, align = "center", narrow = false }: PhotoInterludeProps) {
  const position =
    align === "left" ? "sm:mr-auto" : align === "right" ? "sm:ml-auto" : "sm:mx-auto";
  const width = narrow ? "sm:w-[46%]" : "sm:w-[86%]";

  return (
    <div className={`relative h-[62dvh] w-full sm:h-[82dvh] ${width} ${position}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`(max-width: 640px) 100vw, ${narrow ? "46vw" : "86vw"}`}
        className="object-cover"
      />
    </div>
  );
}
