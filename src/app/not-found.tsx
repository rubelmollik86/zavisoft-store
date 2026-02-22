import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#E7E7E3] min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="font-display font-black text-[200px] text-kicks-gray-2 leading-none select-none">
        404
      </p>
      <h1 className="font-display font-black text-4xl text-white -mt-4 mb-3">
        PAGE NOT FOUND
      </h1>
      <p className="text-kicks-gray-3 text-sm font-body mb-8">
        This drop doesn&apos;t exist yet.
      </p>
      <Link
        href="/"
        className="bg-kicks-blue text-white px-8 py-3 font-display font-black text-sm uppercase tracking-widest hover:bg-kicks-blue-light transition-colors"
      >
        GO HOME
      </Link>
    </div>
  );
}
