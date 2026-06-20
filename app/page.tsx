'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Plan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  badge: string
  outerBg: string
  badgeBg: string
  badgeText: string
  checkColor: string
  featured: boolean
  ctaFilled: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    id: 'essential',
    name: 'Essential plan',
    description: 'Perfect for small teams handling payments and transfers daily.',
    monthlyPrice: 299,
    yearlyPrice: 249,
    badge: 'Billed annually — save 15%',
    outerBg: '#CAD3FB',
    badgeBg: '#EDF0FF',
    badgeText: '#335CFF',
    checkColor: '#335CFF',
    featured: true,
    ctaFilled: true,
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description:
      'For small teams and startups sending, receiving and managing global payments.',
    monthlyPrice: 499,
    yearlyPrice: 449,
    badge: 'Billed annually — save 25%',
    outerBg: '#C9F5DC',
    badgeBg: '#E4FDF0',
    badgeText: '#15803D',
    checkColor: '#16A34A',
    featured: false,
    ctaFilled: false,
  },
  {
    id: 'global',
    name: 'Global plan',
    description:
      'Built for scaling companies with finance teams and compliance needs.',
    monthlyPrice: 649,
    yearlyPrice: 549,
    badge: 'Billed annually — save 45%',
    outerBg: '#E2D0FB',
    badgeBg: '#F3EAFF',
    badgeText: '#7C3AED',
    checkColor: '#9333EA',
    featured: false,
    ctaFilled: false,
  },
]

const FEATURES = [
  'Up to 10 team seats',
  'Role-based permissions',
  'Tracking dashboard',
  'Payment scheduling',
  'Priority email support',
  'Monthly finance reports',
]

// ─── Custom Cursor ────────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.08, ease: 'none' })
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.08, ease: 'none' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    let shown = false

    const onMove = (e: MouseEvent) => {
      if (!shown) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
        shown = true
      }
      xDot(e.clientX);  yDot(e.clientY)
      xRing(e.clientX); yRing(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('button, a')) {
        gsap.to(ring, { scale: 1.8, borderColor: '#335CFF', backgroundColor: 'rgba(51,92,255,0.08)', duration: 0.22, ease: 'power2.out' })
        gsap.to(dot,  { scale: 0, duration: 0.15 })
      }
    }

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('button, a')) {
        gsap.to(ring, { scale: 1, borderColor: 'rgba(23,23,23,0.28)', backgroundColor: 'transparent', duration: 0.28, ease: 'power2.out' })
        gsap.to(dot,  { scale: 1, duration: 0.2 })
      }
    }

    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.25 })
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.25 })

    window.addEventListener('mousemove',   onMove)
    window.addEventListener('mouseleave',  onLeave)
    window.addEventListener('mouseenter',  onEnter)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    return () => {
      window.removeEventListener('mousemove',   onMove)
      window.removeEventListener('mouseleave',  onLeave)
      window.removeEventListener('mouseenter',  onEnter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: 7, height: 7, borderRadius: '50%', backgroundColor: '#335CFF', pointerEvents: 'none', zIndex: 99999, willChange: 'transform' }} />
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: 34, height: 34, borderRadius: '50%', border: '1.5px solid rgba(23,23,23,0.28)', backgroundColor: 'transparent', pointerEvents: 'none', zIndex: 99998, willChange: 'transform' }} />
    </>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="6.5" cy="6.5" r="6.5" fill={color} fillOpacity="0.15" />
      <path
        d="M4 6.7L5.7 8.4L9 5"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// "Save 20%" — exact Figma asset (curved arrow + vectorized text)
