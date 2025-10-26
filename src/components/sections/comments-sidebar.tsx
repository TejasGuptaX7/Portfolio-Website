"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, X } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function CommentsSidebar() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Load comments from localStorage
    const stored = localStorage.getItem("tejas-comments");
    if (stored) {
      setComments(JSON.parse(stored));
    } else {
      // Default comments
      const defaultComments: Comment[] = [
        {
          id: "1",
          name: "Sarah Chen",
          message: "Your docIQ project is incredible! The sub-200ms latency is impressive 🚀",
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          id: "2",
          name: "Michael Rodriguez",
          message: "Congrats on winning HackHarvard! CarbonCompass looks like a game-changer",
          timestamp: new Date(Date.now() - 86400000 * 5).toISOString()
        },
        {
          id: "3",
          name: "Priya Sharma",
          message: "Love the minimalist design of this portfolio. Very hacker-aesthetic 💻",
          timestamp: new Date(Date.now() - 86400000 * 7).toISOString()
        }
      ];
      setComments(defaultComments);
      localStorage.setItem("tejas-comments", JSON.stringify(defaultComments));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("tejas-comments", JSON.stringify(updated));
    
    setName("");
    setMessage("");
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className={`bg-[#0a0a0a] p-6 lg:sticky lg:top-0 lg:h-screen overflow-y-auto ${isOpen ? '' : 'hidden lg:block'}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#3f8efc]" />
            <h3 className="text-lg font-bold">Homie Comments</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 hover:bg-[#2a2a2a] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-8">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-sm text-white placeholder:text-[#a1a1a1] focus:outline-none focus:border-[#3f8efc] transition-colors"
            maxLength={50}
          />
          <textarea
            placeholder="Leave a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-sm text-white placeholder:text-[#a1a1a1] focus:outline-none focus:border-[#3f8efc] transition-colors resize-none"
            rows={3}
            maxLength={200}
          />
          <button
            type="submit"
            className="w-full bg-[#3f8efc] text-black font-medium py-2 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="card-glass rounded-xl p-4 animate-in fade-in duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm text-white">{comment.name}</p>
                <span className="mono text-xs text-[#a1a1a1]">
                  {formatTimestamp(comment.timestamp)}
                </span>
              </div>
              <p className="text-sm text-[#a1a1a1] leading-relaxed">{comment.message}</p>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-[#2a2a2a] mx-auto mb-3" />
            <p className="text-sm text-[#a1a1a1]">No comments yet. Be the first!</p>
          </div>
        )}
      </div>
    </div>
  );
}