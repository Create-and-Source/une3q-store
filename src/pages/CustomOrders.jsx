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
    e.preventDefault(); setSubmitting(true)
    await supabase.from('custom_requests').insert({ name: form.name, email: form.email, request_type: form.type, details: form.details })
    setSubmitted(true); setSubmitting(false)
  }

  return (
    <div className="min-h-screen text-navy relative">
      <img src="/textures/splat-1.png" alt="" className="paint-splat top-[8%] left-[5%] w-[250px] opacity-[0.06]" style={{ filter: 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(37deg)' }} />
      <img src="/textures/splat-4.png" alt="" className="paint-splat bottom-[12%] right-[8%] w-[220px] opacity-[0.05]" style={{ filter: 'invert(60%) sepia(100%) saturate(400%) hue-rotate(14deg)' }} />

      <section className="relative py-20 px-6">
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-painted mb-4">Custom Made</span>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-6 leading-tight mt-4 text-navy">
              Made with <span className="text-painted">passion.</span><br />
              Designed to <span className="brush-under brush-under-purple">stand out.</span>
            </h1>
            <p className="font-script text-2xl text-navy/70 mb-4 rotate-[-1deg]">One-on-one custom work that shows your individuality</p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[{ l: 'Handmade', i: Fingerprint, c: 'icon-painted-purple' }, { l: 'Heartfelt', i: Heart, c: 'icon-painted-blue' }, { l: 'One-of-a-Kind', i: Sun, c: 'icon-painted-lime' }].map(t => {
                const I = t.i
                return (<div key={t.l} className={`${t.c} ${t.c.includes('lime') ? 'text-navy' : 'text-white'} rounded-xl py-3 px-2 text-center`}><I size={16} className="mx-auto mb-1" /><p className="text-[10px] font-black uppercase tracking-wider">{t.l}</p></div>)
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="card-canvas rounded-[2rem] p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full icon-painted-lime flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-navy" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Request Sent!</h3>
                  <p className="text-navy/70">We'll be in touch within 24-48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-black mb-5">Custom Order Request</h3>
                  <div className="space-y-4">
                    <input required value={form.name} onChange={e => set('name', e.target.value)} className="input-painted w-full" placeholder="Name" />
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input-painted w-full" placeholder="Email" />
                    <select value={form.type} onChange={e => set('type', e.target.value)} className="input-painted w-full">
                      <option>Handmade Jewelry</option><option>Unique Art</option><option>Home Decor</option><option>Other Custom Piece</option>
                    </select>
                    <textarea required value={form.details} onChange={e => set('details', e.target.value)} className="input-painted w-full h-28" placeholder="Tell us what you want created..." />
                    <button type="submit" disabled={submitting} className="w-full btn-painted-lime rounded-full py-4 font-black disabled:opacity-50 flex items-center justify-center gap-2 text-lg">
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
