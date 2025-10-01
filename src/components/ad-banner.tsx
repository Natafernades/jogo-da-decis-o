import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "./ui/card";

export function AdBanner() {
  const adImage = PlaceHolderImages.find((img) => img.id === "ad-banner-1");

  if (!adImage) return null;

  return (
    <Card className="w-full h-[90px] flex items-center justify-center overflow-hidden p-0">
      <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Advertisement">
        <Image
          src={adImage.imageUrl}
          alt={adImage.description}
          width={728}
          height={90}
          className="object-cover w-full h-full"
          data-ai-hint={adImage.imageHint}
        />
      </a>
    </Card>
  );
}
