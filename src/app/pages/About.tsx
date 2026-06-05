import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Star, Award, Layers, Shield, Zap } from "lucide-react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const UNSPLASH = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const values = [
  { Icon: Award,   title: "Quality",     desc: "We source premium materials and employ master craftsmen — every detail is deliberate." },
  { Icon: Layers,  title: "Innovation",  desc: "We merge timeless design principles with forward-thinking construction techniques." },
  { Icon: Shield,  title: "Integrity",   desc: "Transparent pricing, honest timelines, and a commitment to our word on every project." },
  { Icon: Zap,     title: "Excellence",  desc: "We hold ourselves to the highest standard, from the first sketch to the final reveal." },
];

const testimonials = [
  {
    name: "Catherine Whitmore",
    role: "Homeowner, Bel Air",
    text: "Apex completely transformed our home. The attention to detail was extraordinary — every room feels like it belongs in a design magazine. The team's professionalism throughout the process was unmatched.",
    rating: 5,
    avatar: "photo-1494790108377-be9c29b29330",
  },
  {
    name: "Marcus Aldridge",
    role: "Property Developer, Santa Monica",
    text: "We've worked with many design firms, but Apex operates on a different level. They understood our vision immediately, executed flawlessly, and delivered on time. Exceptional craftsmanship from start to finish.",
    rating: 5,
    avatar: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Sophia Renner",
    role: "Interior Enthusiast, Malibu",
    text: "The kitchen renovation exceeded every expectation. Apex suggested materials I had never considered, and the result is breathtaking. Our guests always ask who designed it. Worth every penny.",
    rating: 5,
    avatar: "photo-1438761681033-6461ffad8d80",
  },
  {
    name: "Jonathan Park",
    role: "Architect, Beverly Hills",
    text: "As an architect myself, I am highly selective. Apex's ability to translate complex design intent into flawless execution is rare. I have referred them to multiple clients without hesitation.",
    rating: 5,
    avatar: "photo-1472099645785-5658abf4ff4e",
  },
];

export default function About() {
  const storyReveal    = useInView();
  const valuesReveal   = useInView();
  const reviewsReveal  = useInView();

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────── */}
      <section className="pt-32 pb-16 lg:pb-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-5 font-medium">
            Our Story
          </p>
          <h1
            className="text-[clamp(2.2rem,5vw,4rem)] font-normal text-[#1A1A1A] leading-tight max-w-2xl"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            Building Luxury Through Design Excellence
          </h1>
        </div>
      </section>

      {/* ── ABOUT STORY ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F5F5F5]">
        <div
          ref={storyReveal.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            storyReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left — image */}
          <div className="relative">
            <div className="overflow-hidden bg-[#E8E4DA] aspect-[4/5]">
              <img
                src={UNSPLASH("photo-1721815693498-cc28507c0ba2", 900, 1125)}
                alt="Apex Modern Builders showcase — contemporary luxury residence"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 bg-[#F5E6A8] px-8 py-6 hidden lg:block">
              <div
                className="text-3xl font-semibold text-[#1A1A1A]"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              >
                2009
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#717171] mt-1">
                Established
              </div>
            </div>
          </div>

          {/* Right — copy */}
          <div className="lg:pl-8">
            <p className="text-base text-[#717171] leading-relaxed mb-8">
              Apex Modern Builders was founded in 2009 with a single conviction: that every home
              deserves to be a masterpiece. We specialize in transforming residential spaces through
              innovative design, premium craftsmanship, and meticulous attention to detail.
            </p>
            <p className="text-base text-[#717171] leading-relaxed mb-10">
              From intimate bedroom sanctuaries to sweeping full-home renovations, our work spans
              Los Angeles and beyond — each project a testament to our belief that exceptional design
              elevates the way people live.
            </p>

            {/* Mission + Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-6 border border-border">
                <div className="text-[10px] tracking-[0.22em] uppercase text-[#D4AF37] mb-3 font-medium">
                  Our Mission
                </div>
                <p className="text-sm text-[#717171] leading-relaxed">
                  To create spaces that are not just visually striking, but that resonate with the
                  way our clients truly wish to live.
                </p>
              </div>
              <div className="bg-[#2B2B2B] p-6">
                <div className="text-[10px] tracking-[0.22em] uppercase text-[#F5E6A8] mb-3 font-medium">
                  Our Vision
                </div>
                <p className="text-sm text-[#9a9a9a] leading-relaxed">
                  To be California's most trusted luxury design and build firm — where craft,
                  integrity, and beauty converge.
                </p>
              </div>
            </div>

            <Link
              to="/book"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase px-7 py-4 bg-[#D4AF37] text-white hover:bg-[#B8952A] transition-colors duration-200"
            >
              Work With Us
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div
          ref={valuesReveal.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            valuesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="mb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-medium">
              What We Stand For
            </p>
            <h2
              className="text-[clamp(1.8rem,3.5vw,3rem)] font-normal text-[#1A1A1A]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {values.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white px-8 py-10 group hover:bg-[#F5F5F5] transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-[#F5E6A8] flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-200">
                  <Icon size={16} className="text-[#2B2B2B]" />
                </div>
                <h3
                  className="text-xl font-normal text-[#1A1A1A] mb-3"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[#717171] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div
          ref={reviewsReveal.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            reviewsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-medium">
                Client Stories
              </p>
              <h2
                className="text-[clamp(1.8rem,3.5vw,3rem)] font-normal text-[#1A1A1A]"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              >
                Reviews &amp; Testimonials
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div
                  className="text-3xl font-semibold text-[#1A1A1A]"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  4.9
                </div>
                <div className="flex gap-0.5 justify-end mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <div className="text-[10px] tracking-wide text-[#717171] uppercase mt-1">
                  500+ Happy Clients
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white p-8 border border-border hover:border-[#D4AF37]/30 transition-colors duration-200">
                {/* Stars */}
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p
                  className="text-base text-[#1A1A1A] leading-relaxed mb-7"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 overflow-hidden bg-[#E8E4DA] rounded-full">
                    <img
                      src={UNSPLASH(t.avatar, 80, 80)}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1A1A1A]">{t.name}</div>
                    <div className="text-xs text-[#717171] mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#2B2B2B]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.3) 39px, rgba(255,255,255,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.3) 39px, rgba(255,255,255,0.3) 40px)"
          }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-6 font-medium">
            Begin Your Project
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3.2rem)] font-normal text-white leading-tight mb-6"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            Let&apos;s Create Something<br />Extraordinary Together
          </h2>
          <p className="text-base text-white/50 mb-10 max-w-lg mx-auto leading-relaxed">
            Whether you have a vision or need one — our design consultants are ready to turn
            your home into the space you&apos;ve always deserved.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase px-8 py-4 bg-[#D4AF37] text-white hover:bg-[#B8952A] transition-colors duration-200"
          >
            Book a Consultation
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
