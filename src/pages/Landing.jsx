import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../lib/cart";

const initialBotMessage =
  "Hi, I’m your UNE3Q guide. Looking for custom jewelry, wall art, home décor, or a one-of-a-kind gift?";

export function getBotReply(clientText) {
  const text = String(clientText || "").toLowerCase();

  if (text.includes("jewelry") || text.includes("necklace") || text.includes("earring") || text.includes("bracelet")) {
    return "Beautiful. For custom jewelry, tell me your favorite colors, metal tone, size, style, budget, and whether this is for you or a gift.";
  }

  if (text.includes("art") || text.includes("painting") || text.includes("wall")) {
    return "Great choice. For wall art, tell me the room, size, color palette, mood, and any personal symbols or words you want included.";
  }

  if (text.includes("decor") || text.includes("home") || text.includes("vase") || text.includes("table")) {
    return "Love it. For home décor, tell me the space, colors, theme, measurements, and whether you want bold, peaceful, modern, or artsy.";
  }

  if (text.includes("gift") || text.includes("birthday") || text.includes("anniversary")) {
    return "A custom gift is perfect. Tell me who it is for, the occasion, their favorite colors, hobbies, and your timeline.";
  }

  return "Beautiful idea. Tell me your colors, style, budget, deadline, and what story you want the piece to tell, and we’ll help shape it into something uniquely YOU.";
}

function runLandingPageTests() {
  const tests = [
    ["Custom jewelry", "custom jewelry"],
    ["I need wall art", "wall art"],
    ["Home decor idea", "home décor"],
    ["Gift ideas", "custom gift"],
    ["Something blue and purple", "uniquely YOU"],
  ];

  tests.forEach(([input, expected]) => {
    const actual = getBotReply(input);
    console.assert(
      actual.toLowerCase().includes(expected.toLowerCase()),
      `Expected reply for "${input}" to include "${expected}". Got: ${actual}`
    );
  });
}

if (typeof window !== "undefined") {
  runLandingPageTests();
}

