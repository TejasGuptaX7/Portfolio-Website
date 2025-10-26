import React from 'react';

const SpotifyPlayer = () => {
  return (
    <div className="w-full my-12 md:my-16">
      {/* Section Heading */}
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center mb-2 md:mb-3">
          <div className="h-px w-8 md:w-20 bg-border mr-2 md:mr-4"></div>
          <h3 className="text-lg md:text-2xl font-bold text-text-primary font-serif-body italic">
            favorite songs
          </h3>
          <div className="h-px w-8 md:w-20 bg-border ml-2 md:ml-4"></div>
        </div>
        <p className="text-xs md:text-sm text-text-tertiary max-w-md mx-auto italic">
          music i like right now. i'll add more later.
        </p>
      </div>

      {/* Spotify Embed Section */}
      <div className="max-w-md mx-auto px-8 sm:px-0">
        <h4 className="font-serif-body font-semibold text-lg text-text-secondary mb-4">
          currently on repeat
        </h4>
        <div className="bg-background-tertiary/50 border border-border rounded-xl p-3 shadow-sm">
          <iframe
            className="rounded-lg w-full"
            src="https://open.spotify.com/embed/track/7fFGiFc2UkTbyLxwM5bgLM?utm_source=generator&theme=0"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Embed: LA in Two (ft. Valley)"
          ></iframe>
        </div>
        <p className="text-sm text-text-tertiary italic mt-4 text-center">
          "LA in Two" by E, ELIO, Valley - u should listen to the orchestral version too
        </p>
      </div>
    </div>
  );
};

export default SpotifyPlayer;