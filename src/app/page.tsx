"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Twitter } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

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
  const [cinematic, setCinematic] = useState(false);

  // Skills ticker - optimized to prevent flickering
  const skills = ["Python", "React", "AWS", "AI/ML", "Full-Stack Dev"];
  const [skillIdx, setSkillIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSkillIdx((i) => (i + 1) % skills.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const steps = [
      () => setMessages([{ from: "career", text: "BROOO YOU NEED A PORTFOLIO WEBSITEEE FASTN AHHHHH" }]),
      () => setMessages((m) => [...m, { from: "me", text: "I got you." }]),
      () => setMessages((m) => [...m, { from: "career", text: "Make it unforgettable." }]),
      () => setMessages((m) => [...m, { from: "me", text: "Cinematic. Alive. Yours." }]),
      () => setCinematic(true), // trigger screen wipe
      () => setRevealSite(true),
      () => setShowIntro(false),
      () => setCinematic(false),
    ];
    const delays = [0, 1400, 900, 900, 200, 600, 400, 200];
    let acc = 0;
    const timers = steps.map((fn, i) => {
      acc += delays[i];
      return setTimeout(fn, acc);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentName, setCommentName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const pollRef = useRef<number | null>(null);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments", { cache: "no-store" });
      const json: ApiResponse<Comment[]> = await res.json();
      if (json.ok && json.data) {
        // Only update if comments actually changed to prevent flickering
        setComments(prevComments => {
          const newComments = json.data || [];
          if (JSON.stringify(prevComments) !== JSON.stringify(newComments)) {
            return newComments;
          }
          return prevComments;
        });
      }
    } catch {}
    finally { setLoadingComments(false); }
  };

  useEffect(() => {
    fetchComments();
    // Smart polling - only poll when page is visible and reduce frequency
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
      } else {
        if (!pollRef.current) {
          pollRef.current = window.setInterval(fetchComments, 15000);
        }
      }
    };
    
    // Start with longer interval to prevent flickering
    pollRef.current = window.setInterval(fetchComments, 15000);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => { 
      if (pollRef.current) clearInterval(pollRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const submitComment = async () => {
    if (!commentName.trim() || !commentMessage.trim()) return;
    setCommentSubmitting(true);
    const optimistic: Comment = {
      id: Math.max(0, ...comments.map((c) => c.id)) + 1,
      name: commentName.trim(),
      message: commentMessage.trim(),
      createdAt: new Date().toISOString(),
    };
    setComments((c) => [optimistic, ...c]);
    setCommentMessage("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: optimistic.name, message: optimistic.message }),
      });
      if (!res.ok) throw new Error("Failed");
      fetchComments();
    } catch {
      // revert optimistic on failure
      setComments((c) => c.filter((x) => x !== optimistic));
    } finally {
      setCommentSubmitting(false);
    }
  };

  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sentState, setSentState] = useState<null | { ok: boolean; msg: string }>(null);

  // Typing placeholder for contact message
  const placeholderScripts = [
    "Type your message…",
    "Hey Tejas, just wanted to say…",
    "Loved your projects!",
    "Quick collab idea:",
  ];
  const [typedPlaceholder, setTypedPlaceholder] = useState(placeholderScripts[0]);
  useEffect(() => {
    let script = 0;
    let i = 0;
    let adding = true;
    const tick = () => {
      const target = placeholderScripts[script];
      if (adding) {
        i++;
        if (i >= target.length) { adding = false; setTimeout(tick, 1200); return; }
      } else {
        i--;
        if (i <= 0) { adding = true; script = (script + 1) % placeholderScripts.length; }
      }
      setTypedPlaceholder(target.slice(0, Math.max(1, i)) + (adding ? "|" : ""));
      setTimeout(tick, adding ? 40 : 20);
    };
    const t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, []);

  const submitContact = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);
    setSentState(null);
    try {
      // Persist
      await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      // Try email (best-effort)
      const emailRes = await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const emailJson = await emailRes.json().catch(() => ({}));
      if (emailRes.ok) {
        setSentState({ ok: true, msg: "Message sent! I\'ll get back to you." });
        setForm({ name: "", email: "", message: "" });
      } else {
        setSentState({ ok: true, msg: "Saved. Email service not configured, but I\'ll read it." });
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
  const total = coffee + monster;
  const coffeePct = Math.round((coffee / total) * 100);
  const monsterPct = 100 - coffeePct;

  // Scroll-based motion - optimized to prevent flickering
  const { scrollYProgress } = useScroll();
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  // Helper UI
  function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
      <section id={id} className="max-w-3xl mx-auto px-5 sm:px-6">
        <motion.h2
          className="text-xl font-medium text-muted-foreground mb-3 tracking-tight will-change-transform"
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="rounded-xl bg-card border border-border will-change-transform"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="p-5 sm:p-6">{children}</div>
        </motion.div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Subtle interactive background - optimized to prevent flickering */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(60rem 60rem at 30% 20%, color-mix(in oklab, var(--primary) 20%, transparent), transparent), radial-gradient(40rem 40rem at 80% 60%, color-mix(in oklab, var(--muted-foreground) 18%, transparent), transparent)",
          translateX: bgX,
          translateY: bgY,
          filter: "blur(32px)",
          opacity: 0.6,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />

      {/* Intro iPhone-style messages - optimized to prevent flickering */}
      {showIntro && (
        <div className={`fixed inset-0 z-50 grid place-items-center bg-background transition-opacity duration-500 ease-in-out will-change-auto ${revealSite ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <div className="w-[320px] bg-card border border-border rounded-[32px] p-4 shadow-sm">
            <div className="text-center text-sm text-muted-foreground mb-2">Messages</div>
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 8, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`max-w-[80%] ${m.from === "career" ? "" : "ml-auto"}`}
                  >
                    <div className={`rounded-2xl px-3 py-2 text-sm leading-snug border ${m.from === "career" ? "bg-secondary/40 border-border" : "bg-primary text-primary-foreground border-border/20"}`}>
                      {m.text}
                    </div>
                    <div className="h-2" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          {/* Cinematic screen wipe */}
          <AnimatePresence>
            {cinematic && (
              <motion.div
                className="absolute inset-0 bg-background"
                initial={{ clipPath: "inset(50% 50% 50% 50% round 24px)", opacity: 0.9 }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Header / Intro - optimized to prevent flickering */}
      <header className={`relative z-10 transition-opacity duration-500 ease-in-out will-change-auto ${revealSite ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-16 pb-10">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-3xl sm:text-4xl font-semibold tracking-tight"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Tejas Gupta
              </motion.h1>
              <p className="text-muted-foreground mt-1">Software Engineer | AI/ML Enthusiast | Builder of Things That Scale</p>
            </div>
            <nav className="hidden sm:flex gap-3 text-sm text-muted-foreground">
              <a href="#stats" className="hover:text-foreground">Stats</a>
              <a href="#education" className="hover:text-foreground">Education</a>
              <a href="#experience" className="hover:text-foreground">Experience</a>
              <a href="#projects" className="hover:text-foreground">Projects</a>
              <a href="#leadership" className="hover:text-foreground">Leadership</a>
              <a href="#comments" className="hover:text-foreground">Homie Board</a>
              <a href="#contact" className="hover:text-foreground">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <div className={`flex-1 space-y-10 sm:space-y-12 pb-24 transition-opacity duration-500 ease-in-out will-change-auto ${revealSite ? "opacity-100" : "opacity-0"}`}>
        {/* Intro Section */}
        <Section id="intro" title="Intro">
          <div className="flex items-start gap-4">
            <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&auto=format&fit=crop" alt="avatar" className="size-14 rounded-full object-cover" />
            <div>
              <motion.p initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, ease: "easeOut" }} className="text-lg will-change-transform">Hey, I'm <span className="font-medium">Tejas</span>.</motion.p>
              <p className="text-muted-foreground mt-1">I build reliable systems and thoughtful UIs with clean type, soft motion, and a focus on scale.</p>
              <div className="mt-3 text-sm text-muted-foreground">
                <span className="opacity-80">Skills: </span>
                <span className="inline-block align-middle transition-all duration-300 ease-in-out will-change-transform">{skills[skillIdx]}</span>
                <span className="mx-1">•</span>
                <span className="inline-block align-middle transition-all duration-300 ease-in-out will-change-transform">{skills[(skillIdx+1)%skills.length]}</span>
                <span className="mx-1">•</span>
                <span className="inline-block align-middle transition-all duration-300 ease-in-out will-change-transform">{skills[(skillIdx+2)%skills.length]}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <a href="https://github.com/tejas" target="_blank" rel="noreferrer" aria-label="GitHub" className="size-9 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors"><Github className="size-4" /></a>
                <a href="https://linkedin.com/in/tejas" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="size-9 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors"><Linkedin className="size-4" /></a>
                <a href="mailto:tejas@example.com" aria-label="Email" className="size-9 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors">@</a>
                <a href="tel:+1234567890" aria-label="Phone" className="size-9 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors">✆</a>
              </div>
            </div>
          </div>
        </Section>

        {/* Stats Section */}
        <Section id="stats" title="Energy Stats">
          <div className="space-y-5">
            {/* coffee */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2"><span className="inline-block size-2 rounded-full bg-foreground" />Cups of coffee</div>
                <span className="text-muted-foreground">{coffee}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                <div className="h-full bg-foreground/90" style={{ width: `${coffeePct}%` }} />
              </div>
              {/* playful stack animation */}
              <motion.div className="mt-3 grid grid-cols-12 gap-1"
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div key={i} className="h-3 rounded-sm bg-foreground/20"
                    variants={{ hidden: { scaleY: 0.2, opacity: 0 }, show: { scaleY: 1, opacity: 1 } }}
                    transition={{ type: "spring", stiffness: 180, damping: 16 }}
                    style={{ transformOrigin: "bottom" }}
                  />
                ))}
              </motion.div>
            </div>
            {/* monster */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2"><span className="inline-block size-2 rounded-full bg-muted-foreground" />Cans of Monster</div>
                <span className="text-muted-foreground">{monster}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                <div className="h-full bg-muted-foreground" style={{ width: `${monsterPct}%` }} />
              </div>
              <motion.div className="mt-3 grid grid-cols-12 gap-1"
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}>
                {Array.from({ length: 18 }).map((_, i) => (
                  <motion.div key={i} className="h-3 rounded-sm bg-muted-foreground/30"
                    variants={{ hidden: { scaleY: 0.2, opacity: 0 }, show: { scaleY: 1, opacity: 1 } }}
                    transition={{ type: "spring", stiffness: 180, damping: 16 }}
                    style={{ transformOrigin: "bottom" }}
                  />
                ))}
              </motion.div>
            </div>
            <div className="text-xs text-muted-foreground">Total fuel: {total}</div>
          </div>
        </Section>

        {/* Education Section */}
        <Section id="education" title="Education">
          <ol className="relative border-l border-border/60 pl-4">
            <li className="mb-6 ml-2">
              <div className="absolute -left-[6px] mt-1 size-3 rounded-full bg-foreground" />
              <h3 className="font-medium">Arizona State University</h3>
              <p className="text-sm text-muted-foreground">B.S. Computer Science · Minor in Business · GPA 3.89/4.0 · Expected May 2027</p>
              <p className="text-sm mt-1">Dean's List; coursework in systems, ML, and large-scale web development.</p>
            </li>
          </ol>
        </Section>

        {/* Experience Section */}
        <Section id="experience" title="Experience">
          <div className="grid gap-4">
            <div className="rounded-lg border border-border p-4 hover:border-foreground/30 transition-all duration-200 ease-out transform-gpu will-change-transform hover:rotate-[0.15deg] hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">GlobalLogic — Software Engineering Intern</h3>
                <span className="text-xs text-muted-foreground">Summer 2025</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Contributed to production features with TypeScript/React; emphasized performance and reliability.</p>
            </div>
            <div className="rounded-lg border border-border p-4 hover:border-foreground/30 transition-all duration-200 ease-out transform-gpu will-change-transform hover:rotate-[0.15deg] hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Headstarter AI — Software Engineering Fellow</h3>
                <span className="text-xs text-muted-foreground">Summer 2024</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Built AI-driven prototypes end-to-end; shipped features under tight timelines.</p>
            </div>
            <div className="rounded-lg border border-border p-4 hover:border-foreground/30 transition-all duration-200 ease-out transform-gpu will-change-transform hover:rotate-[0.15deg] hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">EPICS Lab — Undergraduate Research Lead</h3>
                <span className="text-xs text-muted-foreground">2024</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Led a small team exploring applied ML; delivered tooling used by student researchers.</p>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="Projects">
          <div className="grid gap-4">
            <div className="rounded-lg border border-border p-4 group transform-gpu hover:-translate-y-0.5 transition-all">
              <h3 className="font-medium inline-block relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-foreground after:transition-all group-hover:after:w-full">docIQ</h3>
              <p className="text-sm text-muted-foreground mt-1">Document intelligence toolkit with semantic search and summarization.</p>
              <div className="mt-2 flex gap-2 text-sm">
                <a className="px-3 py-1 rounded-full border border-border hover:bg-secondary/60" href="#" target="_blank" rel="noreferrer">GitHub</a>
                <a className="px-3 py-1 rounded-full border border-border hover:bg-secondary/60" href="#" target="_blank" rel="noreferrer">Live</a>
              </div>
            </div>
            <div className="rounded-lg border border-border p-4 group transform-gpu hover:-translate-y-0.5 transition-all">
              <h3 className="font-medium inline-block relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-foreground after:transition-all group-hover:after:w-full">Sherpa</h3>
              <p className="text-sm text-muted-foreground mt-1">Personal assistant that routes tasks across LLM tools and APIs.</p>
              <div className="mt-2 flex gap-2 text-sm">
                <a className="px-3 py-1 rounded-full border border-border hover:bg-secondary/60" href="#" target="_blank" rel="noreferrer">GitHub</a>
                <a className="px-3 py-1 rounded-full border border-border hover:bg-secondary/60" href="#" target="_blank" rel="noreferrer">Live</a>
              </div>
            </div>
            <div className="rounded-lg border border-border p-4 group transform-gpu hover:-translate-y-0.5 transition-all">
              <h3 className="font-medium inline-block relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-foreground after:transition-all group-hover:after:w-full">Aether AI</h3>
              <p className="text-sm text-muted-foreground mt-1">Lightweight inference playground with shareable experiments.</p>
              <div className="mt-2 flex gap-2 text-sm">
                <a className="px-3 py-1 rounded-full border border-border hover:bg-secondary/60" href="#" target="_blank" rel="noreferrer">GitHub</a>
                <a className="px-3 py-1 rounded-full border border-border hover:bg-secondary/60" href="#" target="_blank" rel="noreferrer">Live</a>
              </div>
            </div>
          </div>
        </Section>

        {/* Leadership Section */}
        <Section id="leadership" title="Leadership">
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">CS+Social Good — Project Lead</h3>
              <span className="text-xs text-muted-foreground">2024–2025</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Led a student team building tech for social impact with a focus on usability.</p>
          </div>
        </Section>

        {/* Comments Section */}
        <Section id="comments" title="Homie Board">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Your name" value={commentName} onChange={(e) => setCommentName(e.target.value)} />
              <Input placeholder="Say something nice" value={commentMessage} onChange={(e) => setCommentMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") submitComment(); }} />
              <Button onClick={submitComment} disabled={commentSubmitting || !commentName || !commentMessage}>{commentSubmitting ? "Sending" : "Post"}</Button>
            </div>
            <div className="divide-y divide-border/60 min-h-[200px]">
              {loadingComments ? (
                <div className="text-sm text-muted-foreground py-4">Loading comments…</div>
              ) : comments.length === 0 ? (
                <div className="text-sm text-muted-foreground py-4">Be the first to drop a comment.</div>
              ) : (
                <div className="space-y-0">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="py-3 flex items-start gap-3 will-change-auto"
                    >
                      <div className="size-8 rounded-full bg-secondary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="inline-block max-w-full rounded-2xl px-3 py-2 bg-secondary/50 border border-border text-sm text-muted-foreground whitespace-pre-wrap break-words">
                          {c.message}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{new Date(c.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Contact Me">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <Textarea placeholder={typedPlaceholder} rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <div className="flex items-center gap-3">
                <Button onClick={submitContact} disabled={sending}>{sending ? "Sending…" : "Send"}</Button>
                {sentState && (
                  <span className={`text-sm ${sentState.ok ? "text-muted-foreground" : "text-destructive"}`}>{sentState.msg}</span>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">Find me online</div>
              <div className="flex gap-3">
                <a href="https://github.com/tejas" aria-label="GitHub" className="size-10 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors" target="_blank" rel="noreferrer">
                  <Github className="size-5" />
                </a>
                <a href="https://linkedin.com/in/tejas" aria-label="LinkedIn" className="size-10 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors" target="_blank" rel="noreferrer">
                  <Linkedin className="size-5" />
                </a>
                <a href="mailto:tejas@example.com" aria-label="Email" className="size-10 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors">
                  @
                </a>
                <a href="tel:+1234567890" aria-label="Phone" className="size-10 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors">
                  ✆
                </a>
              </div>
              <div className="text-xs text-muted-foreground">Email will be delivered directly when configured; otherwise your message is safely stored.</div>
            </div>
          </div>
        </Section>
      </div>

      {/* Fixed footer socials */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        <a href="https://github.com/tejas" aria-label="GitHub" className="size-10 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors" target="_blank" rel="noreferrer">
          <Github className="size-5" />
        </a>
        <a href="https://linkedin.com/in/tejas" aria-label="LinkedIn" className="size-10 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors" target="_blank" rel="noreferrer">
          <Linkedin className="size-5" />
        </a>
        <a href="mailto:tejas@example.com" aria-label="Email" className="size-10 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors">
          @
        </a>
        <a href="tel:+1234567890" aria-label="Phone" className="size-10 grid place-items-center rounded-full border border-border hover:bg-secondary/60 transition-colors">
          ✆
        </a>
      </div>
    </main>
  );
}