const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    message: (
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    ),
    close: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
        <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8Z" />
      </>
    ),
    gem: (
      <>
        <path d="M6 3h12l4 6-10 12L2 9Z" />
        <path d="M2 9h20" />
        <path d="m6 3 6 18 6-18" />
      </>
    ),
    palette: (
      <>
        <path d="M12 22a10 10 0 1 1 10-10c0 2.2-1.2 3-2.7 3h-1.8a2 2 0 0 0-2 2c0 .5.2 1 .5 1.4.6.8 0 1.9-1 2.2-.9.3-1.9.4-3 .4Z" />
        <circle cx="7.5" cy="10.5" r="1" />
        <circle cx="10.5" cy="7.5" r="1" />
        <circle cx="14.5" cy="7.5" r="1" />
        <circle cx="16.5" cy="11.5" r="1" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    fingerprint: (
      <>
        <path d="M12 10a2 2 0 0 0-2 2c0 2.7-1 5.1-2.6 6.8" />
        <path d="M14 13.1c-.2 3-1.1 5.6-2.8 7.9" />
        <path d="M17.3 18.7c.5-1.9.7-4 .7-6.7a6 6 0 0 0-12 0" />
        <path d="M4 15.3c.5-1 .8-2.1.8-3.3a7.2 7.2 0 0 1 14.4 0c0 1.2 0 2.3-.1 3.3" />
        <path d="M9.2 3.4A9.8 9.8 0 0 1 22 12" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.9 4.9 1.4 1.4" />
        <path d="m17.7 17.7 1.4 1.4" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.3 17.7-1.4 1.4" />
        <path d="m19.1 4.9-1.4 1.4" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};

export default function UNE3QLandingPage() {
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState([{ from: "bot", text: initialBotMessage }]);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const navLinks = [
    { to: "/shop", label: "Shop" },
    { to: "/custom", label: "Custom Orders" },
    { to: "/about", label: "Our Vision" },
    { to: "/contact", label: "Contact" },
  ];

  const quickReplies = useMemo(
    () => ["Custom jewelry", "Unique wall art", "Home décor", "Gift ideas"],
    []
  );

  const sendMessage = (text = input) => {
    const cleanText = String(text || "").trim();
    if (!cleanText) return;

    setMessages((prev) => [
      ...prev,
      { from: "client", text: cleanText },
      { from: "bot", text: getBotReply(cleanText) },
    ]);
    setInput("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#081b58] text-white">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(149,226,0,.45), transparent 22%), radial-gradient(circle at 65% 20%, rgba(139,54,214,.45), transparent 25%), radial-gradient(circle at 90% 70%, rgba(0,146,255,.35), transparent 24%), linear-gradient(135deg, #081b58 0%, #14062f 52%, #091e68 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(120deg, transparent 0 45%, rgba(255,215,110,.35) 45% 46%, transparent 46% 100%)" }} />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-400 text-2xl font-black text-blue-950 shadow-lg shadow-lime-400/30">U</div>
          <div>
            <p className="text-2xl font-black tracking-tight">
              <span className="text-lime-300">UNE</span><span className="text-purple-300">3</span><span className="text-sky-300">Q</span>
            </p>
            <p className="text-xs uppercase tracking-[.25em] text-white/70">Be you, Be UNE3Q</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm font-bold uppercase tracking-wider text-white/80 transition hover:text-lime-300">
              {link.label}
            </Link>
          ))}
          <Link to="/cart" className="relative flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/20">
            <ShoppingBag size={18} /> Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-blue-950">{itemCount}</span>
            )}
          </Link>
        </nav>

        <button className="md:hidden relative text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
          {itemCount > 0 && !menuOpen && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-blue-950">{itemCount}</span>
          )}
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 top-[76px] z-40 bg-[#081b58]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5 px-6 py-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="text-2xl font-black text-white hover:text-lime-300 transition border-b border-white/10 pb-4">
                {link.label}
              </Link>
            ))}
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 text-2xl font-black text-lime-300">
              <ShoppingBag size={24} /> Cart ({itemCount})
            </Link>
          </div>
        </div>
      )}

      <main className="relative z-10 grid min-h-[calc(100vh-88px)] items-center gap-10 px-6 pb-24 pt-8 md:grid-cols-2 md:px-12 lg:px-20">
        <motion.section initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-yellow-300/10 px-4 py-2 text-sm font-bold text-yellow-200">
            <Icon name="sparkle" size={18} /> Handmade • Heartfelt • One-of-a-kind
          </p>
          <h1 className="text-5xl font-black leading-[.95] md:text-7xl">
            Create your <span className="text-lime-300">UNE</span><span className="text-purple-300">3</span><span className="text-sky-300">Q</span>ness.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
            Custom handmade jewelry, unique arts, and home décor designed one-on-one to tell your story — boldly, colorfully, and beautifully.
          </p>
          <div id="start" className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="rounded-full bg-lime-400 px-7 py-4 font-black text-blue-950 shadow-xl shadow-lime-400/25 transition hover:bg-lime-300">Design With Us</a>
            <a href="#collections" className="rounded-full border border-white/25 bg-white/10 px-7 py-4 font-black backdrop-blur transition hover:bg-white/20">View Creations</a>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
          <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-lime-400/25 via-purple-500/25 to-sky-400/25 blur-2xl" />
          <div className="relative rounded-[2.5rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[2rem] bg-[#f6e9bd] p-5 text-blue-950">
              <div className="grid grid-cols-2 gap-4">
                <Feature icon={<Icon name="palette" />} title="Unique Arts" text="Statement pieces with bold color and soul." />
                <Feature icon={<Icon name="gem" />} title="Handmade Jewelry" text="Wearable art made around your style." />
                <Feature icon={<Icon name="home" />} title="Home Décor" text="One-of-a-kind accents for your space." />
                <Feature icon={<Icon name="heart" />} title="Your Story" text="Every piece is made to feel personal." />
              </div>
            </div>
            <div className="mt-5 rounded-[2rem] border border-yellow-300/30 bg-blue-950/65 p-5">
              <p className="text-2xl font-black text-yellow-200">Every piece tells a story. Yours.</p>
              <p className="mt-2 text-white/75">Custom colors, personal themes, meaningful materials, and artistic details that cannot be found anywhere else.</p>
            </div>
          </div>
        </motion.section>
      </main>

      <section id="collections" className="relative z-10 px-6 py-16 md:px-12 lg:px-20">
        <div className="grid gap-5 md:grid-cols-3">
          <Collection icon={<Icon name="fingerprint" />} title="Handmade" text="Crafted with care, detail, and personality." />
          <Collection icon={<Icon name="heart" />} title="Heartfelt" text="Made to connect with the person receiving it." />
          <Collection icon={<Icon name="sun" />} title="One-of-a-kind" text="No cookie-cutter designs. No ordinary pieces." />
        </div>
      </section>

      <section id="contact" className="relative z-10 mx-6 mb-24 rounded-[2rem] border border-white/20 bg-white/10 p-8 text-center backdrop-blur md:mx-12 lg:mx-20">
        <h2 className="text-3xl font-black md:text-5xl">Ready to create something UNE3Q?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">Use the guide below or send a request with your idea, colors, occasion, budget, and timeline.</p>
        <button onClick={() => setChatOpen(true)} className="mt-6 rounded-full bg-purple-400 px-7 py-4 font-black text-white shadow-xl shadow-purple-500/25 transition hover:bg-purple-300">Open Client Guide</button>
      </section>

      <div className="fixed bottom-5 right-5 z-50">
        {!chatOpen && (
          <button onClick={() => setChatOpen(true)} className="grid h-16 w-16 place-items-center rounded-full bg-lime-400 text-blue-950 shadow-2xl shadow-lime-400/30" aria-label="Open client guide chatbot">
            <Icon name="message" size={30} />
          </button>
        )}

        {chatOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-[min(92vw,380px)] overflow-hidden rounded-[2rem] border border-white/20 bg-[#10104a]/95 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-lime-400 via-purple-500 to-sky-400 p-4 text-white">
              <div>
                <p className="font-black">UNE3Q Client Guide</p>
                <p className="text-xs text-white/85">Here to help shape your idea</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded-full bg-black/20 p-2" aria-label="Close chatbot"><Icon name="close" size={18} /></button>
            </div>
            <div className="max-h-80 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={`${m.from}-${i}`} className={`rounded-2xl px-4 py-3 text-sm leading-6 ${m.from === "bot" ? "mr-8 bg-white/12 text-white" : "ml-8 bg-lime-300 text-blue-950"}`}>
                  {m.text}
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {quickReplies.map((reply) => (
                  <button key={reply} onClick={() => sendMessage(reply)} className="rounded-full border border-white/20 px-3 py-2 text-xs text-white/85 transition hover:bg-white/10">{reply}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 border-t border-white/10 p-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Tell us your idea..." className="min-w-0 flex-1 rounded-full bg-white px-4 py-3 text-sm text-blue-950 outline-none" aria-label="Chat message" />
              <button onClick={() => sendMessage()} className="grid h-12 w-12 place-items-center rounded-full bg-lime-400 text-blue-950" aria-label="Send message"><Icon name="send" size={18} /></button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-3xl bg-white/70 p-4 shadow-lg">
      <div className="mb-3 text-purple-700">{icon}</div>
      <h3 className="font-black">{title}</h3>
      <p className="mt-1 text-sm text-blue-950/70">{text}</p>
    </div>
  );
}

function Collection({ icon, title, text }) {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur">
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-yellow-300/15 text-yellow-200">{icon}</div>
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 text-white/70">{text}</p>
    </div>
  );
}
