'use client';

import { Carousel as CarouselMT } from "@/components/helpers/mt-exporter";
import { carouselItems } from "@/mock/carousel-items";
import Image from "next/image";

const Carousel = () => {
  return (
    <CarouselMT className="absolute -top-16 left-0" autoplay loop >
      {carouselItems.map((item, index) => (
        <div className="relative w-full h-[calc(100vh)] md:h-full" key={index}>
          <Image
            src={item.src}
            alt={item.alt}
            key={index}
            fill
            className="object-cover object-center"
          />
        </div>
      ))}
    </CarouselMT>
  );
}

Carousel.displayName = "Carousel";

export default Carousel;