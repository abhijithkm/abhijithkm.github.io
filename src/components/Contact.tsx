import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { personalDetails } from "../data/profile";

type FormStatus = "idle" | "sending" | "sent" | "error";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: personalDetails.email,
    href: `mailto:${personalDetails.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalDetails.phone,
    href: `tel:${personalDetails.phone}`,
  },
  { icon: MapPin, label: "Location", value: personalDetails.address },
];

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder-surface-100/25 outline-none transition-all duration-300 focus:border-primary-500/40 focus:bg-white/[0.04] focus:ring-1 focus:ring-primary-500/20";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${personalDetails.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            message: data.get("message"),
            _subject: `Portfolio contact from ${data.get("name")}`,
          }),
        }
      );
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      form.reset();
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact" title="Get In Touch" subtitle="Let's work together">
      <div className="grid gap-14 lg:grid-cols-5">
        {/* Info */}
        <div className="space-y-8 lg:col-span-2">
          <p className="text-base leading-[1.8] text-surface-100/50">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className="space-y-5">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <Icon size={18} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-surface-100/30">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-white transition-colors hover:text-primary-400"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-white">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <input type="text" name="name" placeholder="Name" required className={inputClass} />
            <input type="email" name="email" placeholder="Email" required className={inputClass} />
          </div>
          <textarea
            name="message"
            placeholder="Your message..."
            rows={6}
            required
            className={`${inputClass} resize-none`}
          />
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-600/35 disabled:opacity-60"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : status === "sent" ? (
                <>
                  <CheckCircle2 size={16} /> Message Sent!
                </>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </span>
          </motion.button>
          {status === "error" && (
            <p className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle size={15} />
              Something went wrong. Email me directly at{" "}
              <a href={`mailto:${personalDetails.email}`} className="underline hover:text-red-300">
                {personalDetails.email}
              </a>
            </p>
          )}
        </form>
      </div>
    </SectionWrapper>
  );
}
