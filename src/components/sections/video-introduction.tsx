import React from 'react';

const VideoIntroduction = () => {
  // The primary color from the theme is a brown (#8B6F47).
  // The shadow effect on the badge uses its RGB value.
  const primaryRgb = "139, 111, 71";

  return (
    <div className="font-serif space-y-6 max-w-[750px] mx-auto text-xs md:text-base">
      <div className="pl-8 md:pl-0 pr-8 md:pr-0 my-6">
        <div className="flex justify-center mb-3">
          <a
            href="https://www.linkedin.com/posts/audrey-chen-tech_hey-im-jia-new-portfolio-jiabuild-activity-7348049682058645504-BEFU?utm_source=share&utm_medium=member_desktop&rcm=ACoAADo4NAUBSF1D1ViTTCJ7XZKBF4rcTW22goQ"
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm font-medium transition-all duration-300 text-secondary-foreground border border-primary/40 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.7)]"
            style={{ '--primary-rgb': primaryRgb } as React.CSSProperties}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative">
              <span className="absolute inset-0 blur-sm bg-primary/50 rounded-full"></span>
              <span className="relative">✨</span>
            </span>
            100k views everywhere
          </a>
        </div>
        <div className="bg-card/30 border border-border rounded-lg p-4">
          <div className="w-full aspect-video rounded-md overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/TtV1t5kgmeM?autoplay=1&mute=1"
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="i’m jia, nice to meet u"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground pl-8 md:pl-0">
        October 15, 2025
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-2xl font-serif pl-8 md:pl-0">
          welcome to jia's portfolio
        </h2>
        <div className="ml-2 mr-8 md:ml-auto md:mr-0">
          <button className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3E2723] text-[#F5E6D3] flex items-center justify-center font-serif text-sm">
            AC.
          </button>
        </div>
      </div>
      
      <p className="leading-relaxed pl-8 md:pl-0 pr-8 md:pr-0 text-foreground">
        welcome to my digital portfolio. here you can chat with jia's cat, my ai assistant.
      </p>
    </div>
  );
};

export default VideoIntroduction;