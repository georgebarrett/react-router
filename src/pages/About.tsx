export default function About() {
  return (
    <section className="min-h-screen bg-white text-black px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <div className="mt-16 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>

        <h1 className="text-4xl mt-16 md:text-6xl font-black tracking-tight leading-tight mb-10">
          We live for voltage, rhythm, and raw sound.
        </h1>

        <div className="space-y-8 text-lg md:text-xl text-neutral-700 leading-relaxed">
          <p>
            Synthesizers and drum machines aren’t just instruments to us.
            They’re machines for emotion. They hum, pulse, glitch and breathe.
            They turn electricity into movement.
          </p>

          <p>
            From analog warmth to digital precision, from modular chaos to
            tight sequenced grooves, we love the full spectrum. The clicks,
            the kicks, the basslines that vibrate your ribs.
          </p>

          <p>
            We believe live electronic music should feel alive, imperfect,
            expressive and unpredictable. Knobs turned too far. Filters pushed
            to the edge. Moments that can’t be repeated.
          </p>

          <p className="font-semibold text-black">
            This is for the late-night producers.
            The hardware purists.
            The live performers chasing something real.
          </p>
        </div>

        <div className="mt-16 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>
      </div>
    </section>
  );
}