import { Link } from 'react-router-dom'
import { Heart, Sun, ArrowRight, Fingerprint } from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen text-navy relative overflow-hidden">
      <div className="wash-purple" style={{ top: '-10%', left: '-10%' }} />
      <div className="wash-blue" style={{ top: '30%', right: '-15%' }} />
      <div className="wash-gold" style={{ bottom: '-5%', left: '20%' }} />

      <section className="relative py-24 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-painted mb-4">Our Vision</span>
            <h1 className="font-display text-5xl md:text-7xl font-black mt-6 text-navy">Our Vision</h1>
            <p className="text-xl text-navy/60 leading-relaxed max-w-2xl mx-auto mt-6">Everyone deserves the opportunity to express who they truly are.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><div className="paint-divider" /></div>

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
                <div className="card-canvas rounded-[2rem] p-8 text-center">
                  <div className={`w-16 h-16 rounded-full ${item.cls} flex items-center justify-center mx-auto mb-5`}>
                    <Icon size={28} className={i === 2 ? 'text-navy' : 'text-white'} />
                  </div>
                  <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                  <p className="text-navy/60 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="card-canvas rounded-[2rem] p-8 md:p-12">
            <h2 className="font-display text-3xl font-black mb-6">Our <span className="brush-under brush-under-purple">Vision</span></h2>
            <div className="text-navy/70 text-lg leading-relaxed space-y-5">
              <p>UNE3Q was created from a simple belief — everyone deserves the opportunity to express who they truly are. In a world filled with mass-produced products and copy-and-paste styles, we wanted to build something different. Something personal. Something meaningful.</p>
              <p>At UNE3Q, we create handmade jewelry, custom art, and home decor designed to celebrate individuality. Every piece is created with creativity, passion, and purpose, blending traditional craftsmanship with modern design techniques to bring unique ideas to life. Whether it's a custom jewelry set inspired by a favorite outfit, a storytelling charm bracelet, or a one-of-a-kind art piece for your home, our goal is always the same: create something that feels authentically you.</p>
              <p>Founded by Kent Coyne, UNE3Q is built on over 35 years of hands-on creative experience working with a wide variety of materials and artistic styles. What started as a passion for creating has grown into a vision for a worldwide brand centered around originality, connection, and self-expression.</p>
              <p>We believe handcrafted products should never feel generic. That's why we focus on personal touches, organic design, and working closely with our customers to create pieces that stand apart from the ordinary. Our mission is not just to sell products — it's to help people tell their stories through art, jewelry, and design.</p>
              <p>As UNE3Q continues to grow, our commitment remains the same: to create high-quality, personalized pieces that inspire confidence, creativity, and individuality.</p>
              <p className="font-display text-2xl font-black text-navy mt-4">Be You. Be UNE3Q.</p>
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
