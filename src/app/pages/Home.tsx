import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Users, PenTool, Hammer, CheckCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

/* ── Scroll-reveal hook ─────────────────────────────────────────── */
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

/* ── Data ───────────────────────────────────────────────────────── */
const stats = [
  { value: "500+", label: "Projects Completed", sub: "Across luxury residential and commercial spaces" },
  { value: "15+",  label: "Years Experience",    sub: "Decades of refined expertise in premium design" },
  { value: "98%",  label: "Client Satisfaction", sub: "Consistently exceeding every expectation" },
  { value: "50+",  label: "Luxury Properties",   sub: "Signature homes designed across California" },
];

const projects = [
  {
    id: 1,
    title: "Malibu Villa Renovation",
    category: "Full Home Renovations",
    desc: "A sweeping transformation of a 5,000 sq ft coastal property into a serene retreat.",
    img: "photo-1724582586529-62622e50c0b3",
  },
  {
    id: 2,
    title: "Beverly Hills Living Room",
    category: "Luxury Living Rooms",
    desc: "Open-plan living with custom millwork, bespoke furnishings, and curated art.",
    img: "photo-1646987916641-1f3c8992daa2",
  },
  {
    id: 3,
    title: "Marble Kitchen Suite",
    category: "Modern Kitchens",
    desc: "Calacatta marble surfaces and handcrafted cabinetry redefine culinary luxury.",
    img: "photo-1682888813913-e13f18692019",
  },
  {
    id: 4,
    title: "Master Bedroom Sanctuary",
    category: "Premium Bedrooms",
    desc: "A serene retreat with custom headboard, ambient lighting, and bespoke closets.",
    img: "photo-1616594092403-fb65629b0a46",
  },
  {
    id: 5,
    title: "Bel Air Exterior Revival",
    category: "Exterior Transformations",
    desc: "Modernized curb appeal with curated landscaping and architectural stone cladding.",
    img: "photo-1613490493576-7fde63acd811",
  },
];

const steps = [
  { num: "01", Icon: Users,        title: "Consultation",          desc: "We begin by deeply understanding your vision, lifestyle, and aspirations for the space." },
  { num: "02", Icon: PenTool,      title: "Design Planning",       desc: "Our designers craft bespoke concepts, layouts, and material boards tailored to your brief." },
  { num: "03", Icon: Hammer,       title: "Construction & Styling", desc: "We execute the approved design using premium materials and master craftsmen." },
  { num: "04", Icon: CheckCircle,  title: "Final Reveal",           desc: "The finished space is handed over — polished, complete, and ready to be lived in." },
];

const UNSPLASH = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

