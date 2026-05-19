import { useState } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-canvas text-navy">
      <div className="paint-divider" />
      <section className="canvas-bg max-w-4xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="blob-blue text-xs tracking-[0.35em] uppercase mb-4 inline-block">Get in Touch</span>
          <h1 className="font-display text-4xl md:text-6xl font-black mt-6">Contact Us</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="bg-white rounded-[2rem] p-8 md:p-12 border-2 border-cream-dark" style={{ boxShadow: '8px 8px 0 #063c86' }}>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="mx-auto mb-4 text-lime" />
                <h3 className="text-2xl font-black mb-2">Message Sent!</h3>
                <p className="text-navy/50">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input required placeholder="Name" className="rounded-xl border-2 border-cream-dark p-4 bg-canvas text-navy placeholder:text-navy/30 focus:border-purple focus:outline-none transition" />
                  <input required type="email" placeholder="Email" className="rounded-xl border-2 border-cream-dark p-4 bg-canvas text-navy placeholder:text-navy/30 focus:border-purple focus:outline-none transition" />
                </div>
                <input required placeholder="Subject" className="w-full rounded-xl border-2 border-cream-dark p-4 bg-canvas text-navy placeholder:text-navy/30 mb-4 focus:border-purple focus:outline-none transition" />
                <textarea required placeholder="Your message..." className="w-full rounded-xl border-2 border-cream-dark p-4 bg-canvas text-navy placeholder:text-navy/30 h-36 mb-4 focus:border-purple focus:outline-none transition" />
                <button type="submit" className="w-full bg-royal text-white rounded-full py-4 font-black flex items-center justify-center gap-2 shadow-lg color-shadow hover:scale-[1.02] transition-all text-lg">
                  <Mail size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
