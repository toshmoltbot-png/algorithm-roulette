import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-16 max-w-2xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8 text-center">
        What is{" "}
        <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Algorithm Roulette
        </span>
        ?
      </h1>

      <div className="space-y-6 text-white/70 text-lg leading-relaxed">
        <p>
          Your feed already knows what you think. It only shows you the single reality tunnel
          that reinforces your bias. If you loved a topic, you get the &quot;hero&quot; take. If you
          hated it, you get the &quot;villain&quot; take.
        </p>
        <p>
          <strong className="text-white">The algorithm is so good at hiding the OTHER side,
          you feel like 100% of the world agrees with you.</strong>
        </p>
        <p>
          Algorithm Roulette breaks that illusion. Spin the wheel, land in someone else&apos;s
          echo chamber, and see exactly what they see — the same highly produced, emotionally
          compelling content that makes them absolutely certain they&apos;re right.
        </p>
        <p className="text-white/40 text-sm">
          We don&apos;t host any content. All videos are embedded from their original platforms.
          We don&apos;t endorse any viewpoint. We just let you peek behind the curtain.
        </p>
      </div>

      <div className="mt-12 flex gap-4">
        <Link
          href="/"
          className="bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
        >
          🎰 Spin the Wheel
        </Link>
      </div>
    </main>
  );
}