function Save20Badge() {
  return (
    <svg width="89" height="17" viewBox="0 0 89 17" fill="none" aria-hidden="true">
      <path d="M0.065534 13.4348C-0.0711375 13.6747 0.0125853 13.98 0.252534 14.1167C0.492483 14.2534 0.797794 14.1697 0.934466 13.9297L0.5 13.6822L0.065534 13.4348ZM20.8536 4.03519C21.0488 3.83993 21.0488 3.52335 20.8536 3.32809L17.6716 0.146107C17.4763 -0.0491555 17.1597 -0.0491555 16.9645 0.146107C16.7692 0.341369 16.7692 0.657951 16.9645 0.853214L19.7929 3.68164L16.9645 6.51007C16.7692 6.70533 16.7692 7.02191 16.9645 7.21717C17.1597 7.41244 17.4763 7.41244 17.6716 7.21717L20.8536 4.03519ZM0.5 13.6822L0.934466 13.9297C3.18585 9.97705 10.1819 4.18164 20.5 4.18164V3.68164V3.18164C9.81806 3.18164 2.49252 9.17382 0.065534 13.4348L0.5 13.6822Z" fill="#335CFF"/>
      <path d="M37.2188 6.24698C37.1733 5.84357 36.9858 5.53107 36.6562 5.30948C36.3267 5.08505 35.9119 4.97283 35.4119 4.97283C35.054 4.97283 34.7443 5.02965 34.483 5.14329C34.2216 5.25408 34.0185 5.40749 33.8736 5.60352C33.7315 5.7967 33.6605 6.01687 33.6605 6.26403C33.6605 6.47141 33.7088 6.65039 33.8054 6.80096C33.9048 6.95153 34.0341 7.07795 34.1932 7.18022C34.3551 7.27965 34.5284 7.36346 34.7131 7.43164C34.8977 7.49698 35.0753 7.55096 35.2457 7.59357L36.098 7.81516C36.3764 7.88335 36.6619 7.97567 36.9545 8.09215C37.2472 8.20863 37.5185 8.36204 37.7685 8.55238C38.0185 8.74272 38.2202 8.97852 38.3736 9.25977C38.5298 9.54102 38.608 9.87766 38.608 10.2697C38.608 10.764 38.4801 11.2029 38.2244 11.5865C37.9716 11.97 37.6037 12.2725 37.1207 12.4941C36.6406 12.7157 36.0597 12.8265 35.3778 12.8265C34.7244 12.8265 34.1591 12.7228 33.6818 12.5154C33.2045 12.3081 32.831 12.014 32.5611 11.6333C32.2912 11.2498 32.142 10.7953 32.1136 10.2697H33.4347C33.4602 10.585 33.5625 10.8478 33.7415 11.0581C33.9233 11.2654 34.1548 11.4203 34.4361 11.5225C34.7202 11.622 35.0312 11.6717 35.3693 11.6717C35.7415 11.6717 36.0724 11.6135 36.3622 11.497C36.6548 11.3777 36.8849 11.2129 37.0526 11.0027C37.2202 10.7896 37.304 10.541 37.304 10.2569C37.304 9.9984 37.2301 9.78675 37.0824 9.62198C36.9375 9.45721 36.7401 9.32085 36.4901 9.21289C36.2429 9.10494 35.9631 9.00977 35.6506 8.92738L34.6193 8.64613C33.9205 8.45579 33.3665 8.17596 32.9574 7.80664C32.5511 7.43732 32.348 6.94869 32.348 6.34073C32.348 5.83789 32.4844 5.39897 32.7571 5.02397C33.0298 4.64897 33.3991 4.35778 33.8651 4.15039C34.331 3.94016 34.8565 3.83505 35.4418 3.83505C36.0327 3.83505 36.554 3.93874 37.0057 4.14613C37.4602 4.35352 37.8182 4.63903 38.0795 5.00266C38.3409 5.36346 38.4773 5.77823 38.4886 6.24698H37.2188ZM41.984 12.8265C41.5692 12.8265 41.1942 12.7498 40.859 12.5964C40.5238 12.4402 40.2582 12.2143 40.0621 11.9189C39.869 11.6234 39.7724 11.2612 39.7724 10.8322C39.7724 10.4629 39.8434 10.1589 39.9854 9.92028C40.1275 9.68164 40.3192 9.49272 40.5607 9.35352C40.8022 9.21431 41.0721 9.1092 41.3704 9.03817C41.6687 8.96715 41.9727 8.91317 42.2823 8.87624C42.6744 8.83079 42.9925 8.79386 43.2369 8.76545C43.4812 8.7342 43.6587 8.68448 43.7695 8.6163C43.8803 8.54812 43.9357 8.43732 43.9357 8.28391V8.25408C43.9357 7.88192 43.8306 7.59357 43.6204 7.38903C43.413 7.18448 43.1033 7.08221 42.6914 7.08221C42.2624 7.08221 41.9244 7.17738 41.6772 7.36772C41.4329 7.55522 41.2638 7.76403 41.1701 7.99414L39.9727 7.72141C40.1147 7.32369 40.3221 7.00266 40.5948 6.75835C40.8704 6.51119 41.1871 6.33221 41.5451 6.22141C41.9031 6.10778 42.2795 6.05096 42.6744 6.05096C42.9357 6.05096 43.2127 6.08221 43.5053 6.14471C43.8008 6.20437 44.0763 6.31516 44.332 6.47709C44.5906 6.63903 44.8022 6.87056 44.967 7.1717C45.1317 7.46999 45.2141 7.85778 45.2141 8.33505V12.6816H43.9698V11.7868H43.9187C43.8363 11.9515 43.7127 12.1135 43.5479 12.2725C43.3832 12.4316 43.1715 12.5637 42.913 12.6689C42.6545 12.774 42.3448 12.8265 41.984 12.8265ZM42.261 11.8038C42.6133 11.8038 42.9144 11.7342 43.1644 11.595C43.4173 11.4558 43.609 11.274 43.7397 11.0495C43.8732 10.8223 43.94 10.5794 43.94 10.3208V9.4771C43.8945 9.52255 43.8065 9.56516 43.6758 9.60494C43.5479 9.64187 43.4016 9.67454 43.2369 9.70295C43.0721 9.72852 42.9116 9.75266 42.7553 9.77539C42.5991 9.79528 42.4684 9.81232 42.3633 9.82653C42.1161 9.85778 41.8903 9.91033 41.6857 9.9842C41.484 10.0581 41.3221 10.1646 41.1999 10.3038C41.0806 10.4402 41.021 10.622 41.021 10.8493C41.021 11.1646 41.1374 11.4032 41.3704 11.5652C41.6033 11.7243 41.9002 11.8038 42.261 11.8038ZM52.2763 6.13619L49.9027 12.6816H48.5391L46.1612 6.13619H47.5291L49.1868 11.1731H49.255L50.9084 6.13619H52.2763ZM56.0721 12.8137C55.4272 12.8137 54.8718 12.676 54.4059 12.4004C53.9428 12.122 53.5849 11.7314 53.332 11.2285C53.082 10.7228 52.957 10.1305 52.957 9.45153C52.957 8.78107 53.082 8.19016 53.332 7.6788C53.5849 7.16744 53.9371 6.76829 54.3888 6.48136C54.8434 6.19442 55.3746 6.05096 55.9826 6.05096C56.3519 6.05096 56.7099 6.11204 57.0565 6.2342C57.4031 6.35636 57.7141 6.54812 57.9897 6.80948C58.2653 7.07085 58.4826 7.41033 58.6417 7.82795C58.8008 8.24272 58.8803 8.74698 58.8803 9.34073V9.79244H53.6772V8.83789H57.6317C57.6317 8.50266 57.5636 8.20579 57.4272 7.94727C57.2908 7.6859 57.0991 7.47994 56.8519 7.32937C56.6076 7.1788 56.3207 7.10352 55.9911 7.10352C55.6332 7.10352 55.3207 7.19158 55.0536 7.36772C54.7894 7.54102 54.5849 7.76829 54.44 8.04954C54.2979 8.32795 54.2269 8.6305 54.2269 8.95721V9.70295C54.2269 10.1404 54.3036 10.5126 54.457 10.8194C54.6133 11.1262 54.8306 11.3606 55.109 11.5225C55.3874 11.6816 55.7127 11.7612 56.0849 11.7612C56.3263 11.7612 56.5465 11.7271 56.7454 11.6589C56.9442 11.5879 57.1161 11.4828 57.261 11.3436C57.4059 11.2044 57.5167 11.0325 57.5934 10.8279L58.7994 11.0453C58.7028 11.4004 58.5295 11.7115 58.2795 11.9785C58.0323 12.2427 57.7212 12.4487 57.3462 12.5964C56.9741 12.7413 56.5494 12.8137 56.0721 12.8137ZM63.4528 12.6816V11.7271L66.4059 8.66744C66.7212 8.33505 66.9812 8.04386 67.1857 7.79386C67.3931 7.54102 67.5479 7.30096 67.6502 7.07369C67.7525 6.84641 67.8036 6.60494 67.8036 6.34925C67.8036 6.05948 67.7354 5.80948 67.5991 5.59925C67.4627 5.38619 67.2766 5.22283 67.0408 5.1092C66.805 4.99272 66.5394 4.93448 66.244 4.93448C65.9315 4.93448 65.6587 4.9984 65.4258 5.12624C65.1928 5.25408 65.0138 5.43448 64.8888 5.66744C64.7638 5.90039 64.7013 6.17312 64.7013 6.48562H63.4442C63.4442 5.95437 63.5664 5.48988 63.8107 5.09215C64.055 4.69442 64.3903 4.38619 64.8164 4.16744C65.2425 3.94584 65.7269 3.83505 66.2695 3.83505C66.8178 3.83505 67.3008 3.94442 67.7184 4.16317C68.1388 4.37908 68.467 4.67454 68.7028 5.04954C68.9386 5.4217 69.0565 5.84215 69.0565 6.3109C69.0565 6.63477 68.9954 6.95153 68.8732 7.26119C68.7539 7.57084 68.5451 7.91602 68.2468 8.2967C67.9485 8.67454 67.5337 9.13335 67.0025 9.67312L65.2681 11.4885V11.5524H69.1971V12.6816H63.4528ZM73.8505 12.8265C73.1772 12.8237 72.6019 12.6461 72.1246 12.2939C71.6474 11.9416 71.2823 11.4288 71.0295 10.7555C70.7766 10.0822 70.6502 9.27113 70.6502 8.32227C70.6502 7.37624 70.7766 6.568 71.0295 5.89755C71.2852 5.22709 71.6516 4.71573 72.1289 4.36346C72.609 4.01119 73.1829 3.83505 73.8505 3.83505C74.5181 3.83505 75.0906 4.01261 75.5678 4.36772C76.0451 4.71999 76.4102 5.23136 76.663 5.90181C76.9187 6.56942 77.0465 7.37624 77.0465 8.32227C77.0465 9.27397 76.9201 10.0865 76.6673 10.7598C76.4144 11.4302 76.0494 11.943 75.5721 12.2981C75.0948 12.6504 74.521 12.8265 73.8505 12.8265ZM73.8505 11.6887C74.4414 11.6887 74.9031 11.4004 75.2354 10.8237C75.5707 10.247 75.7383 9.41317 75.7383 8.32227C75.7383 7.59783 75.6616 6.98562 75.5082 6.48562C75.3576 5.98278 75.1403 5.60209 74.8562 5.34357C74.5749 5.08221 74.2397 4.95153 73.8505 4.95153C73.2624 4.95153 72.8008 5.2413 72.4656 5.82084C72.1303 6.40039 71.9613 7.2342 71.9585 8.32227C71.9585 9.04954 72.0337 9.6646 72.1843 10.1674C72.3377 10.6674 72.555 11.0467 72.8363 11.3052C73.1175 11.5609 73.4556 11.6887 73.8505 11.6887ZM83.1136 11.0453V10.585C83.1136 10.2555 83.1818 9.95437 83.3182 9.68164C83.4574 9.40607 83.6591 9.1859 83.9233 9.02113C84.1903 8.85352 84.5128 8.76971 84.8906 8.76971C85.277 8.76971 85.6009 8.85209 85.8622 9.01687C86.1236 9.18164 86.321 9.40181 86.4545 9.67738C86.5909 9.95295 86.6591 10.2555 86.6591 10.585V11.0453C86.6591 11.3748 86.5909 11.6774 86.4545 11.9529C86.3182 12.2257 86.1179 12.4458 85.8537 12.6135C85.5923 12.7782 85.2713 12.8606 84.8906 12.8606C84.5071 12.8606 84.1832 12.7782 83.919 12.6135C83.6548 12.4458 83.4545 12.2257 83.3182 11.9529C83.1818 11.6774 83.1136 11.3748 83.1136 11.0453ZM84.1065 10.585V11.0453C84.1065 11.2896 84.1648 11.5112 84.2812 11.71C84.3977 11.9089 84.6009 12.0083 84.8906 12.0083C85.1776 12.0083 85.3778 11.9089 85.4915 11.71C85.6051 11.5112 85.6619 11.2896 85.6619 11.0453V10.585C85.6619 10.3407 85.6065 10.1191 85.4957 9.92028C85.3878 9.72141 85.1861 9.62198 84.8906 9.62198C84.6065 9.62198 84.4048 9.72141 84.2855 9.92028C84.1662 10.1191 84.1065 10.3407 84.1065 10.585ZM78.7244 6.05096V5.59073C78.7244 5.26119 78.7926 4.95863 78.929 4.68306C79.0682 4.40749 79.2699 4.18732 79.5341 4.02255C79.8011 3.85778 80.1236 3.77539 80.5014 3.77539C80.8878 3.77539 81.2116 3.85778 81.473 4.02255C81.7344 4.18732 81.9318 4.40749 82.0653 4.68306C82.1989 4.95863 82.2656 5.26119 82.2656 5.59073V6.05096C82.2656 6.3805 82.1974 6.68306 82.0611 6.95863C81.9276 7.23136 81.7287 7.45153 81.4645 7.61914C81.2031 7.78391 80.8821 7.8663 80.5014 7.8663C80.1151 7.8663 79.7898 7.78391 79.5256 7.61914C79.2642 7.45153 79.0653 7.23136 78.929 6.95863C78.7926 6.68306 78.7244 6.3805 78.7244 6.05096ZM79.7216 5.59073V6.05096C79.7216 6.29528 79.7784 6.51687 79.892 6.71573C80.0085 6.9146 80.2116 7.01403 80.5014 7.01403C80.7855 7.01403 80.9844 6.9146 81.098 6.71573C81.2145 6.51687 81.2727 6.29528 81.2727 6.05096V5.59073C81.2727 5.34641 81.2173 5.12482 81.1065 4.92596C80.9957 4.72709 80.794 4.62766 80.5014 4.62766C80.2173 4.62766 80.0156 4.72709 79.8963 4.92596C79.7798 5.12482 79.7216 5.34641 79.7216 5.59073ZM79.1293 12.6816L85.1293 3.95437H86.1477L80.1477 12.6816H79.1293Z" fill="#335CFF"/>
    </svg>
  )
}

