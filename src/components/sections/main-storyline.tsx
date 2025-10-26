"use client";

import { Github, Linkedin, Mail, FileText, ExternalLink, Award, Briefcase, Code, Zap } from "lucide-react";

export default function MainStoryline() {
  const projects = [
    {
      name: "CarbonCompass",
      description: "AI-powered location recommender with 3D thermal mesh analyzer",
      tech: ["React", "Gemini API", "Cloudflare"],
      impact: "HackHarvard 2025 Winner",
      links: {
        github: "https://github.com/TejasGuptaX7/HackHarvardTTP",
        live: "https://hack-harvard-ttp.vercel.app"
      }
    },
    {
      name: "docIQ",
      description: "AI Document Intelligence Platform with semantic search",
      tech: ["React", "Python", "PostgreSQL", "AWS"],
      impact: "Sub-200ms query latency",
      links: {
        github: "https://github.com/TejasGuptaX7/docIQ",
        live: "https://dociq.tech"
      }
    },
    {
      name: "AutoMatch",
      description: "AI-powered dealership experience with ML recommendations",
      tech: ["Python", "React", "TensorFlow"],
      impact: "100M+ data points scraped",
      links: {
        github: "https://github.com/TejasGuptaX7/car_expo"
      }
    },
    {
      name: "Sherpa",
      description: "Smart traffic management with YOLOv11 vehicle detection",
      tech: ["Python", "YOLOv11", "Flask"],
      impact: "92% detection accuracy",
      links: {
        github: "https://github.com/TejasGuptaX7/sherpa"
      }
    }
  ];

  const experience = [
    {
      role: "Software Engineering Intern",
      company: "GlobalLogic, A Hitachi Company",
      period: "May 2025 – Aug 2025",
      highlights: [
        "Built 6 Spring Boot microservices for 10,000+ users",
        "Reduced query latency by 40% with TypeScript REST layer",
        "Achieved 99.9% uptime with Docker + EKS deployment"
      ]
    },
    {
      role: "Software Engineering Fellow",
      company: "Headstarter AI",
      period: "June 2024 – Aug 2024",
      highlights: [
        "3% acceptance rate competitive program",
        "Built 5 full-stack AI applications",
        "RAG-powered search with 95% accuracy"
      ]
    },
    {
      role: "Undergraduate Research Lead",
      company: "EPICS Lab, ASU",
      period: "Jan 2024 – May 2024",
      highlights: [
        "Led team of 4 researchers on autonomous drone navigation",
        "Achieved 1m GPS precision with 98% success rate",
        "60% faster than ground transport for medical deliveries"
      ]
    }
  ];

  return (
    <div className="bg-black p-8 lg:p-12 overflow-y-auto min-h-screen">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero */}
        <section className="pt-12 pb-8">
          <div className="mb-6">
            <div className="inline-block">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 glow">
                Hi, I'm Tejas
              </h1>
              <div className="h-1 bg-gradient-to-r from-[#3f8efc] to-transparent"></div>
            </div>
          </div>
          <p className="text-2xl lg:text-3xl text-white font-semibold mb-6">
            I build things that think.
          </p>
          <p className="text-lg text-[#a1a1a1] max-w-2xl leading-relaxed">
            Software Engineer @ ASU | Building{" "}
            <span className="text-[#3f8efc]">docIQ</span>,{" "}
            <span className="text-[#3f8efc]">CarbonCompass</span>,{" "}
            <span className="text-[#3f8efc]">Sherpa</span> & more.
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="mailto:tgupta35@asu.edu"
              className="card-glass px-4 py-2 rounded-lg hover:border-[#3f8efc] transition-all flex items-center gap-2 group"
            >
              <Mail className="w-4 h-4 text-[#3f8efc]" />
              <span className="text-sm font-medium">Email</span>
            </a>
            <a
              href="https://github.com/TejasGuptaX7"
              target="_blank"
              rel="noopener noreferrer"
              className="card-glass px-4 py-2 rounded-lg hover:border-[#3f8efc] transition-all flex items-center gap-2 group"
            >
              <Github className="w-4 h-4 text-[#3f8efc]" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/tejasguptax7"
              target="_blank"
              rel="noopener noreferrer"
              className="card-glass px-4 py-2 rounded-lg hover:border-[#3f8efc] transition-all flex items-center gap-2 group"
            >
              <Linkedin className="w-4 h-4 text-[#3f8efc]" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a
              href="https://tejasgupta.me"
              target="_blank"
              rel="noopener noreferrer"
              className="card-glass px-4 py-2 rounded-lg hover:border-[#3f8efc] transition-all flex items-center gap-2 group"
            >
              <FileText className="w-4 h-4 text-[#3f8efc]" />
              <span className="text-sm font-medium">Resume</span>
            </a>
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-6 h-6 text-[#3f8efc]" />
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>
          <div className="grid gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="card-glass rounded-2xl p-6 hover:border-[#3f8efc] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#3f8efc] transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex gap-2">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                      >
                        <Github className="w-4 h-4 text-[#a1a1a1] hover:text-[#3f8efc]" />
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-[#a1a1a1] hover:text-[#3f8efc]" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-[#a1a1a1] mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tech, j) => (
                    <span
                      key={j}
                      className="mono text-xs px-3 py-1 bg-[#1a1a1a] text-[#3f8efc] rounded-full border border-[#2a2a2a]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-[#3f8efc]" />
                  <span className="text-white font-medium">{project.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-[#3f8efc]" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="card-glass rounded-2xl p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <p className="text-[#3f8efc] font-medium">{exp.company}</p>
                  <p className="mono text-sm text-[#a1a1a1] mt-1">{exp.period}</p>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-[#3f8efc] mt-1">▹</span>
                      <span className="text-[#a1a1a1] leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Spotify */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-[#3f8efc]" />
            <h2 className="text-3xl font-bold">Music I Code To</h2>
          </div>
          <div className="card-glass rounded-2xl p-6">
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5trt9i14X7j?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="mono text-sm text-[#a1a1a1]">
            Built with Next.js + Tailwind CSS • Open source on GitHub
          </p>
          <p className="mono text-xs text-[#2a2a2a] mt-2">
            © 2025 Tejas Gupta. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}