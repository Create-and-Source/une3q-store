import { useState } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-navy-deep text-white">
      <div className="gold-line" />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-gold tracking-[0.4em] uppercase text-sm font-bold mb-4">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-6xl font-black">Contact Us</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-[2rem] p-8 md:p-12 border border-white/10">
            <div className="absolute top-0 left-8 w-16 h-px bg-gradient-to-r from-gold/60 to-transparent" />
            <div className="absolute top-0 left-8 w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />
            <div className="absolute bottom-0 right-8 w-16 h-px bg-gradient-to-l from-gold/60 to-transparent" />
            <div className="absolute bottom-0 right-8 w-px h-16 bg-gradient-to-t from-gold/60 to-transparent" />

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="mx-auto mb-4 text-lime" />
                <h3 className="text-2xl font-black mb-2">Message Sent!</h3>
                <p className="text-white/50">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input required placeholder="Name" className="rounded-xl border border-white/10 p-4 bg-white/5 text-white placeholder:text-white/30 focus:border-purple/50 focus:outline-none transition" />
                  <input required type="email" placeholder="Email" className="rounded-xl border border-white/10 p-4 bg-white/5 text-white placeholder:text-white/30 focus:border-purple/50 focus:outline-none transition" />
                </div>
                <input required placeholder="Subject" className="w-full rounded-xl border border-white/10 p-4 bg-white/5 text-white placeholder:text-white/30 mb-4 focus:border-purple/50 focus:outline-none transition" />
                <textarea required placeholder="Your message..." className="w-full rounded-xl border border-white/10 p-4 bg-white/5 text-white placeholder:text-white/30 h-36 mb-4 focus:border-purple/50 focus:outline-none transition" />
                <button type="submit" className="w-full bg-gradient-to-r from-purple to-purple-deep text-white rounded-full py-4 font-black flex items-center justify-center gap-2 shadow-xl hover:shadow-purple/30 hover:scale-[1.02] transition-all border border-purple-light/30">
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
