"use client";

import EasterEggConsole from "@/components/sections/easter-egg-console";
import MainStoryline from "@/components/sections/main-storyline";
import CommentsSidebar from "@/components/sections/comments-sidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col lg:flex-row lg:h-screen">
        {/* Left Column - Easter Egg Console */}
        <div className="lg:w-[350px] lg:flex-shrink-0 lg:h-screen lg:overflow-y-auto">
          <EasterEggConsole />
        </div>
        
        {/* Middle Column - Main Storyline */}
        <div className="flex-1 lg:h-screen lg:overflow-y-auto">
          <MainStoryline />
        </div>
        
        {/* Right Column - Homie Comments */}
        <div className="lg:w-[380px] lg:flex-shrink-0 lg:h-screen lg:overflow-y-auto">
          <CommentsSidebar />
        </div>
      </div>
    </div>
  );
}