import { useState } from 'react'
import { Mail, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-[#f3eadb] text-[#071f47]">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[#7a1fad] font-black uppercase tracking-[0.35em] mb-3">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-black">Contact Us</h1>
        </div>

        <div className="bg-white/70 rounded-[2rem] p-8 md:p-12 border border-[#d9c8a6] shadow-xl">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="mx-auto mb-4 text-[#a7c900]" />
              <h3 className="text-2xl font-black mb-2">Message Sent!</h3>
              <p className="text-[#12345f]">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input required placeholder="Name" className="rounded-xl border border-[#d9c8a6] p-4 bg-white" />
                <input required type="email" placeholder="Email" className="rounded-xl border border-[#d9c8a6] p-4 bg-white" />
              </div>
              <input required placeholder="Subject" className="w-full rounded-xl border border-[#d9c8a6] p-4 bg-white mb-4" />
              <textarea required placeholder="Your message..." className="w-full rounded-xl border border-[#d9c8a6] p-4 bg-white h-36 mb-4" />
              <button type="submit" className="w-full bg-[#063c86] text-white rounded-full py-4 font-black flex items-center justify-center gap-2">
                <Mail size={18} /> Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
