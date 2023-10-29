import Carousel from "@/components/ui/hero/Carousel";
import ContentBlock from "./ContentBlock";

const Hero = () => {
  return (
    <div className="min-h-screen md:min-h-screen w-full relative">
      <div className="flex flex-col items-center h-[calc(100vh-70px)]">
        <ContentBlock />
      </div>
      <Carousel />
    </div>
  );
};

Hero.displayName = 'Hero';

export default Hero;