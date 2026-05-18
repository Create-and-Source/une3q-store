import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
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
    <div className="min-h-screen bg-[#f3eadb] text-[#071f47]">
      <section className="bg-[#071f47] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#7a1fad] opacity-40" />
        <div className="absolute -right-20 bottom-0 w-96 h-96 rounded-full bg-[#a7c900] opacity-30" />
        <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[#a7c900] font-black uppercase tracking-[0.35em] mb-3">Custom Made</p>
            <h1 className="text-4xl md:text-6xl font-black mb-6">Made with passion. Designed to stand out.</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Request one-on-one custom work for jewelry, wall art, handmade gifts, and home decor that shows your individuality.
            </p>
          </div>

          <div className="bg-white text-[#071f47] rounded-[2rem] p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="mx-auto mb-4 text-[#a7c900]" />
                <h3 className="text-2xl font-black mb-2">Request Sent!</h3>
                <p className="text-[#12345f]">We'll be in touch within 24-48 hours to discuss your custom piece.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-black mb-5">Custom Order Request</h3>
                <div className="space-y-4">
                  <input required value={form.name} onChange={e => set('name', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-4" placeholder="Name" />
                  <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-4" placeholder="Email" />
                  <select value={form.type} onChange={e => set('type', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-4">
                    <option>Handmade Jewelry</option>
                    <option>Unique Art</option>
                    <option>Home Decor</option>
                    <option>Other Custom Piece</option>
                  </select>
                  <textarea required value={form.details} onChange={e => set('details', e.target.value)} className="w-full rounded-xl border border-[#d9c8a6] p-4 h-28" placeholder="Tell us what you want created..." />
                  <button type="submit" disabled={submitting} className="w-full bg-[#a7c900] rounded-full py-4 font-black disabled:opacity-50">
                    {submitting ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
