import { Link } from 'react-router-dom'
import { Sparkles, Heart, Sun } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-[#f3eadb] text-[#071f47]">
      <section className="bg-[#071f47] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute -left-20 top-0 w-80 h-80 rounded-full bg-[#7a1fad] opacity-30" />
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-[#a7c900] opacity-20" />
        <div className="max-w-4xl mx-auto relative text-center">
          <p className="text-[#a7c900] font-black uppercase tracking-[0.35em] mb-3">About</p>
          <h1 className="text-4xl md:text-6xl font-black mb-6">Be you, Be UNE3Q</h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            UNE3Q LLC is a creative studio dedicated to crafting unique, handmade pieces that celebrate individuality and self-expression.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Sparkles, title: 'Unique', desc: 'Every piece is one-of-a-kind, designed to reflect your personal style and story.' },
            { icon: Heart, title: 'Authentic', desc: 'Handcrafted with genuine passion and attention to detail in every stitch, stroke, and setting.' },
            { icon: Sun, title: 'Limitless', desc: 'No boundaries on creativity. If you can dream it, we can make it.' },
          ].map(item => {
            const Icon = item.icon
            return (
              <div key={item.title} className="bg-white/70 rounded-[2rem] p-8 shadow-xl border border-[#d9c8a6] text-center">
                <div className="w-16 h-16 rounded-full bg-[#063c86] flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-[#a7c900]" />
                </div>
                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-[#12345f] leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-white/70 rounded-[2rem] p-8 md:p-12 border border-[#d9c8a6] shadow-xl">
          <h2 className="text-3xl font-black mb-6">Our Story</h2>
          <div className="text-[#12345f] text-lg leading-relaxed space-y-4">
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

        <div className="text-center mt-12">
          <Link to="/custom" className="inline-block bg-[#7a1fad] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition">
            Request a Custom Piece
          </Link>
        </div>
      </section>
    </div>
  )
}
