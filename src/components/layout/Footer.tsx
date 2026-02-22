import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-kicks-gray border-t border-kicks-gray-2">
      {/* Newsletter / CTA Banner */}
      <div className="bg-kicks-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-white text-sm font-semibold mb-1 font-body">
                JOIN OUR KICKSPLUS
              </p>
              <p className="text-white text-sm font-semibold font-body">
                CLUB & GET 15% OFF
              </p>
              <p className="text-white/70 text-xs mt-2 font-body">
                Sign up for the latest drops and exclusives.
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="font-display font-black text-4xl md:text-5xl text-white tracking-tight">
                KICKS<sup className="text-kicks-yellow text-lg">®</sup>
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-[#E7E7E3]/10 border border-white/20 text-white placeholder-white/50 rounded px-3 py-1.5 text-sm outline-none focus:border-white/50 font-body"
                />
                <button className="bg-[#E7E7E3] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded hover:bg-kicks-gray-2 transition-colors font-body">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-[#FFA52F] text-lg font-bold uppercase tracking-widest mb-4 font-body">
              About us
            </h4>
            <p className="text-white text-xs leading-relaxed font-body">
              We are the biggest hyperstore in the universe. We got you all
              cover with our exclusive collection of top-shelf drops.
            </p>
          </div>
          <div>
            <h4 className="text-[#FFA52F] text-xs font-bold uppercase tracking-widest mb-4 font-body">
              Categories
            </h4>
            <ul className="space-y-2">
              {["Runners", "Sneakers", "Outdoor", "Golf", "Hiking"].map((c) => (
                <li key={c}>
                  <Link
                    href="/products"
                    className="text-white text-xs hover:text-white transition-colors font-body"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#FFA52F] text-xs font-bold uppercase tracking-widest mb-4 font-body">
              Company
            </h4>
            <ul className="space-y-2">
              {["Partners", "About", "Contact", "Blogs"].map((c) => (
                <li key={c}>
                  <Link
                    href="#"
                    className="text-white text-xs hover:text-white transition-colors font-body"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#FFA52F] text-xs font-bold uppercase tracking-widest mb-4 font-body">
              Follow us
            </h4>
            <div className="flex gap-3">
              {["T", "I", "F"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-7 h-7 rounded-full border border-kicks-gray-3 flex items-center justify-center text-kicks-gray-3 text-xs hover:border-white hover:text-white transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Big KICKS text */}
        <div className="border-t border-kicks-gray-2 pt-8">
          <div className="font-display font-black text-[100px] md:text-[160px] lg:text-[200px] leading-none text-white select-none">
            KICKS
          </div>
          <p className="text-kicks-gray-3 text-xs mt-2 font-body">
            © All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
