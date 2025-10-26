"use client";

import React from "react";
import Image from "next/image";
import {
  Sun,
  Moon,
  Printer,
  Search,
  ChevronDown,
  Minus,
  Plus,
  Bold,
  Image as ImageIcon,
  Ellipsis,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PortfolioDocumentProps {
  children: React.ReactNode;
  className?: string;
}

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary">
    <path
      fill="currentColor"
      d="M14 2H6C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
      opacity="0.3"
    ></path>
    <path fill="currentColor" d="M13 9V4l5 5h-5z"></path>
  </svg>
);

const PortfolioDocument = ({ children, className }: PortfolioDocumentProps) => {
  return (
    <div
      className={cn(
        "bg-card rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] overflow-hidden w-full",
        className
      )}
    >
      <header>
        <div className="border-b border-border bg-card/50">
          <div className="flex items-center px-4 py-2">
            <div className="flex items-center gap-2 flex-shrink min-w-0">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                <DocumentIcon />
              </div>
              <div className="truncate">
                <h1 className="text-lg font-serif text-text-document-header truncate">
                  jia (audrey) chen's portfolio
                </h1>
                <div className="flex text-xs text-muted-foreground space-x-4 mt-0.5">
                  <span>intuition</span>
                  <span>ambition</span>
                  <span>depth</span>
                  <span>curiosity</span>
                  <span>persistence</span>
                </div>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-1 md:gap-2 shrink-0">
              <Button variant="ghost" size="icon" className="h-5 w-5 md:h-8 md:w-8" aria-label="Switch theme">
                <Sun className="h-3 w-3 md:h-4 md:w-4 transition-all duration-300 rotate-0 scale-100" />
                <Moon className="absolute h-3 w-3 md:h-4 md:w-4 transition-all duration-300 rotate-90 scale-0" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex h-5 w-5 md:h-8 md:w-8" aria-label="Print page">
                <Printer className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button className="hidden md:flex h-8 px-4 text-sm rounded-full bg-primary/10 hover:bg-primary/20 text-primary">
                Share
              </Button>
              <Avatar className="hidden md:flex h-5 w-5 md:h-8 md:w-8 border border-border">
                <AvatarImage src="/placeholder-user.jpg" alt="Jia Chen" />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex items-center px-2 md:px-4 py-0.5 md:py-1 border-t border-border bg-card/30 overflow-x-auto">
          <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
            <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8" aria-label="Search">
              <Search className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <div className="flex items-center border border-border rounded px-1 md:px-2 py-0.5 md:py-1">
              <span className="text-xs md:text-sm">100%</span>
            </div>
            <Button
              className="py-2 flex items-center gap-0.5 md:gap-1 px-1 md:px-2 h-6 md:h-8 border border-primary/40 shadow-[0_0_8px_2px_rgba(255,255,255,0.3)] hover:shadow-[0_0_12px_3px_rgba(255,255,255,0.4)] transition-shadow text-xs md:text-sm"
            >
              <span className="font-serif">home</span>
              <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <div className="flex items-center gap-0.5 md:gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8" aria-label="Decrease age">
                <Minus className="h-2.5 w-2.5 md:h-3 md:w-3" />
              </Button>
              <div className="flex items-center border border-border rounded px-1 md:px-2 py-0.5 md:py-1">
                <span className="text-xs md:text-sm whitespace-nowrap">21 years old</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8" aria-label="Increase age">
                <Plus className="h-2.5 w-2.5 md:h-3 md:w-3" />
              </Button>
            </div>
             <div className="flex items-center gap-0.5 md:gap-1">
               <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8" aria-label="Bold">
                  <Bold className="h-3 w-3 md:h-4 md:w-4"/>
               </Button>
               <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8" aria-label="Add image">
                  <ImageIcon className="h-3 w-3 md:h-4 md:w-4"/>
               </Button>
             </div>
          </div>
          
          <div className="ml-auto flex-shrink-0">
            <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8" aria-label="More options">
              <Ellipsis className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="py-8 px-4 sm:px-10 md:px-16 max-w-[750px] mx-auto">
          <div className="flex justify-center mb-6">
            <a
              href="https://www.linkedin.com/posts/audrey-chen-tech_hey-im-jia-new-portfolio-jiabuild-activity-7348049682058645504-BEFU?utm_source=share&utm_medium=member_desktop&rcm=ACoAADo4NAUBSF1D1ViTTCJ7XZKBF4rcTW22goQ"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-full text-sm font-medium transition-all duration-300 shadow-[0_0_15px_rgba(139,111,71,0.5)] hover:shadow-[0_0_25px_rgba(139,111,71,0.7)] text-text-secondary"
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
          {children}
        </div>
      </main>
    </div>
  );
};

export default PortfolioDocument;