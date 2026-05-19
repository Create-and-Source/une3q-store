import { Link } from 'react-router-dom'
import { Sparkles, Heart, Sun, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-navy-deep text-white">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-purple-deep/30 to-navy-deep" />
        <div className="absolute -left-32 top-0 w-96 h-96 rounded-full bg-purple/15 blur-[100px]" />
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-lime/10 blur-[80px]" />
        <div className="absolute top-0 left-0 right-0 gold-line" />
        <div className="absolute top-20 right-20 w-48 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="max-w-4xl mx-auto relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold tracking-[0.4em] uppercase text-sm font-bold mb-4">About</p>
            <h1 className="font-display text-5xl md:text-7xl font-black mb-6">Be you, Be UNE3Q</h1>
            <p className="text-xl text-white/50 leading-relaxed max-w-2xl mx-auto">
              A creative studio dedicated to crafting unique, handmade pieces that celebrate individuality and self-expression.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="gold-line" />

      {/* Values */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Sparkles, title: 'Unique', desc: 'Every piece is one-of-a-kind, designed to reflect your personal style and story.', color: 'from-purple to-purple-deep' },
            { icon: Heart, title: 'Authentic', desc: 'Handcrafted with genuine passion and attention to detail in every stitch, stroke, and setting.', color: 'from-royal to-navy' },
            { icon: Sun, title: 'Limitless', desc: 'No boundaries on creativity. If you can dream it, we can make it.', color: 'from-lime/80 to-lime' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div className="art-card bg-white/[0.03] backdrop-blur-sm rounded-[2rem] p-8 border border-white/10 text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5`}>
                    <Icon size={28} className={item.title === 'Limitless' ? 'text-navy' : 'text-white'} />
                  </div>
                  <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Story */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-[2rem] p-8 md:p-12 border border-white/10">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-8 w-16 h-px bg-gradient-to-r from-gold/60 to-transparent" />
            <div className="absolute top-0 left-8 w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />
            <div className="absolute bottom-0 right-8 w-16 h-px bg-gradient-to-l from-gold/60 to-transparent" />
            <div className="absolute bottom-0 right-8 w-px h-16 bg-gradient-to-t from-gold/60 to-transparent" />

            <h2 className="font-display text-3xl font-black mb-6">Our Story</h2>
            <div className="text-white/60 text-lg leading-relaxed space-y-5">
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
          <Link to="/custom" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple to-purple-deep text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-purple/30 hover:scale-105 transition-all border border-purple-light/30">
            Request a Custom Piece <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
