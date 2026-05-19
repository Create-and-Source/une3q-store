import { Link } from 'react-router-dom'
import { Sparkles, Heart, Sun, ArrowRight, Fingerprint } from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-canvas text-navy">
      {/* Hero */}
      <section className="hero-paint relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-royal/15 blur-[80px] translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-purple/15 blur-[60px] -translate-x-1/4" />
        <div className="absolute top-20 left-16 w-28 h-3 bg-lime/25 rounded-full rotate-[-15deg]" />
        <div className="absolute bottom-16 right-20 w-20 h-3 bg-purple/20 rounded-full rotate-[10deg]" />

        <div className="max-w-4xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="blob-purple text-xs tracking-[0.35em] uppercase mb-4 inline-block">About</span>
            <h1 className="font-display text-5xl md:text-7xl font-black mt-6">UNE3Q</h1>
            <p className="text-xl text-navy/50 leading-relaxed max-w-2xl mx-auto mt-6">
              A creative studio dedicated to crafting unique, handmade pieces that celebrate individuality and self-expression.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="paint-divider" />

      {/* Values */}
      <section className="canvas-bg max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Fingerprint, title: 'Unique', desc: 'Every piece is one-of-a-kind, designed to reflect your personal style and story.', color: 'bg-purple', shadow: '#7a1fad' },
            { icon: Heart, title: 'Authentic', desc: 'Handcrafted with genuine passion and attention to detail in every stitch, stroke, and setting.', color: 'bg-royal', shadow: '#063c86' },
            { icon: Sun, title: 'Limitless', desc: 'No boundaries on creativity. If you can dream it, we can make it.', color: 'bg-lime', shadow: '#a7c900' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div className="bg-white rounded-[2rem] p-8 border-2 border-cream-dark text-center" style={{ boxShadow: `6px 6px 0 ${item.shadow}` }}>
                  <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mx-auto mb-5`}>
                    <Icon size={28} className={item.title === 'Limitless' ? 'text-navy' : 'text-white'} />
                  </div>
                  <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                  <p className="text-navy/50 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Story */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="bg-white rounded-[2rem] p-8 md:p-12 border-2 border-cream-dark" style={{ boxShadow: '8px 8px 0 #7a1fad' }}>
            <h2 className="font-display text-3xl font-black mb-6">Our Story</h2>
            <div className="text-navy/60 text-lg leading-relaxed space-y-5">
              <p>
                UNE3Q started from a simple belief: the things you surround yourself with should be as unique as you are. No mass production. No cookie-cutter designs. Just real art, made by hand, made by heart.
              </p>
              <p>
                From handmade jewelry to colorful wall art to home decor that makes a statement, everything we create is designed to help you express who you are. We believe creativity is a superpower, and we're here to help you wear it, display it, and live it.
              </p>
              <p>
                Whether you're shopping our collection or requesting a custom piece built just for you, you're getting something that no one else in the world has. That's the UNE3Q promise.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/custom" className="inline-flex items-center gap-2 bg-purple text-white px-8 py-4 rounded-full font-black shadow-lg color-shadow hover:scale-105 transition-all">
            Request a Custom Piece <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
