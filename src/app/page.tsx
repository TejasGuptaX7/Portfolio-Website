"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Phone, Coffee, Zap, Code, Brain, Rocket, Terminal, Cpu, Database } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Types aligned with backend
interface Comment {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}
interface ApiResponse<T> { ok: boolean; data?: T; error?: string }

export default function HomePage() {
  // Intro animation state
  const [showIntro, setShowIntro] = useState(true);
  const [messages, setMessages] = useState<{ from: "career" | "me"; text: string }[]>([]);
  const [revealSite, setRevealSite] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const steps = [
      () => setMessages([{ from: "career", text: "Yo! You need a portfolio site ASAP! 🔥" }]),
      () => setMessages((m) => [...m, { from: "me", text: "Already on it 💻" }]),
      () => setMessages((m) => [...m, { from: "career", text: "Make it memorable." }]),
      () => setMessages((m) => [...m, { from: "me", text: "Clean. Powerful. Yours." }]),
      () => setRevealSite(true),
      () => setTimeout(() => setShowIntro(false), 500),
    ];
    
    const delays = [500, 1400, 1200, 1200, 800, 0];
    let acc = 0;
    const timers = steps.map((fn, i) => {
      acc += delays[i];
      return setTimeout(fn, acc);
    });
    
    return () => timers.forEach(clearTimeout);
  }, [mounted]);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentName, setCommentName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments", { cache: "no-store" });
      const json: ApiResponse<Comment[]> = await res.json();
      if (json.ok && json.data) {
        setComments(json.data);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally { 
      setLoadingComments(false); 
    }
  };

  useEffect(() => {
    if (!mounted) return;
    fetchComments();
    const interval = setInterval(fetchComments, 30000);
    return () => clearInterval(interval);
  }, [mounted]);

  const submitComment = async () => {
    if (!commentName.trim() || !commentMessage.trim()) return;
    setCommentSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: commentName.trim(), message: commentMessage.trim() }),
      });
      if (res.ok) {
        setCommentMessage("");
        fetchComments();
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sentState, setSentState] = useState<null | { ok: boolean; msg: string }>(null);

  const submitContact = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);
    setSentState(null);
    try {
      const res = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSentState({ ok: true, msg: "Message sent! I'll get back to you soon." });
        setForm({ name: "", email: "", message: "" });
      }
    } catch (e) {
      setSentState({ ok: false, msg: "Could not send. Please try again." });
    } finally {
      setSending(false);
    }
  };

  // Stats
  const coffee = 354;
  const monster = 255;
  const totalEnergy = coffee + monster;

  // Fun facts
  const funFacts = [
    "🎯 3% acceptance rate at Headstarter",
    "⚡ 40% latency reduction achieved",
    "🚁 1m GPS precision for drones",
    "📚 Dean's List every semester",
    "🏃 6-min medical delivery time",
    "💻 5 apps built in 7 weeks",
    "🧠 95% RAG accuracy",
    "☕ " + totalEnergy + " drinks consumed"
  ];

  const [factIndex, setFactIndex] = useState(0);
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setFactIndex((i) => (i + 1) % funFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [mounted, funFacts.length]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* iPhone Messages Intro */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            className="fixed inset-0 z-50 grid place-items-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: revealSite ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ pointerEvents: revealSite ? 'none' : 'auto' }}
          >
            <div className="w-[360px] bg-zinc-900 rounded-[40px] p-2 shadow-2xl border border-zinc-800">
              <div className="bg-black rounded-[32px] p-4">
                <div className="text-center text-xs text-zinc-500 mb-4 font-medium">Messages</div>
                <div className="space-y-3 min-h-[200px]">
                  <AnimatePresence mode="popLayout">
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 10, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                        className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                          m.from === "me" 
                            ? "bg-blue-500 text-white" 
                            : "bg-zinc-800 text-white"
                        }`}>
                          {m.text}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealSite ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex min-h-screen">
          {/* Left Sidebar - Stats & Fun Facts */}
          <aside className="hidden lg:block w-64 border-r border-zinc-900 p-6 fixed left-0 top-0 h-screen overflow-y-auto">
            <div className="space-y-8">
              {/* Energy Stats */}
              <div>
                <h3 className="text-xs font-mono text-zinc-500 mb-4 uppercase tracking-wider">Energy Levels</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-3 h-3 text-zinc-400" />
                        <span className="text-xs text-zinc-400">Coffee</span>
                      </div>
                      <span className="text-sm font-mono text-white">{coffee}</span>
                    </div>
                    <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(coffee / totalEnergy) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-zinc-400" />
                        <span className="text-xs text-zinc-400">Monster</span>
                      </div>
                      <span className="text-sm font-mono text-white">{monster}</span>
                    </div>
                    <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-zinc-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(monster / totalEnergy) * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-zinc-600 mt-4">
                    Total Fuel: {totalEnergy} drinks
                  </div>
                </div>
              </div>

              {/* Fun Facts Ticker */}
              <div>
                <h3 className="text-xs font-mono text-zinc-500 mb-4 uppercase tracking-wider">Quick Stats</h3>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={factIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-sm text-zinc-300 min-h-[20px]"
                  >
                    {funFacts[factIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-xs font-mono text-zinc-500 mb-4 uppercase tracking-wider">Tech Stack</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Py", icon: <Code className="w-3 h-3" /> },
                    { name: "JS", icon: <Terminal className="w-3 h-3" /> },
                    { name: "TS", icon: <Cpu className="w-3 h-3" /> },
                    { name: "React", icon: <Rocket className="w-3 h-3" /> },
                    { name: "AWS", icon: <Database className="w-3 h-3" /> },
                    { name: "Docker", icon: <Brain className="w-3 h-3" /> }
                  ].map((tech, i) => (
                    <motion.div 
                      key={tech.name}
                      className="text-xs font-mono p-2 bg-zinc-900 rounded text-center hover:bg-zinc-800 transition-colors cursor-pointer flex flex-col items-center gap-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 + 1 }}
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 lg:ml-64 lg:mr-80">
            <div className="max-w-4xl mx-auto px-6 py-12">
              {/* Header */}
              <header className="mb-16">
                <motion.h1 
                  className="text-5xl lg:text-6xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Tejas Gupta
                </motion.h1>
                <motion.p 
                  className="text-xl text-zinc-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Software Engineer • AI/ML Enthusiast • System Builder
                </motion.p>
                <motion.div 
                  className="flex gap-4 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <a href="https://github.com/TejasGuptaX7" target="_blank" rel="noreferrer" 
                     className="p-2 border border-zinc-800 rounded hover:border-zinc-600 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/tejasguptax7" target="_blank" rel="noreferrer" 
                     className="p-2 border border-zinc-800 rounded hover:border-zinc-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:tgupta35@asu.edu" 
                     className="p-2 border border-zinc-800 rounded hover:border-zinc-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href="tel:+16232778812" 
                     className="p-2 border border-zinc-800 rounded hover:border-zinc-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </a>
                </motion.div>
              </header>

              {/* Education */}
              <motion.section 
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Education</h2>
                <div className="border-l-2 border-zinc-800 pl-6">
                  <h3 className="text-xl font-semibold">Arizona State University</h3>
                  <p className="text-zinc-400">B.S. Computer Science • Minor in Business</p>
                  <p className="text-zinc-500">GPA: 3.89/4.0 • Expected: May 2027</p>
                  <p className="text-sm text-zinc-600 mt-2">Dean's List: Fall 2023, Spring 2024, Fall 2024, Spring 2025</p>
                </div>
              </motion.section>

              {/* Experience */}
              <motion.section 
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Experience</h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Software Engineering Intern",
                      company: "GlobalLogic, A Hitachi Company",
                      date: "May - Aug 2025",
                      points: [
                        "Designed 6 Spring Boot microservices for large-scale AI chatflows",
                        "Built TypeScript REST layer, cutting query latency by 40%",
                        "Containerized services with Docker and deployed to EKS",
                        "Tuned Lambda caches trimming AWS compute cost by 12%"
                      ]
                    },
                    {
                      title: "Software Engineering Fellow",
                      company: "HEADSTARTER AI",
                      date: "June - Aug 2024",
                      points: [
                        "Selected for competitive program (3% acceptance rate)",
                        "Built 5 full-stack applications with RAG-powered search",
                        "Achieved 95% accuracy in document search system",
                        "Mentored by engineers from Google, Tesla, and Citadel"
                      ]
                    },
                    {
                      title: "Undergraduate Research Lead",
                      company: "EPICS Laboratory, ASU",
                      date: "Jan - May 2024",
                      points: [
                        "Developed autonomous drone navigation with 1m GPS precision",
                        "Integrated LiDAR and computer vision with 98% success rate",
                        "Demonstrated 6-minute average medical delivery time"
                      ]
                    }
                  ].map((exp, index) => (
                    <motion.div 
                      key={index}
                      className="border-l-2 border-zinc-800 pl-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h3 className="text-xl font-semibold">{exp.title}</h3>
                          <p className="text-zinc-400">{exp.company}</p>
                        </div>
                        <span className="text-sm text-zinc-500">{exp.date}</span>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                        {exp.points.map((point, i) => (
                          <li key={i}>• {point}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Projects */}
              <motion.section 
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Projects</h2>
                <div className="grid gap-6">
                  {[
                    {
                      name: "docIQ - AI Document Intelligence",
                      desc: "Semantic search processing 1000+ documents with sub-200ms latency",
                      links: ["GitHub", "Live Demo"]
                    },
                    {
                      name: "Sherpa - Smart Traffic Management",
                      desc: "YOLOv11 model with 92% vehicle detection accuracy",
                      links: ["GitHub"]
                    },
                    {
                      name: "Aether AI - Healthcare Foundation Model",
                      desc: "Multi-modal agent for EMR data extraction and analysis",
                      links: ["GitHub"]
                    }
                  ].map((project, index) => (
                    <motion.div 
                      key={index}
                      className="border border-zinc-800 p-6 rounded hover:border-zinc-600 transition-colors"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                      <p className="text-zinc-400 text-sm mb-3">{project.desc}</p>
                      <div className="flex gap-3">
                        {project.links.map((link) => (
                          <button key={link} className="text-xs px-3 py-1 border border-zinc-800 rounded hover:border-zinc-600 transition-colors">
                            {link}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Contact Form */}
              <motion.section 
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Name" 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                    />
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                    />
                  </div>
                  <Textarea 
                    placeholder="Message" 
                    rows={4} 
                    value={form.message} 
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 resize-none"
                  />
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={submitContact} 
                      disabled={sending}
                      className="bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </Button>
                    {sentState && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-sm ${sentState.ok ? "text-green-500" : "text-red-500"}`}
                      >
                        {sentState.msg}
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.section>
            </div>
          </main>

          {/* Right Sidebar - Homie Board */}
          <aside className="hidden xl:block w-80 border-l border-zinc-900 p-6 fixed right-0 top-0 h-screen overflow-y-auto">
            <div>
              <h3 className="text-xs font-mono text-zinc-500 mb-4 uppercase tracking-wider">Homie Board</h3>
              <div className="space-y-3 mb-4">
                <Input 
                  placeholder="Your name" 
                  value={commentName} 
                  onChange={(e) => setCommentName(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white text-sm placeholder:text-zinc-600"
                />
                <Input 
                  placeholder="Drop a message..." 
                  value={commentMessage} 
                  onChange={(e) => setCommentMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) submitComment(); }}
                  className="bg-zinc-900 border-zinc-800 text-white text-sm placeholder:text-zinc-600"
                />
                <Button 
                  onClick={submitComment} 
                  disabled={commentSubmitting || !commentName || !commentMessage}
                  className="w-full bg-white text-black hover:bg-zinc-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {commentSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>

              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                {loadingComments ? (
                  <div className="text-xs text-zinc-500">Loading messages...</div>
                ) : comments.length === 0 ? (
                  <div className="text-xs text-zinc-500 text-center py-4">
                    Be the first to leave a message!
                  </div>
                ) : (
                  comments.map((c) => (
                    <motion.div 
                      key={c.id} 
                      className="border-b border-zinc-900 pb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="text-sm font-semibold text-white">{c.name}</div>
                      <div className="text-xs text-zinc-400 mt-1 break-words">{c.message}</div>
                      <div className="text-xs text-zinc-600 mt-1">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}