// ─── Billing Toggle (segmented control) ───────────────────────────────────────

function BillingToggle({
  isYearly,
  onToggle,
}: {
  isYearly: boolean
  onToggle: () => void
}) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '11px' }}>
      {/* Segmented control */}
      <div
        style={{
          display: 'inline-flex',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '2px',
          gap: '2px',
        }}
      >
        <button
          onClick={() => isYearly && onToggle()}
          style={{
            width: '96px',
            padding: '4px 12px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: !isYearly ? '#F7F7F7' : 'transparent',
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            fontWeight: 500,
            color: !isYearly ? '#5C5C5C' : '#A3A3A3',
            letterSpacing: '-0.084px',
            lineHeight: '20px',
            transition: 'all 0.2s ease',
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => !isYearly && onToggle()}
          style={{
            width: '96px',
            padding: '4px 12px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: isYearly ? '#F7F7F7' : 'transparent',
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            fontWeight: 500,
            color: isYearly ? '#5C5C5C' : '#A3A3A3',
            letterSpacing: '-0.084px',
            lineHeight: '20px',
            transition: 'all 0.2s ease',
          }}
        >
          Yearly
        </button>
      </div>

      {/* Save 20% — exact Figma asset */}
      <Save20Badge />
    </div>
  )
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────

const CARD_SHADOW =
  '0px 3px 3px -1.5px rgba(23,23,23,0.06), 0px 1px 1px -0.5px rgba(23,23,23,0.06), 0px 0px 0px 1px rgba(23,23,23,0.02)'

