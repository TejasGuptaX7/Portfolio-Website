"use client";

import { useState } from "react";
import { X } from "lucide-react";

const PatatapModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-full max-h-[95vh] bg-[#1a1a1a] flex flex-col overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="patatap-heading"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#aaa] hover:text-white transition-colors z-20"
          aria-label="Close"
        >
          <X size={28} />
        </button>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16">
          <header className="mb-12 text-center">
            <h1 id="patatap-heading" className="text-5xl md:text-7xl font-bold text-[#dddddd] tracking-tighter select-none">
              Patatap
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-[#aaaaaa] text-base md:text-lg leading-relaxed">
              Patatap is a portable animation and sound kit. With the touch of a finger create melodies charged with moving shapes. Warning: contains flashing images.
            </p>
          </header>

          <nav className="mb-16">
            <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm font-semibold uppercase tracking-widest">
              <li><a href="http://patatap.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline focus:underline outline-none">Patatap</a></li>
              <li><a href="http://typatone.com/" target="_blank" rel="noopener noreferrer" className="text-[#aaa] hover:text-white hover:underline focus:underline outline-none">Typatone</a></li>
              <li><a href="http://curaturae.com/" target="_blank" rel="noopener noreferrer" className="text-[#aaa] hover:text-white hover:underline focus:underline outline-none">Curaturae</a></li>
              <li><a href="mailto:inquiries@patatap.com" className="text-[#aaa] hover:text-white hover:underline focus:underline outline-none">Inquiries</a></li>
              <li><a href="https://www.jia.build/#" title="Support the creators of Patatap" className="text-[#aaa] hover:text-white hover:underline focus:underline outline-none">Merchandise</a></li>
            </ul>
          </nav>
          
          <div className="flex-1 min-h-[10vh]"></div>

        </div>

        <footer className="w-full text-center py-6 px-4 bg-black/20 mt-auto">
          <p className="text-sm text-[#aaaaaa] font-medium">Press any key, A to Z or spacebar, and turn up speakers</p>
          <div className="mt-3 relative w-full h-1 bg-gray-700 rounded-full overflow-hidden mx-auto max-w-xs">
            <div className="absolute top-0 left-0 h-full bg-white w-full"></div>
          </div>
          <div className="text-xs text-gray-500 mt-2 font-mono">26 / 26</div>
        </footer>
      </div>
    </div>
  );
};


const InteractiveExperiences = () => {
    const [showPatatap, setShowPatatap] = useState(false);
    const starsLink = "http://stars.chromeexperiments.com/";

    return (
        <>
            <div className="w-full my-12 md:my-16">
                <div className="text-center mb-6 md:mb-8">
                    <div className="flex items-center justify-center mb-2">
                        <div className="h-px flex-1 bg-border max-w-[96px]"></div>
                        <h3 className="text-text-primary mx-4">
                            interactive experiences
                        </h3>
                        <div className="h-px flex-1 bg-border max-w-[96px]"></div>
                    </div>
                    <p className="text-sm text-text-tertiary italic">i love interactive stuff, so enjoy these</p>
                </div>
                
                <div className="max-w-3xl mx-auto px-4">
                    <h4 className="font-[var(--font-serif-body)] font-semibold text-text-secondary text-xl mb-4 text-left">
                        interactive web experiences
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                            onClick={() => setShowPatatap(true)}
                            className="p-8 bg-background-tertiary/60 border border-border rounded-lg text-left hover:bg-background-tertiary/90 hover:border-text-tertiary transition-all duration-300 group"
                            aria-label="Open Patatap interactive experience"
                        >
                            <span className="font-[var(--font-serif-display)] text-3xl text-text-primary group-hover:text-text-secondary transition-colors italic">patatap</span>
                        </button>
                        <a 
                            href={starsLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-8 bg-background-tertiary/60 border border-border rounded-lg text-left hover:bg-background-tertiary/90 hover:border-text-tertiary transition-all duration-300 group"
                        >
                            <span className="font-[var(--font-serif-display)] text-3xl text-text-primary group-hover:text-text-secondary transition-colors italic">100,000 stars</span>
                        </a>
                    </div>
                </div>
            </div>

            {showPatatap && <PatatapModal onClose={() => setShowPatatap(false)} />}
        </>
    );
}

export default InteractiveExperiences;