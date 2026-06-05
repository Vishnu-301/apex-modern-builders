import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, ChevronDown } from "lucide-react";

function useInView(threshold = 0.1) {
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

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  date: string;
  description: string;
};

const serviceOptions = [
  "Interior Design Consultation",
  "Full Home Renovation",
  "Luxury Living Room Design",
  "Kitchen Remodeling",
  "Bedroom Transformation",
  "Exterior Makeover",
  "Custom Project",
];

const packages = [
  {
    name: "Basic Consultation",
    price: "$299",
    period: "per session",
    highlight: false,
    items: [
      "Initial 90-minute consultation",
      "Design recommendations",
      "Preliminary project estimate",
    ],
  },
  {
    name: "Premium Design Package",
    price: "$1,499",
    period: "all-inclusive",
    highlight: true,
    items: [
      "Full consultation",
      "Complete design concept",
      "Material & finish recommendations",
      "Detailed project planning",
    ],
  },
  {
    name: "Complete Transformation",
    price: "Custom Quote",
    period: "tailored to your project",
    highlight: false,
    items: [
      "Full project management",
      "Design execution",
      "Construction supervision",
      "Final styling & reveal",
    ],
  },
];

export default function BookService() {
  const formReveal = useInView();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <>
      {/* ── HERO BANNER ──────────────────────────────────────────── */}
      <section className="relative min-h-[56vh] flex items-center justify-center bg-[#1e1e1e] overflow-hidden">
        <img
          src={UNSPLASH("photo-1644057501622-dfa7dd26dbfb", 1600, 800)}
          alt="Luxury bedroom interior transformation"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/70 via-transparent to-[#1e1e1e]/80" />
        <div className="relative pt-32 pb-20 px-6 text-center max-w-3xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-6 font-medium">
            Start Your Project
          </p>
          <h1
            className="text-[clamp(2rem,5vw,3.8rem)] font-normal text-white leading-tight mb-6"
            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
          >
            Book Your Luxury Home<br />Transformation
          </h1>
          <p className="text-base text-white/60 max-w-xl mx-auto leading-relaxed">
            Choose a service package and schedule a consultation with our experts. Every project
            begins with a conversation.
          </p>
        </div>
      </section>

      {/* ── FORM + PRICING ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div
          ref={formReveal.ref}
          className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-700 ${
            formReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 xl:gap-20 items-start">
            {/* ── Booking Form ─── */}
            <div className="bg-white border border-border p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                  <div className="w-16 h-16 bg-[#F5E6A8] flex items-center justify-center">
                    <CheckCircle size={28} className="text-[#D4AF37]" />
                  </div>
                  <h2
                    className="text-2xl font-normal text-[#1A1A1A]"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    Thank You
                  </h2>
                  <p className="text-sm text-[#717171] leading-relaxed max-w-md">
                    Thank you for choosing Apex Modern Builders. Our team will contact you within
                    24 hours to confirm your consultation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm tracking-widest uppercase text-[#D4AF37] hover:text-[#B8952A] transition-colors mt-2 underline underline-offset-4"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-3 font-medium">
                      Book a Session
                    </p>
                    <h2
                      className="text-2xl font-normal text-[#1A1A1A]"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                    >
                      Request a Consultation
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-[#717171] mb-2">
                          Full Name *
                        </label>
                        <input
                          {...register("fullName", { required: "Full name is required" })}
                          placeholder="Alexandra Monroe"
                          className={`w-full px-4 py-3 bg-[#F5F5F5] border text-sm text-[#1A1A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#D4AF37] transition-colors ${
                            errors.fullName ? "border-red-400" : "border-border"
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-[#717171] mb-2">
                          Email Address *
                        </label>
                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                          })}
                          type="email"
                          placeholder="alex@example.com"
                          className={`w-full px-4 py-3 bg-[#F5F5F5] border text-sm text-[#1A1A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#D4AF37] transition-colors ${
                            errors.email ? "border-red-400" : "border-border"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-[#717171] mb-2">
                          Phone Number
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 bg-[#F5F5F5] border border-border text-sm text-[#1A1A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-[#717171] mb-2">
                          Preferred Date
                        </label>
                        <input
                          {...register("date")}
                          type="date"
                          className="w-full px-4 py-3 bg-[#F5F5F5] border border-border text-sm text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Property address */}
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-[#717171] mb-2">
                        Property Address
                      </label>
                      <input
                        {...register("address")}
                        placeholder="1240 Sunset Blvd, Beverly Hills, CA"
                        className="w-full px-4 py-3 bg-[#F5F5F5] border border-border text-sm text-[#1A1A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    {/* Service type */}
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-[#717171] mb-2">
                        Service Type *
                      </label>
                      <div className="relative">
                        <select
                          {...register("serviceType", { required: "Please select a service" })}
                          className={`w-full px-4 py-3 bg-[#F5F5F5] border text-sm text-[#1A1A1A] appearance-none focus:outline-none focus:border-[#D4AF37] transition-colors pr-10 ${
                            errors.serviceType ? "border-red-400" : "border-border"
                          }`}
                          defaultValue=""
                        >
                          <option value="" disabled>Select a service...</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717171] pointer-events-none"
                        />
                      </div>
                      {errors.serviceType && (
                        <p className="text-xs text-red-500 mt-1">{errors.serviceType.message}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-[#717171] mb-2">
                        Project Description
                      </label>
                      <textarea
                        {...register("description")}
                        rows={4}
                        placeholder="Tell us about your space and what you envision..."
                        className="w-full px-4 py-3 bg-[#F5F5F5] border border-border text-sm text-[#1A1A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-sm tracking-widest uppercase px-6 py-4 bg-[#D4AF37] text-white hover:bg-[#B8952A] disabled:opacity-60 transition-colors duration-200 mt-2"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* ── Pricing Packages ─── */}
            <div className="flex flex-col gap-5">
              <div className="mb-4">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-3 font-medium">
                  Our Packages
                </p>
                <h2
                  className="text-2xl font-normal text-[#1A1A1A]"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Service Pricing
                </h2>
              </div>

              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`p-7 border ${
                    pkg.highlight
                      ? "bg-[#2B2B2B] border-[#2B2B2B]"
                      : "bg-white border-border hover:border-[#D4AF37]/30"
                  } transition-colors duration-200`}
                >
                  {pkg.highlight && (
                    <div className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] mb-4 font-medium">
                      Most Popular
                    </div>
                  )}
                  <h3
                    className={`text-lg font-normal mb-1 ${
                      pkg.highlight ? "text-white" : "text-[#1A1A1A]"
                    }`}
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className={`text-3xl font-semibold ${
                        pkg.highlight ? "text-[#D4AF37]" : "text-[#1A1A1A]"
                      }`}
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                    >
                      {pkg.price}
                    </span>
                  </div>
                  <div
                    className={`text-[10px] tracking-wide uppercase mb-5 ${
                      pkg.highlight ? "text-[#9a9a9a]" : "text-[#717171]"
                    }`}
                  >
                    {pkg.period}
                  </div>
                  <ul className="space-y-2.5">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <div
                          className={`w-1 h-1 mt-2 shrink-0 ${
                            pkg.highlight ? "bg-[#D4AF37]" : "bg-[#D4AF37]"
                          }`}
                        />
                        <span
                          className={`text-sm leading-relaxed ${
                            pkg.highlight ? "text-[#9a9a9a]" : "text-[#717171]"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Trust signal */}
              <div className="bg-[#F5E6A8] p-6 mt-1">
                <p className="text-sm text-[#1A1A1A] leading-relaxed">
                  <span className="font-medium">Not sure which package fits?</span> Our team will
                  recommend the right service after your initial consultation — at no extra cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
