import { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router";
import { Menu, X, Phone, Mail, MapPin, Share2, Heart, ExternalLink } from "lucide-react";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm tracking-wide transition-colors duration-200 ${
      isActive ? "text-[#1A1A1A] font-medium" : "text-[#717171] hover:text-[#1A1A1A]"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Navigation ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none gap-0.5">
            <span
              className="text-[22px] font-semibold tracking-[0.18em] text-[#2B2B2B]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              APEX
            </span>
            <span className="text-[8px] tracking-[0.3em] text-[#717171] uppercase font-normal">
              Modern Builders
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/book" className={navLinkClass}>Book Service</NavLink>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/book"
              className="inline-block text-sm tracking-widest uppercase px-6 py-3 bg-[#D4AF37] text-white hover:bg-[#B8952A] transition-colors duration-200"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#2B2B2B]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-border px-6 py-8 flex flex-col gap-7">
            {(
              [
                { to: "/", label: "Home", end: true },
                { to: "/about", label: "About", end: false },
                { to: "/book", label: "Book Service", end: false },
              ] as { to: string; label: string; end: boolean }[]
            ).map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                className={navLinkClass}
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/book"
              onClick={() => setMobileOpen(false)}
              className="text-sm tracking-widest uppercase px-6 py-3 bg-[#D4AF37] text-white text-center"
            >
              Book Consultation
            </Link>
          </div>
        )}
      </header>

      {/* ── Page content ───────────────────────────────────────────── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-[#2B2B2B] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="mb-5">
                <div
                  className="text-[20px] font-semibold tracking-[0.18em] text-white"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  APEX
                </div>
                <div className="text-[8px] tracking-[0.3em] text-[#F5E6A8] uppercase mt-0.5">
                  Modern Builders
                </div>
              </div>
              <p className="text-sm text-[#9a9a9a] leading-relaxed max-w-[220px]">
                Transforming residential spaces into timeless masterpieces through exceptional design
                and craftsmanship.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[10px] tracking-[0.22em] uppercase text-[#F5E6A8] mb-6 font-medium">
                Navigation
              </h4>
              <ul className="space-y-4">
                {[
                  ["/", "Home"],
                  ["/about", "About"],
                  ["/book", "Book Service"],
                ].map(([to, label]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-[#9a9a9a] hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] tracking-[0.22em] uppercase text-[#F5E6A8] mb-6 font-medium">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={13} className="text-[#D4AF37] shrink-0" />
                  <span className="text-sm text-[#9a9a9a]">+1 (555) 847-2910</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={13} className="text-[#D4AF37] shrink-0" />
                  <span className="text-sm text-[#9a9a9a]">hello@apexbuilders.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={13} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#9a9a9a] leading-relaxed">
                    1240 Luxury Lane<br />Beverly Hills, CA 90210
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-[10px] tracking-[0.22em] uppercase text-[#F5E6A8] mb-6 font-medium">
                Newsletter
              </h4>
              <p className="text-sm text-[#9a9a9a] mb-5 leading-relaxed">
                Receive design inspiration and project updates.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="text-sm px-4 py-3 bg-[#1e1e1e] border border-white/10 text-white placeholder-[#555] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button
                  type="submit"
                  className="text-sm tracking-widest uppercase px-4 py-3 bg-[#D4AF37] text-white hover:bg-[#B8952A] transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#555]">
              © 2024 Apex Modern Builders. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {[Share2, Heart, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-[#555] hover:text-[#D4AF37] transition-colors duration-200"
                  aria-label="Social link"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
