import { useState } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="min-h-screen canvas-bg text-navy">
      <div className="paint-divider" />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="badge-painted mb-4">Get in Touch</span>
          <h1 className="font-display text-4xl md:text-6xl font-black mt-6">Contact Us</h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="card-painted-round rounded-[2rem] p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="mx-auto mb-4 text-lime" />
                <h3 className="text-2xl font-black mb-2">Message Sent!</h3>
                <p className="text-navy/50">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input required placeholder="Name" className="input-painted" />
                  <input required type="email" placeholder="Email" className="input-painted" />
                </div>
                <input required placeholder="Subject" className="input-painted w-full mb-4" />
                <textarea required placeholder="Your message..." className="input-painted w-full h-36 mb-4" />
                <button type="submit" className="w-full btn-painted-blue rounded-full py-4 font-black flex items-center justify-center gap-2 text-lg transition-all">
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