/* ── Component ──────────────────────────────────────────────────── */
export default function Home() {
  /* Carousel */
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(timer);
    };
  }, [emblaApi]);

  /* Scroll reveals */
  const statsReveal   = useInView();
  const portfolioReveal = useInView();
  const processReveal = useInView();
  const ctaReveal     = useInView();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-[#F5F5F5] grid grid-cols-1 lg:grid-cols-2 pt-20">
        {/* Left — copy */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-0">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-7 font-medium">
            Premium Interior Design &amp; Construction
          </p>
          <h1
            className="text-[clamp(2.6rem,5vw,4.5rem)] font-normal leading-[1.1] tracking-tight text-[#1A1A1A] mb-7"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            Luxury Spaces<br />
            <em className="not-italic text-[#2B2B2B]">Crafted for</em><br />
            Modern Living
          </h1>
          <p className="text-base text-[#717171] leading-relaxed max-w-md mb-10">
            We transform ordinary houses into timeless masterpieces through exceptional
            design and uncompromising craftsmanship.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase px-7 py-4 bg-[#D4AF37] text-white hover:bg-[#B8952A] transition-colors duration-200"
            >
              Book Consultation
              <ArrowRight size={14} />
            </Link>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase px-7 py-4 border border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white transition-colors duration-200"
            >
              View Portfolio
            </a>
          </div>

          {/* Mini stats bar */}
          <div className="flex gap-10 mt-16 pt-8 border-t border-border">
            {[["500+", "Projects"], ["15+", "Years"], ["98%", "Satisfaction"]].map(([v, l]) => (
              <div key={l}>
                <div
                  className="text-2xl font-semibold text-[#1A1A1A]"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  {v}
                </div>
                <div className="text-[11px] tracking-wide text-[#717171] uppercase mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — images */}
        <div className="relative hidden lg:grid grid-rows-2 gap-3 p-6 bg-[#F0EFE9]">
          <div className="relative overflow-hidden bg-[#E8E4DA]">
            <img
              src={UNSPLASH("photo-1564078516393-cf04bd966897", 800, 560)}
              alt="Elegant luxury interior with chaise lounge"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden bg-[#E8E4DA] ml-12">
            <img
              src={UNSPLASH("photo-1724582586529-62622e50c0b3", 800, 560)}
              alt="Modern living room with floor-to-ceiling windows"
              className="w-full h-full object-cover"
            />
            {/* floating badge */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-4">
              <div
                className="text-xl font-semibold text-[#1A1A1A]"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              >
                50+
              </div>
              <div className="text-[10px] tracking-wide text-[#717171] uppercase">Luxury properties</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="bg-[#2B2B2B] py-16 lg:py-20">
        <div
          ref={statsReveal.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#2B2B2B] px-8 py-10 group hover:bg-[#222] transition-colors duration-200"
              >
                <div
                  className="text-[clamp(2rem,3vw,2.8rem)] font-semibold text-[#D4AF37] leading-none mb-3"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  {s.value}
                </div>
                <div className="text-sm font-medium text-white mb-2">{s.label}</div>
                <div className="text-xs text-[#717171] leading-relaxed">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Partner logos row */}
          <div className="mt-12 pt-10 border-t border-white/8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {["Architectural Digest", "Houzz", "Elle Décor", "Dwell", "Interior Design"].map((name) => (
              <span
                key={name}
                className="text-[11px] tracking-[0.2em] uppercase text-[#555] hover:text-[#9a9a9a] transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO CAROUSEL ───────────────────────────────────── */}
      <section id="portfolio" className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div
          ref={portfolioReveal.ref}
          className={`transition-all duration-700 ${
            portfolioReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Section header */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12 flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-medium">
                Our Work
              </p>
              <h2
                className="text-[clamp(1.8rem,3.5vw,3rem)] font-normal text-[#1A1A1A] leading-tight"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              >
                Signature Projects
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={scrollPrev}
                className="w-11 h-11 border border-border flex items-center justify-center text-[#717171] hover:border-[#2B2B2B] hover:text-[#1A1A1A] transition-colors duration-200"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                className="w-11 h-11 border border-border flex items-center justify-center text-[#717171] hover:border-[#2B2B2B] hover:text-[#1A1A1A] transition-colors duration-200"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div ref={emblaRef} className="overflow-hidden px-6 lg:px-12">
            <div className="flex gap-5" style={{ marginLeft: "calc(max(0px, (100vw - 1280px) / 2) * -1 + 0px)" }}>
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex-none w-[min(80vw,340px)] md:w-[min(50vw,420px)] lg:w-[min(35vw,480px)] group"
                >
                  <div className="overflow-hidden bg-[#E8E4DA] aspect-[4/3]">
                    <img
                      src={UNSPLASH(p.img, 960, 720)}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="pt-5 pb-2">
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] mb-2">
                      {p.category}
                    </div>
                    <h3
                      className="text-xl font-normal text-[#1A1A1A] mb-2"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm text-[#717171] leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-8 h-1.5 bg-[#D4AF37]"
                    : "w-1.5 h-1.5 bg-border hover:bg-[#717171]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div
          ref={processReveal.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            processReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="mb-14">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-medium">
              How We Work
            </p>
            <h2
              className="text-[clamp(1.8rem,3.5vw,3rem)] font-normal text-[#1A1A1A]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+0px)] w-full h-px bg-border z-0" />
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="text-[11px] tracking-[0.2em] text-[#D4AF37] font-medium"
                    >
                      {step.num}
                    </div>
                    <div className="h-px flex-1 bg-[#F5E6A8]" />
                    <div className="w-10 h-10 bg-[#F5E6A8] flex items-center justify-center">
                      <step.Icon size={16} className="text-[#2B2B2B]" />
                    </div>
                  </div>
                  <h3
                    className="text-xl font-normal text-[#1A1A1A] mb-3"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#717171] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="relative py-28 lg:py-40 overflow-hidden bg-[#1e1e1e]">
        <img
          src={UNSPLASH("photo-1628745277862-bc0b2d68c50c", 1600, 800)}
          alt="Luxury kitchen interior"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/60 to-[#1e1e1e]/80" />

        <div
          ref={ctaReveal.ref}
          className={`relative max-w-3xl mx-auto px-6 lg:px-12 text-center transition-all duration-700 ${
            ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-6 font-medium">
            Get Started
          </p>
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] font-normal text-white leading-tight mb-6"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            Ready to Transform<br />Your Home?
          </h2>
          <p className="text-base text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Get a personalized estimate and discover how we can bring your dream space to life
            — from concept to final reveal.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase px-8 py-4 bg-[#D4AF37] text-white hover:bg-[#B8952A] transition-colors duration-200"
          >
            Request Free Estimate
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
