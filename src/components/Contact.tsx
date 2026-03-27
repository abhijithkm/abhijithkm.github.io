import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { personalDetails } from "../data/profile";

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
  const [submitted, setSubmitted] = useState(false);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
          }}
          className="space-y-5 lg:col-span-3"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <input type="text" placeholder="Name" required className={inputClass} />
            <input type="email" placeholder="Email" required className={inputClass} />
          </div>
          <textarea
            placeholder="Your message..."
            rows={6}
            required
            className={`${inputClass} resize-none`}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary-600/35"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              {submitted ? (
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
        </form>
      </div>
    </SectionWrapper>
  );
}
