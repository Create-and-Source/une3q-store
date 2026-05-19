import { useState } from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

export default function CustomOrders() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', type: 'Handmade Jewelry', details: '' })
  const [submitting, setSubmitting] = useState(false)

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await supabase.from('custom_requests').insert({
      name: form.name,
      email: form.email,
      request_type: form.type,
      details: form.details,
    })
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-navy-deep text-white">
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-purple-deep/30 to-navy-deep" />
        <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-purple/20 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 w-96 h-96 rounded-full bg-lime/10 blur-[80px]" />
        <div className="absolute top-0 left-0 right-0 gold-line" />

        <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold tracking-[0.4em] uppercase text-sm font-bold mb-4">Custom Made</p>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-6 leading-tight">
              Made with <span className="text-purple-light">passion.</span><br />
              Designed to <span className="text-lime">stand out.</span>
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              Request one-on-one custom work for jewelry, wall art, handmade gifts, and home decor that shows your individuality.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {['Handmade', 'Heartfelt', 'One-of-a-Kind'].map(tag => (
                <div key={tag} className="bg-white/[0.03] rounded-xl py-3 px-2 border border-white/5 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-gold">{tag}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-[2rem] p-8 border border-white/10">
              <div className="absolute top-0 left-8 w-16 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              <div className="absolute top-0 left-8 w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} className="mx-auto mb-4 text-lime" />
                  <h3 className="text-2xl font-black mb-2">Request Sent!</h3>
                  <p className="text-white/50">We'll be in touch within 24-48 hours to discuss your custom piece.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-black mb-5">Custom Order Request</h3>
                  <div className="space-y-4">
                    <input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full rounded-xl border border-white/10 p-4 bg-white/5 text-white placeholder:text-white/30 focus:border-purple/50 focus:outline-none transition" placeholder="Name" />
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full rounded-xl border border-white/10 p-4 bg-white/5 text-white placeholder:text-white/30 focus:border-purple/50 focus:outline-none transition" placeholder="Email" />
                    <select value={form.type} onChange={e => set('type', e.target.value)} className="w-full rounded-xl border border-white/10 p-4 bg-white/5 text-white focus:border-purple/50 focus:outline-none transition">
                      <option className="bg-navy">Handmade Jewelry</option>
                      <option className="bg-navy">Unique Art</option>
                      <option className="bg-navy">Home Decor</option>
                      <option className="bg-navy">Other Custom Piece</option>
                    </select>
                    <textarea required value={form.details} onChange={e => set('details', e.target.value)} className="w-full rounded-xl border border-white/10 p-4 bg-white/5 text-white placeholder:text-white/30 h-28 focus:border-purple/50 focus:outline-none transition" placeholder="Tell us what you want created..." />
                    <button type="submit" disabled={submitting} className="w-full bg-lime text-navy rounded-full py-4 font-black disabled:opacity-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-lime/30">
                      {submitting ? 'Sending...' : 'Send Request'} {!submitting && <ArrowRight size={18} />}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
