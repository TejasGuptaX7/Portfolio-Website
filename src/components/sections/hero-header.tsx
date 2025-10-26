import React from 'react';

const StarIcon = ({ size, className }: { size: number; className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#F5E6D3] filter drop-shadow-[0_0_2px_rgba(160,120,90,0.8)]"
    >
      <path d="M12 0L15.09 8.91L24 12L15.09 15.09L12 24L8.91 15.09L0 12L8.91 8.91L12 0Z" />
    </svg>
  </div>
);

const HeroHeader = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-background overflow-hidden p-8">
      {/* Decorative Background Elements */}
      <div className="absolute -top-32 -right-32 w-80 h-80 md:w-96 md:h-96 bg-background-tertiary/70 rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-background-tertiary/70 rounded-full" />

      {/* Decorative Plant Illustrations */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 opacity-80">
        <div className="w-full h-full bg-accent-green-dark rounded-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-64 md:w-40 md:h-80 opacity-80">
        <div className="absolute bottom-0 right-10 w-1.5 h-32 md:h-40 bg-accent-green-light rounded-t-lg" />
        <div className="absolute bottom-28 md:bottom-36 right-8 w-6 h-6 md:w-8 md:h-8 bg-accent-green-light rounded-full" />
        <div className="absolute bottom-0 right-2 w-1 h-24 md:h-32 bg-accent-green-light rounded-t-lg transform rotate-[20deg]" />
        <div className="absolute bottom-20 md:bottom-28 -right-1 w-5 h-5 md:w-6 md:h-6 bg-accent-green-light rounded-full transform rotate-[20deg]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <h1 className="font-serif-display italic text-primary">
          <div className="flex flex-col md:flex-row items-center justify-center md:gap-x-12 gap-y-4">
            <span className="text-[48px] lg:text-[72px] leading-none tracking-tighter">
              jia chen
            </span>
            <div className="relative mt-2 md:mt-0">
              <StarIcon size={32} className="absolute -top-8 -left-4" />
              <StarIcon size={24} className="absolute -top-4 -right-10" />
              <StarIcon size={28} className="absolute top-10 -left-8" />
              <span className="text-[30px] lg:text-[40px] leading-none tracking-normal">
                creative technologist
              </span>
            </div>
          </div>
        </h1>
      </div>
    </section>
  );
};

export default HeroHeader;