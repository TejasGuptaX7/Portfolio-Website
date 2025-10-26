import Image from "next/image";
import { Trophy } from "lucide-react";

const AchievementCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`absolute p-0.5 md:p-2 rounded-md border border-border/40 bg-background/90 backdrop-blur-sm shadow-md z-30 ${className}`}
    >
      <div className="relative">
        <div className="absolute top-0 left-0 w-1 h-1 md:w-2 md:h-2 border-t border-l border-border/60"></div>
        <div className="absolute top-0 right-0 w-1 h-1 md:w-2 md:h-2 border-t border-r border-border/60"></div>
        <div className="absolute bottom-0 left-0 w-1 h-1 md:w-2 md:h-2 border-b border-l border-border/60"></div>
        <div className="absolute bottom-0 right-0 w-1 h-1 md:w-2 md:h-2 border-b border-r border-border/60"></div>
        <div className="px-0.5 md:px-1 py-0.5 md:py-1">{children}</div>
      </div>
    </div>
  );
};

export default function AchievementsGrid() {
  return (
    <div className="w-full my-4 md:my-6">
      <div className="text-center mb-1 md:mb-4">
        <div className="flex items-center justify-center mb-0.5 md:mb-2">
          <div className="h-px w-6 md:w-20 bg-border/40 mr-1 md:mr-4"></div>
          <h2 className="text-[10px] md:text-xl font-bold font-serif italic text-text-primary">
            mappamundi
          </h2>
          <div className="h-px w-6 md:w-20 bg-border/40 ml-1 md:ml-4"></div>
        </div>
        <p className="text-[7px] md:text-sm text-muted-foreground max-w-[140px] md:max-w-md mx-auto mt-0.5 md:mt-1 italic">
          a celestial cartography of achievements and connections
        </p>
      </div>

      <div className="relative h-[200px] md:h-[400px] w-[90%] max-w-[240px] md:max-w-full rounded-lg border border-border/70 bg-card/10 mx-auto">
        <div className="absolute top-2 left-2 w-6 h-6 md:w-8 md:h-8 border-t border-l border-border/30 rounded-tl-sm"></div>
        <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 border-t border-r border-border/30 rounded-tr-sm"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 md:w-8 md:h-8 border-b border-l border-border/30 rounded-bl-sm"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 md:w-8 md:h-8 border-b border-r border-border/30 rounded-br-sm"></div>

        <div className="absolute w-full h-full z-10"></div>

        <AchievementCard className="top-[5%] -left-8 md:top-4 md:-left-10 max-w-[90px] md:max-w-[160px]">
          <h4 className="text-[7px] md:text-sm font-serif font-medium">
            70k on instagram
          </h4>
          <p className="text-[5px] md:text-[10px] text-muted-foreground mt-1 leading-tight">
            @jia.seed
          </p>
        </AchievementCard>

        <AchievementCard className="top-[30%] -left-10 md:top-1/3 md:-left-24 max-w-[90px] md:max-w-[160px]">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-[7px] md:text-sm font-serif font-medium">
              software engineering internship
            </h4>
            <div className="flex items-center gap-0.5 mt-0.5 md:mt-1">
              <div className="flex-shrink-0 h-3.5 md:h-8 flex items-center">
                <Image
                  alt="Disney logo"
                  width={24}
                  height={10}
                  className="w-auto h-2.5 md:h-5"
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d5e082db-ba69-42ed-842b-52c6ebe36e8e-jia-build/assets/icons/disney-logo-2.png?"
                />
              </div>
              <div className="flex-shrink-0 h-3.5 md:h-8 flex items-center">
                <Image
                  alt="Intuit logo"
                  width={24}
                  height={10}
                  className="w-auto h-2.5 md:h-5"
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d5e082db-ba69-42ed-842b-52c6ebe36e8e-jia-build/assets/icons/intuit-logo-outline-3.png?"
                />
              </div>
            </div>
          </div>
          <p className="text-[5px] md:text-[10px] text-muted-foreground mt-0 leading-tight">
            offers from disney and intuit. dropped them.
          </p>
        </AchievementCard>

        <AchievementCard className="top-[75%] -left-8 md:bottom-4 md:-left-12 max-w-[90px] md:max-w-[160px]">
          <h4 className="text-[7px] md:text-sm font-serif font-medium">
            160k streams on spotify
          </h4>
          <p className="text-[5px] md:text-[10px] text-muted-foreground mt-1 leading-tight">
            @ jia seed
          </p>
        </AchievementCard>

        <AchievementCard className="top-[5%] -right-8 md:top-4 md:-right-10 max-w-[90px] md:max-w-[160px]">
          <div className="flex items-center gap-0.5 md:gap-2">
            <div className="flex-shrink-0 w-3.5 h-3.5 md:w-8 md:h-8 rounded-full flex items-center justify-center border border-border">
              <span className="text-[7px] md:text-sm font-bold">36</span>
            </div>
            <h4 className="text-[7px] md:text-sm font-serif font-medium">
              36 reading act
            </h4>
          </div>
          <p className="text-[5px] md:text-[10px] text-muted-foreground mt-1 leading-tight">
            (nose was always in a book)
          </p>
        </AchievementCard>

        <AchievementCard className="top-[30%] -right-10 md:top-1/3 md:-right-24 max-w-[90px] md:max-w-[180px]">
          <div className="flex items-center gap-0.5 md:gap-2">
            <div className="flex-shrink-0 w-3.5 h-3.5 md:w-8 md:h-8 flex items-center justify-center">
              <Trophy className="w-3.5 h-3.5 md:w-5 md:h-5 text-text-primary" />
            </div>
            <h4 className="text-[7px] md:text-sm font-serif font-medium">
              22 hackathon wins
            </h4>
          </div>
          <p className="text-[5px] md:text-[10px] text-muted-foreground mt-1 leading-tight">
            20k in winnings @ princeton, upenn, ycombinator etc
          </p>
        </AchievementCard>
        
        <AchievementCard className="top-[70%] -right-8 md:bottom-4 md:-right-12 max-w-[90px] md:max-w-[160px]">
          <div className="flex items-center gap-0.5">
            <div className="flex-shrink-0 w-3.5 h-3.5 md:w-8 md:h-8 flex items-center justify-center">
              <Image
                alt="Sprint.dev logo"
                width={12}
                height={8}
                className="w-auto h-2 md:h-3"
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/d5e082db-ba69-42ed-842b-52c6ebe36e8e-jia-build/assets/icons/sprint-logo-new-4.png?"
              />
            </div>
            <h4 className="text-[7px] md:text-sm font-serif font-medium">
              co-founder @ sprint.dev
            </h4>
          </div>
          <p className="text-[5px] md:text-[10px] text-muted-foreground mt-1 leading-tight">
            20k+ users, $48k profit. vc-backed
          </p>
        </AchievementCard>
      </div>
    </div>
  );
}