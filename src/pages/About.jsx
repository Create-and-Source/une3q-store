import { Link } from 'react-router-dom'
import { Heart, Sun, ArrowRight, Fingerprint } from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen canvas-bg text-navy">
      <section className="hero-painted relative py-24 px-6 overflow-hidden">
        <div className="paint-splat top-[10%] left-[5%] w-[220px] h-[160px] rotate-[-12deg] opacity-40"
          style={{ background: 'radial-gradient(ellipse, rgba(167,201,0,0.5) 0%, transparent 65%)' }} />
        <div className="paint-splat bottom-[15%] right-[8%] w-[200px] h-[140px] rotate-[8deg] opacity-35"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.5) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-painted mb-4">About</span>
            <h1 className="font-display text-5xl md:text-7xl font-black mt-6 text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>UNE3Q</h1>
            <p className="text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mt-6" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>A creative studio dedicated to crafting unique, handmade pieces that celebrate individuality and self-expression.</p>
          </motion.div>
        </div>
      </section>

      {/* Paint drip edge */}
      <div className="paint-edge relative z-20" style={{ marginTop: '-1px' }}>
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: '35px' }}>
          <path d="M0,0 C80,45 160,8 240,28 C320,52 400,5 480,32 C560,55 640,12 720,35 C800,58 880,8 960,22 C1040,42 1120,5 1200,28 C1280,52 1360,18 1440,35 L1440,70 L0,70 Z" fill="#f5efe4" />
        </svg>
      </div>
      <div className="paint-divider" />

      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Fingerprint, title: 'Unique', desc: 'Every piece is one-of-a-kind, designed to reflect your personal style and story.', cls: 'icon-painted-purple' },
            { icon: Heart, title: 'Authentic', desc: 'Handcrafted with genuine passion and attention to detail in every stitch, stroke, and setting.', cls: 'icon-painted-blue' },
            { icon: Sun, title: 'Limitless', desc: 'No boundaries on creativity. If you can dream it, we can make it.', cls: 'icon-painted-lime' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div className="card-painted-round rounded-[2rem] p-8 text-center">
                  <div className={`w-16 h-16 rounded-full ${item.cls} flex items-center justify-center mx-auto mb-5`}>
                    <Icon size={28} className={i === 2 ? 'text-navy' : 'text-white'} />
                  </div>
                  <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                  <p className="text-navy/50 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="card-painted-round rounded-[2rem] p-8 md:p-12">
            <h2 className="font-display text-3xl font-black mb-6">Our Story</h2>
            <div className="text-navy/60 text-lg leading-relaxed space-y-5">
              <p>UNE3Q started from a simple belief: the things you surround yourself with should be as unique as you are. No mass production. No cookie-cutter designs. Just real art, made by hand, made by heart.</p>
              <p>From handmade jewelry to colorful wall art to home decor that makes a statement, everything we create is designed to help you express who you are. We believe creativity is a superpower, and we're here to help you wear it, display it, and live it.</p>
              <p>Whether you're shopping our collection or requesting a custom piece built just for you, you're getting something that no one else in the world has. That's the UNE3Q promise.</p>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/custom" className="inline-flex items-center gap-2 btn-painted-purple px-8 py-4 rounded-full font-black">
            Request a Custom Piece <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
