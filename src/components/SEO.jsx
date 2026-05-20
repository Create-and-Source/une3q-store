import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const BASE = 'https://une3q-store.vercel.app'

const pages = {
  '/': {
    title: 'UNE3Q LLC | Handmade Jewelry, Unique Art & Custom Home Decor',
    description: 'Shop one-of-a-kind handmade jewelry, unique art, and custom home decor from UNE3Q. Every piece is handcrafted with passion and designed to celebrate your individuality. Be You. Be UNE3Q.',
  },
  '/shop': {
    title: 'Shop Handmade Jewelry, Art & Home Decor | UNE3Q',
    description: 'Browse our collection of handcrafted jewelry, original art, and artisan home decor. Each piece is unique, made by hand with creativity and care. Free shipping on select items.',
  },
  '/custom': {
    title: 'Custom Orders | Request a One-of-a-Kind Piece | UNE3Q',
    description: 'Request a custom handmade piece from UNE3Q. Custom jewelry, personalized art, and bespoke home decor designed just for you. One-on-one design consultations available.',
  },
  '/about': {
    title: 'Our Vision | UNE3Q - Celebrating Individuality Through Handmade Art',
    description: 'UNE3Q was created from a simple belief - everyone deserves to express who they truly are. Founded by Kent Coyne with over 35 years of creative experience. Handmade jewelry, custom art, and home decor.',
  },
  '/contact': {
    title: 'Contact UNE3Q | Get in Touch About Custom Orders & Inquiries',
    description: 'Contact UNE3Q for custom order requests, questions about our handmade jewelry and art, or general inquiries. We love hearing from our community.',
  },
  '/cart': {
    title: 'Shopping Cart | UNE3Q',
    description: 'Review your UNE3Q shopping cart. Handmade jewelry, unique art, and custom home decor.',
  },
}

export default function SEO() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = pages[pathname] || pages['/']
    document.title = page.title

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(name.startsWith('og:') ? 'property' : 'name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', page.description)
    setMeta('og:title', page.title)
    setMeta('og:description', page.description)
    setMeta('og:url', `${BASE}${pathname}`)
    setMeta('og:type', pathname === '/shop' ? 'product.group' : 'website')
    setMeta('og:image', `${BASE}/logo.png`)
    setMeta('og:site_name', 'UNE3Q LLC')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${BASE}${pathname}`)
  }, [pathname])

  return null
}
