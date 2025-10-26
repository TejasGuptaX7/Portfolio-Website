import Image from "next/image";

const DigitalIdentitySection = () => {
  return (
    <div className="w-full my-6 md:my-12">
      <div className="flex items-center justify-center mb-4 md:mb-6">
        <div className="h-px w-8 md:w-16 bg-border mr-2 md:mr-3" />
        <h3 className="text-[10px] md:text-lg font-bold text-foreground font-serif italic whitespace-nowrap">
          digital identity
        </h3>
        <div className="h-px w-8 md:w-16 bg-border ml-2 md:ml-3" />
      </div>

      <p className="font-serif italic text-sm md:text-base text-center max-w-lg mx-auto leading-relaxed text-foreground/90 px-4">
        i've been hiding away in twin peaks, but i hope you liked this digital
        space i made haha
      </p>

      <div className="mt-6 md:mt-8 px-8 md:px-0">
        <figure className="max-w-[750px] mx-auto">
          <div className="bg-card/30 border border-border rounded-lg p-2 md:p-4">
            <div className="rounded-md overflow-hidden">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d5e082db-ba69-42ed-842b-52c6ebe36e8e-jia-build/assets/images/zine-1.jpg?"
                alt="My real drawings"
                width={750}
                height={750}
                className="w-full h-auto"
              />
            </div>
          </div>
          <figcaption className="text-center text-sm text-muted-foreground mt-2 md:mt-3">
            my real drawings lol
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default DigitalIdentitySection;