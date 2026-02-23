import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-zinc-900 to-black p-6 text-slate-200">
      <div className="max-w-5xl w-full bg-black/60 backdrop-blur-md border border-neutral-800 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-md overflow-hidden">
              <Image src="/logo scolarix.png" alt="scolariX logo" fill className="object-contain" priority />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight neon">scolariX</h1>
          </div>

          <h2 className="text-6xl md:text-7xl font-extrabold leading-tight neon-gradient">404</h2>
          <p className="text-lg md:text-xl text-slate-300 font-semibold">Oups — page introuvable</p>
          <p className="max-w-xl text-slate-400">La page demandée est introuvable ou a été supprimée. Vous pouvez retourner à l'accueil ou contacter l'équipe.</p>

          <div className="mt-6 flex gap-3">
            <Link href="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-black font-semibold shadow-lg transition">
              Retour à l'accueil
            </Link>
            <a href="mailto:support@example.com" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-700 text-slate-200 hover:bg-neutral-800 transition">
              Contacter le support
            </a>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl bg-gradient-to-tr from-neutral-800 to-neutral-900 flex items-center justify-center shadow-inner border border-neutral-800">
            <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 opacity-90">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect x="20" y="40" width="200" height="120" rx="16" fill="none" stroke="url(#g1)" strokeWidth="3" opacity="0.18" />
              <g stroke="url(#g1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M60 100c8-16 24-28 56-28s48 12 56 28" />
                <path d="M88 132c6 6 18 6 24 0" stroke="#94a3b8" />
              </g>
              <circle cx="86" cy="96" r="5" fill="#94a3b8" />
              <circle cx="154" cy="96" r="5" fill="#94a3b8" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