function PricingCard({ plan, isYearly }: { plan: Plan; isYearly: boolean }) {
  const [hovered, setHovered] = useState(false)
  const showColor = plan.featured || hovered
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice

  // ── Roll animation on price change ────────────────────────────────────────
  const [displayPrice, setDisplayPrice] = useState(price)
  const priceRef   = useRef<HTMLSpanElement>(null)
  const prevPrice  = useRef(price)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) { isFirstRun.current = false; return }

    const el = priceRef.current
    if (!el) return

    // Direction: price going down (yearly = cheaper) rolls down, up rolls up
    const goingDown = price < prevPrice.current
    prevPrice.current = price

    gsap.to(el, {
      y: goingDown ? 12 : -12,
      opacity: 0,
      duration: 0.14,
      ease: 'power2.in',
      onComplete: () => {
        setDisplayPrice(price)
        gsap.fromTo(el,
          { y: goingDown ? -12 : 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.18, ease: 'power2.out' }
        )
      },
    })
  }, [price])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        minWidth: 0,
        padding: '4px',
        borderRadius: '28px',
        backgroundColor: showColor ? plan.outerBg : 'transparent',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Badge — slides in when active */}
      <div
        style={{
          maxHeight: showColor ? '44px' : '0',
          opacity: showColor ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.25s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: showColor ? '8px 24px' : '0 24px',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '4px 10px 4px 8px',
            borderRadius: '7px',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'var(--font-inter)',
            backgroundColor: plan.badgeBg,
            color: plan.badgeText,
            whiteSpace: 'nowrap',
            lineHeight: '16px',
          }}
        >
          {plan.badge}
        </span>
      </div>

      {/* Inner white card */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '56px',
          boxShadow: CARD_SHADOW,
          border: plan.ctaFilled ? 'none' : '1px solid rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* ── Content: name / description / price / CTA ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Plan name + description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '18px',
                fontWeight: 500,
                color: '#171717',
                letterSpacing: '-0.198px',
                lineHeight: '24px',
              }}
            >
              {plan.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '20px',
                color: '#5C5C5C',
                letterSpacing: '-0.096px',
              }}
            >
              {plan.description}
            </p>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Overflow clip so the roll stays inside bounds */}
            <div style={{ overflow: 'hidden', height: '48px', display: 'flex', alignItems: 'center' }}>
              <span
                ref={priceRef}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-phudu)',
                  fontSize: '40px',
                  fontWeight: 600,
                  lineHeight: '48px',
                  color: '#171717',
                  letterSpacing: '-0.4px',
                  willChange: 'transform',
                }}
              >
                ${displayPrice}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#5C5C5C',
                  letterSpacing: '-0.084px',
                  lineHeight: '20px',
                }}
              >
                monthly
              </span>
              {isYearly && (
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#A3A3A3',
                    lineHeight: '16px',
                  }}
                >
                  billed annually
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <button
            style={{
              width: '100%',
              height: '36px',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'var(--font-inter)',
              cursor: 'pointer',
              letterSpacing: '-0.084px',
              lineHeight: '20px',
              transition: 'background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              border: showColor
                ? '1px solid rgba(255,255,255,0.12)'
                : '1px solid rgba(0,0,0,0.08)',
              backgroundColor: showColor ? '#335CFF' : 'transparent',
              color: showColor ? '#FFFFFF' : '#171717',
              boxShadow: showColor
                ? '0px 1px 2px 0px rgba(14,18,27,0.24), 0px 0px 0px 1px #335CFF'
                : 'none',
            }}
          >
            Start free trial
          </button>
        </div>

        {/* ── Detail: feature list ── */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FEATURES.map((f) => (
            <li
              key={f}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#5C5C5C',
                letterSpacing: '-0.084px',
                lineHeight: '20px',
              }}
            >
              <CheckIcon color={plan.checkColor} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'Can I change my plan at any time?',
    a: "Yes — upgrade or downgrade anytime from your dashboard. Changes take effect at the start of your next billing cycle, and we'll prorate any differences automatically.",
  },
  {
    q: 'What happens when my 14-day trial ends?',
    a: "You'll be prompted to pick a plan. Your data and settings are fully preserved throughout the trial and beyond. No charges apply until you confirm a plan.",
  },
  {
    q: 'How does team seat billing work?',
    a: 'Every plan includes up to 10 seats. Adding members beyond that is billed at a prorated rate for the remainder of your cycle, visible in your admin settings before you confirm.',
  },
  {
    q: 'Is our financial data secure and compliant?',
    a: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II certified and GDPR compliant, with dedicated audit logs on the Global plan.',
  },
  {
    q: 'Do you support multiple currencies?',
    a: 'All plans handle global currency transactions. The Global plan adds advanced multi-currency reconciliation, real-time FX rates, and monthly foreign-exchange reporting.',
  },
  {
    q: 'Can I cancel anytime?',
    a: "Absolutely. No long-term contracts, no cancellation fees. Cancel from your account settings and access continues until the end of your current billing period.",
  },
]

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

