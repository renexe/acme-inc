import { Button } from "@/components/helpers/mt-exporter";
import Carousel from "@/components/ui/carousel/Carousel";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 flex gap-8">
      <div className="my-auto">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Descubra a experiência</span>{' '}
          <span className="block text-indigo-400 xl:inline">Acme</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Estamos sempre um passo à frente do mercado quando se trata de tecnologia e design.
        </p>

        <Button variant="outlined" color="white" className="mt-8" size="lg"> Saiba mais </Button>
      </div>
      <Carousel />
    </div>
  );
};

Hero.displayName = 'Hero';

export default Hero;