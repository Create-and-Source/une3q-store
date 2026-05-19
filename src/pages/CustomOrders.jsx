import { useState } from 'react'
import { CheckCircle2, ArrowRight, Fingerprint, Heart, Sun } from 'lucide-react'
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
    <div className="min-h-screen bg-canvas text-navy">
      <section className="hero-paint relative py-20 px-6 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-purple/15 blur-[80px]" />
        <div className="absolute -bottom-10 -right-10 w-[350px] h-[350px] rounded-full bg-lime/12 blur-[60px]" />
        <div className="absolute top-16 right-20 w-24 h-3 bg-royal/20 rounded-full rotate-[-12deg]" />
        <div className="absolute bottom-20 left-16 w-20 h-3 bg-lime/25 rounded-full rotate-[8deg]" />

        <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="blob-lime text-xs tracking-[0.35em] uppercase mb-4 inline-block">Custom Made</span>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-6 leading-tight mt-4">
              Made with <span className="text-purple">passion.</span><br />
              Designed to <span className="text-lime brush-underline">stand out.</span>
            </h1>
            <p className="font-script text-2xl text-royal/60 mb-4 rotate-[-1deg]">
              One-on-one custom work that shows your individuality
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label: 'Handmade', icon: Fingerprint, bg: 'bg-purple' },
                { label: 'Heartfelt', icon: Heart, bg: 'bg-royal' },
                { label: 'One-of-a-Kind', icon: Sun, bg: 'bg-lime' },
              ].map(tag => {
                const Icon = tag.icon
                return (
                  <div key={tag.label} className={`${tag.bg} ${tag.bg === 'bg-lime' ? 'text-navy' : 'text-white'} rounded-xl py-3 px-2 text-center`}>
                    <Icon size={16} className="mx-auto mb-1" />
                    <p className="text-[10px] font-black uppercase tracking-wider">{tag.label}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="bg-white rounded-[2rem] p-8 border-2 border-cream-dark" style={{ boxShadow: '8px 8px 0 #7a1fad' }}>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} className="mx-auto mb-4 text-lime" />
                  <h3 className="text-2xl font-black mb-2">Request Sent!</h3>
                  <p className="text-navy/50">We'll be in touch within 24-48 hours to discuss your custom piece.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-black mb-5">Custom Order Request</h3>
                  <div className="space-y-4">
                    <input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full rounded-xl border-2 border-cream-dark p-4 bg-canvas placeholder:text-navy/30 focus:border-purple focus:outline-none transition" placeholder="Name" />
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full rounded-xl border-2 border-cream-dark p-4 bg-canvas placeholder:text-navy/30 focus:border-purple focus:outline-none transition" placeholder="Email" />
                    <select value={form.type} onChange={e => set('type', e.target.value)} className="w-full rounded-xl border-2 border-cream-dark p-4 bg-canvas focus:border-purple focus:outline-none transition">
                      <option>Handmade Jewelry</option>
                      <option>Unique Art</option>
                      <option>Home Decor</option>
                      <option>Other Custom Piece</option>
                    </select>
                    <textarea required value={form.details} onChange={e => set('details', e.target.value)} className="w-full rounded-xl border-2 border-cream-dark p-4 bg-canvas placeholder:text-navy/30 h-28 focus:border-purple focus:outline-none transition" placeholder="Tell us what you want created..." />
                    <button type="submit" disabled={submitting} className="w-full bg-lime text-navy rounded-full py-4 font-black disabled:opacity-50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-lg" style={{ boxShadow: '6px 6px 0 #7a1fad' }}>
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