const CARD_SHADOW_SM =
  '0px 3px 3px -1.5px rgba(23,23,23,0.06), 0px 1px 1px -0.5px rgba(23,23,23,0.06), 0px 0px 0px 1px rgba(23,23,23,0.02)'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: CARD_SHADOW_SM,
        border: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      {/* Question row */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '20px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            fontWeight: 500,
            color: '#171717',
            letterSpacing: '-0.096px',
            lineHeight: '24px',
          }}
        >
          {q}
        </span>

        {/* Toggle icon — pill button from design system */}
        <span
          style={{
            flexShrink: 0,
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            backgroundColor: open ? '#335CFF' : '#F7F7F7',
            border: open ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
            boxShadow: open
              ? '0px 1px 2px 0px rgba(14,18,27,0.24), 0px 0px 0px 1px #335CFF'
              : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transition: 'transform 0.25s ease',
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            <path
              d="M6 1V11M1 6H11"
              stroke={open ? '#FFFFFF' : '#171717'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {/* Answer — slides open */}
      <div
        style={{
          maxHeight: open ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 400,
            color: '#5C5C5C',
            lineHeight: '24px',
            letterSpacing: '-0.084px',
            padding: '0 24px 20px',
          }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  return (
    <section
      style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '80px 24px 100px',
      }}
    >
      {/* Divider */}
      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#E9E6E6',
          marginBottom: '80px',
        }}
      />

      <div className="faq-layout">

        {/* Left — sticky header */}
        <div className="faq-header">
          {/* Badge */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#F7F7F7',
              borderRadius: '9px',
              padding: '4px 10px 4px 8px',
              fontFamily: 'var(--font-inter)',
              fontSize: '14px',
              fontWeight: 500,
              color: '#5C5C5C',
              letterSpacing: '-0.084px',
              lineHeight: '20px',
              marginBottom: '14px',
            }}
          >
            Common Questions
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-phudu)',
              fontSize: '48px',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.6px',
              color: '#171717',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Got a<br />question?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              fontWeight: 400,
              color: '#A3A3A3',
              lineHeight: '24px',
              letterSpacing: '-0.096px',
              marginBottom: '32px',
              maxWidth: '260px',
            }}
          >
            <span style={{ color: '#5C5C5C' }}>{"Can't find what you're looking for?"}</span>{' '}
            Reach out to our team directly.
          </p>

          {/* CTA buttons — design system */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              style={{
                height: '36px',
                padding: '8px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                backgroundColor: '#335CFF',
                color: '#FFFFFF',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '-0.084px',
                cursor: 'pointer',
                boxShadow: '0px 1px 2px 0px rgba(14,18,27,0.24), 0px 0px 0px 1px #335CFF',
              }}
            >
              Contact support
            </button>
            <button
              style={{
                height: '36px',
                padding: '8px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.08)',
                backgroundColor: 'transparent',
                color: '#171717',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '-0.084px',
                cursor: 'pointer',
              }}
            >
              View all docs
            </button>
          </div>
        </div>

        {/* Right — accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>

      <style>{`
        .faq-layout {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .faq-header {
          flex-shrink: 0;
        }
        @media (min-width: 1024px) {
          .faq-layout {
            flex-direction: row;
            align-items: flex-start;
            gap: 80px;
          }
          .faq-header {
            width: 300px;
            position: sticky;
            top: 40px;
          }
        }
      `}</style>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true)

  const badgeRef    = useRef<HTMLDivElement>(null)
  const h1Ref       = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const toggleRef   = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)
  const footerRef   = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const cards = cardsRef.current ? Array.from(cardsRef.current.children) : []

    gsap.set(
      [badgeRef.current, h1Ref.current, subtitleRef.current, toggleRef.current, footerRef.current],
      { y: 20, opacity: 0 }
    )
    gsap.set(cards, { y: 48, opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .to(badgeRef.current,    { y: 0, opacity: 1, duration: 0.5 },  0.1)
      .to(h1Ref.current,       { y: 0, opacity: 1, duration: 0.65 }, 0.22)
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.5 },  0.38)
      .to(toggleRef.current,   { y: 0, opacity: 1, duration: 0.45 }, 0.5)
      .to(cards,               { y: 0, opacity: 1, duration: 0.65, stagger: 0.12 }, 0.62)
      .to(footerRef.current,   { y: 0, opacity: 1, duration: 0.4 },  1.1)

    return () => { tl.kill() }
  }, [])

  return (
    <>
    <CustomCursor />
    <main
      style={{
        paddingTop: '120px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>

          {/* Plans & Pricing badge */}
          <div ref={badgeRef} style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#F7F7F7',
                borderRadius: '9px',
                padding: '4px 10px 4px 8px',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                fontWeight: 500,
                color: '#5C5C5C',
                letterSpacing: '-0.084px',
                lineHeight: '20px',
              }}
            >
              Plans &amp; Pricing
            </span>
          </div>

          <h1
            ref={h1Ref}
            style={{
              fontFamily: 'var(--font-phudu)',
              fontSize: '60px',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.6px',
              color: '#171717',
              textTransform: 'uppercase',
              maxWidth: '511px',
              margin: '0 auto 24px',
            }}
          >
            Flexible Pricing For
            <br />
            Growing Banks
          </h1>

          <p
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              fontWeight: 500,
              maxWidth: '359px',
              margin: '0 auto',
              lineHeight: '24px',
              letterSpacing: '-0.176px',
            }}
          >
            {/* Figma: first half #A3A3A3 (light), second half #5C5C5C (darker) */}
            <span style={{ color: '#A3A3A3' }}>Optimize payment accuracy and manage </span>
            <span style={{ color: '#5C5C5C' }}>transfers with secure workflows.</span>
          </p>
        </div>

        {/* Billing Toggle */}
        <div ref={toggleRef} style={{ display: 'flex', justifyContent: 'center', marginBottom: '82px' }}>
          <BillingToggle isYearly={isYearly} onToggle={() => setIsYearly((v) => !v)} />
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="cards-row">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>

        {/* Footer note */}
        <p
          ref={footerRef}
          style={{
            textAlign: 'center',
            marginTop: '40px',
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            fontWeight: 500,
            color: 'rgba(92,92,92,0.8)',
            lineHeight: '24px',
          }}
        >
          All plans include a 14-day free trial. No credit card required.{' '}
          <span style={{ color: '#555555' }}>Questions?</span>{' '}
          <a
            href="#"
            style={{ color: '#335CFF', fontWeight: 500, textDecoration: 'none' }}
          >
            See our FAQ →
          </a>
        </p>
      </div>

      {/* ── FAQ Section ─────────────────────────────────────────────────────── */}
      <FAQSection />

      <style>{`
        .cards-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        @media (min-width: 1024px) {
          .cards-row {
            flex-direction: row;
            align-items: stretch;
            gap: 16px;
          }
        }
      `}</style>
    </main>
    </>
  )
}
