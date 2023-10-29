import CallToActionButton from "./CallToAction";

const ContentBlock = () => {

  return (
    <div className="my-auto w-full py-10 px-4 z-10 before:absolute before:bottom-0 before:right-0 before:top-0 before:-left-4 before:backdrop-blur-md before:w-[calc(100vw+16px)] before:bg-black/50 before:-z-10 relative">
      <div className="sm:flex sm:justify-center sm:flex-col sm:items-center">
        <div className="max-w-[65vw] sm:max-w-none sm:text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Descubra a experiência</span>{' '}
            <span className="block text-indigo-400 xl:inline">Acme</span>
          </h1>
          <p className="mt-3 text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl">
            Estamos sempre um passo à frente do mercado quando se trata de tecnologia e design.
          </p>
        </div>

        <CallToActionButton />
      </div>
    </div>
  );
}

ContentBlock.displayName = "ContentBlock";

export default ContentBlock;