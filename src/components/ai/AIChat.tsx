import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import {
  personalDetails,
  skills,
  experience,
  projects,
  education,
} from "../../data/profile";
import { hobbyApps } from "../../data/hobbyApps";

interface Message {
  role: "user" | "bot";
  text: string;
}

const knowledgeBase = {
  greeting: `Hi! I'm ${personalDetails.name.split(" ")[0]}'s portfolio assistant. Ask me about his skills, experience, projects, or education.`,
  skills: `Abhijith is proficient in: ${skills.map((s) => `${s.name} (${s.level})`).join(", ")}.`,
  experience: experience
    .map(
      (e) =>
        `• ${e.position} at ${e.name} (${e.startDate}–${e.endDate}): ${e.description} [${e.techStack.join(", ")}]`
    )
    .join("\n"),
  projects: [
    ...projects.map((p) => `• ${p.name}: ${p.description} [${p.techStack.join(", ")}]`),
    ...hobbyApps.map((a) => `• ${a.name}: ${a.description}`),
  ].join("\n"),
  education: education
    .map((e) => `• ${e.degree} from ${e.name} (${e.startDate}–${e.endDate})`)
    .join("\n"),
  contact: `Email: ${personalDetails.email} | Phone: ${personalDetails.phone} | Location: ${personalDetails.address}`,
  about: personalDetails.description,
};

const keywordMap: [string[], string][] = [
  [["skill", "technolog", "know", "stack", "proficien", "language"], knowledgeBase.skills],
  [["experience", "work", "job", "company", "career", "employ"], `Here's ${personalDetails.name.split(" ")[0]}'s experience:\n${knowledgeBase.experience}`],
  [["project", "built", "portfolio", "app", "hobby"], `Here are his projects:\n${knowledgeBase.projects}`],
  [["education", "degree", "college", "university", "study", "school"], `Education:\n${knowledgeBase.education}`],
  [["contact", "email", "phone", "reach", "hire"], knowledgeBase.contact],
  [["about", "who", "tell me", "introduce", "summary"], knowledgeBase.about],
  [["hello", "hi", "hey", "greet"], knowledgeBase.greeting],
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [keywords, response] of keywordMap) {
    if (keywords.some((k) => lower.includes(k))) return response;
  }
  return `I can answer questions about ${personalDetails.name.split(" ")[0]}'s skills, experience, projects, education, or contact info. Try asking about one of those!`;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: knowledgeBase.greeting },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(trimmed) }]);
      setTyping(false);
    }, 800);
  }, [input]);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-600/30 transition-shadow hover:shadow-xl hover:shadow-primary-600/40"
        aria-label="Chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-950/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/15">
                <Bot size={16} className="text-primary-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Ask About Me</p>
                <p className="text-[11px] text-surface-100/40">Powered by portfolio data</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-500/10">
                      <Bot size={12} className="text-primary-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary-600/20 text-white"
                        : "bg-white/[0.04] text-surface-100/70"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.06]">
                      <User size={12} className="text-surface-100/50" />
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-500/10">
                    <Bot size={12} className="text-primary-400" />
                  </div>
                  <div className="flex items-center gap-1 rounded-xl bg-white/[0.04] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                        className="h-1.5 w-1.5 rounded-full bg-primary-400"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-white/[0.06] px-4 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-transparent text-sm text-white placeholder-surface-100/30 outline-none"
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600/20 text-primary-400 transition-colors hover:bg-primary-600/30"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
