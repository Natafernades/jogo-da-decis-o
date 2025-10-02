"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PreResultsPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const adBanner = useMemo(() => PlaceHolderImages.find(img => img.id === 'paid-ad-banner'), []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/results");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  if (!adBanner) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center p-4">
      <Card className="w-full max-w-4xl text-center shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-4xl font-headline">Propaganda Remunerada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src={adBanner.imageUrl}
                  alt={adBanner.description}
                  width={728}
                  height={90}
                  data-ai-hint={adBanner.imageHint}
                  className="rounded-lg w-full h-auto"
                />
              </a>
          </div>
          <p className="text-lg text-muted-foreground">
            Você será redirecionado para os resultados em...
          </p>
          <p className="text-6xl font-bold text-primary">{countdown}</p>
        </CardContent>
      </Card>
    </div>
  );
}
