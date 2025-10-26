"use client";

import { useState, useEffect } from "react";
import { Terminal, Coffee, Code2 } from "lucide-react";

export default function EasterEggConsole() {
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "> System initialized...",
    "> Type commands in browser console",
    "> Try: window.hireme() or window.coffee()"
  ]);

  useEffect(() => {
    // Load coffee count from localStorage
    const stored = localStorage.getItem("tejas-coffee-count");
    if (stored) {
      setCoffeeCount(parseInt(stored));
    }

    // Define console commands
    (window as any).hireme = () => {
      const message = `
╔═══════════════════════════════════════╗
║                                       ║
║   HIRE TEJAS GUPTA                    ║
║                                       ║
║   Email: tgupta35@asu.edu             ║
║   Phone: +1 623-277-8812              ║
║   LinkedIn: tejasguptax7               ║
║   GitHub: TejasGuptaX7                ║
║                                       ║
║   "I build things that think."        ║
║                                       ║
╚═══════════════════════════════════════╝
      `;
      console.log(message);
      setLogs(prev => [...prev, "> window.hireme() executed ✓", "> Contact info displayed in console"]);
      return "Check the console for details!";
    };

    (window as any).coffee = () => {
      const newCount = coffeeCount + 1;
      setCoffeeCount(newCount);
      localStorage.setItem("tejas-coffee-count", newCount.toString());
      setLogs(prev => [...prev, `> ☕ Coffee count: ${newCount}`, `> Caffeine level: ${newCount * 95}mg`]);
      return `☕ Coffee #${newCount} brewing... Total caffeine: ${newCount * 95}mg`;
    };

    (window as any).about = (name?: string) => {
      if (name === "tejas") {
        const profile = {
          name: "Tejas Gupta",
          role: "Software Engineer & AI Builder",
          location: "Tempe, AZ",
          university: "Arizona State University",
          gpa: 3.89,
          graduation: "May 2027",
          skills: ["Python", "TypeScript", "React", "Machine Learning", "AWS"],
          projects: ["docIQ", "CarbonCompass", "Sherpa", "AutoMatch"],
          achievements: ["HackHarvard 2025 Winner", "New American University Scholar"],
          motto: "I build things that think.",
          coffee_consumed: coffeeCount
        };
        console.table(profile);
        setLogs(prev => [...prev, "> about(tejas) executed ✓", "> Profile data logged to console"]);
        return profile;
      }
      return "Try: about('tejas')";
    };

    (window as any).projects = () => {
      const projects = [
        { name: "docIQ", tech: "React, Python, PostgreSQL, AWS", users: "50+ concurrent" },
        { name: "CarbonCompass", tech: "React, Gemini, Cloudflare", award: "HackHarvard Winner" },
        { name: "AutoMatch", tech: "Python, React, TensorFlow", data: "100M+ data points" },
        { name: "Sherpa", tech: "Python, YOLOv11, Flask", accuracy: "92%" }
      ];
      console.table(projects);
      setLogs(prev => [...prev, "> projects() executed ✓", `> Listed ${projects.length} projects`]);
      return projects;
    };

    setLogs(prev => [...prev, "> Commands loaded: hireme(), coffee(), about(tejas), projects()"]);

    return () => {
      delete (window as any).hireme;
      delete (window as any).coffee;
      delete (window as any).about;
      delete (window as any).projects;
    };
  }, [coffeeCount]);

  return (
    <div className="bg-[#0a0a0a] p-6 lg:sticky lg:top-0 lg:h-screen overflow-y-auto border-r border-[#2a2a2a]">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Terminal className="w-5 h-5 text-[#3f8efc]" />
          <h3 className="mono text-sm font-bold text-[#3f8efc]">console.log</h3>
        </div>

        {/* Coffee Counter */}
        <div className="card-glass rounded-xl p-4 group hover:border-[#3f8efc] transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <Coffee className="w-5 h-5 text-[#3f8efc]" />
            <span className="mono text-sm font-semibold">Coffee Counter</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{coffeeCount}</div>
          <p className="text-xs text-[#a1a1a1] mono">
            {coffeeCount === 0 
              ? "Type window.coffee() in console" 
              : `${coffeeCount * 95}mg caffeine fueling projects`}
          </p>
        </div>

        {/* Console Logs */}
        <div className="card-glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-4 h-4 text-[#3f8efc]" />
            <span className="mono text-xs font-semibold text-[#a1a1a1]">Activity Log</span>
          </div>
          <div className="space-y-1 max-h-[400px] overflow-y-auto">
            {logs.slice(-10).map((log, i) => (
              <div 
                key={i} 
                className="mono text-xs text-[#a1a1a1] animate-in fade-in duration-300"
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Easter Egg Hints */}
        <div className="space-y-3">
          <h4 className="mono text-xs font-bold text-[#a1a1a1] uppercase tracking-wider">
            Hidden Commands
          </h4>
          
          <div className="space-y-2">
            <div className="card-glass rounded-lg p-3 hover:border-[#3f8efc] transition-all cursor-pointer group">
              <code className="mono text-xs text-[#3f8efc]">window.hireme()</code>
              <p className="text-xs text-[#a1a1a1] mt-1 group-hover:text-white transition-colors">
                Display contact info
              </p>
            </div>

            <div className="card-glass rounded-lg p-3 hover:border-[#3f8efc] transition-all cursor-pointer group">
              <code className="mono text-xs text-[#3f8efc]">window.coffee()</code>
              <p className="text-xs text-[#a1a1a1] mt-1 group-hover:text-white transition-colors">
                Increment coffee counter
              </p>
            </div>

            <div className="card-glass rounded-lg p-3 hover:border-[#3f8efc] transition-all cursor-pointer group">
              <code className="mono text-xs text-[#3f8efc]">window.about("tejas")</code>
              <p className="text-xs text-[#a1a1a1] mt-1 group-hover:text-white transition-colors">
                View JSON profile
              </p>
            </div>

            <div className="card-glass rounded-lg p-3 hover:border-[#3f8efc] transition-all cursor-pointer group">
              <code className="mono text-xs text-[#3f8efc]">window.projects()</code>
              <p className="text-xs text-[#a1a1a1] mt-1 group-hover:text-white transition-colors">
                List all projects
              </p>
            </div>
          </div>
        </div>

        {/* Hacker Quote */}
        <div className="mt-8 p-4 border-l-2 border-[#3f8efc]">
          <p className="mono text-xs text-[#a1a1a1] italic">
            "Talk is cheap. Show me the code."
          </p>
          <p className="mono text-xs text-[#3f8efc] mt-1">— Linus Torvalds</p>
        </div>
      </div>
    </div>
  );
}