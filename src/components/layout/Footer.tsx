import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#E7E7E3] px-4 sm:px-6 lg:px-8 pb-4 pt-4">
      {/* ── Blue banner ── */}
      <div className="bg-kicks-blue  px-6 py-10 relative z-0">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          {/* Left */}
          <div className="flex-1">
            <h3 className="text-white font-black text-2xl md:text-3xl leading-tight font-display uppercase">
              JOIN OUR KICKSPLUS
              <br />
              CLUB & GET 15% OFF
            </h3>
            <p className="text-white/80 text-sm mt-2 mb-5 font-body">
              Sign up for free! Join the community.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border border-white/60 text-white placeholder-white/60 rounded-md px-4 py-2 text-sm outline-none focus:border-white font-body w-48 sm:w-64"
              />
              <button className="bg-[#1a1a1a] text-white px-5 py-2 text-xs font-black uppercase tracking-wider rounded-md hover:bg-black transition-colors font-body">
                SUBMIT
              </button>
            </div>
          </div>

          {/* Right: KICKS+ */}
          <div className="flex items-start">
            <span className="font-display font-black text-5xl md:text-6xl text-white tracking-tight leading-none">
              KICKS
            </span>
            <span className="text-kicks-yellow text-xl font-black leading-none mt-1">
              +
            </span>
          </div>
        </div>
      </div>

      {/* ── Dark card — overlaps blue banner bottom via negative margin-top ── */}
      <div className="bg-[#1a1a1a] rounded-3xl px-6 pt-10 pb-0 -mt-7 relative z-50 overflow-hidden">
        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4 pb-8">
          {/* About */}
          <div>
            <h4 className="text-[#FFA52F] text-base font-black uppercase mb-3 font-body">
              About us
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed font-body">
              We are the biggest hyperstore in the universe. We got you all
              cover with our exclusive collections and latest drops.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#FFA52F] text-xs font-black uppercase tracking-widest mb-3 font-body">
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                "Runners",
                "Sneakers",
                "Basketball",
                "Outdoor",
                "Golf",
                "Hiking",
              ].map((c) => (
                <li key={c}>
                  <Link
                    href="/products"
                    className="text-gray-300 text-xs hover:text-white transition-colors font-body"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#FFA52F] text-xs font-black uppercase tracking-widest mb-3 font-body">
              Company
            </h4>
            <ul className="space-y-2">
              {["About", "Contact", "Blogs"].map((c) => (
                <li key={c}>
                  <Link
                    href="#"
                    className="text-gray-300 text-xs hover:text-white transition-colors font-body"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h4 className="text-[#FFA52F] text-xs font-black uppercase tracking-widest mb-3 font-body">
              Follow us
            </h4>
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Big KICKS — full bleed inside dark card */}
        <div className="overflow-hidden">
          <div
            className="font-display font-black leading-none text-white select-none whitespace-nowrap"
            style={{ fontSize: "clamp(80px, 22vw, 260px)" }}
          >
            KICKS
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-gray-500 text-xs text-center mt-4 font-body">
        © All rights reserved
      </p>
    </footer>
  );
}
