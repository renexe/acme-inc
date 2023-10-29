'use client';

import { Carousel as CarouselMT } from "@/components/helpers/mt-exporter";
import { carouselItems } from "@/mock/carousel-items";
import Image from "next/image";

const Carousel = () => {
  return (
    <CarouselMT className="rounded-xl" autoplay loop>
      {carouselItems.map((item, index) => (
        <div className="relative w-full h-[500px]">
          <Image
            src={item.src}
            alt={item.alt}
            key={index}
            objectFit="cover"
            layout="fill"
          />
        </div>
      ))}
    </CarouselMT>
  );
}

Carousel.displayName = "Carousel";

export default Carousel;