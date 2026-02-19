import heroImage from '../assets/adi-goldstein-bghTDF731_Y-unsplash.jpg';

export default function Home() {
  return (
    <section className="relative min-h-screen bg-cover bg-center flex items-center justify-center">
      <img src={heroImage} alt="Drum machine" className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight">Welcome to Syntheads</h1>

        <div className="mt-8 w-100 h-[3px] bg-teal-500 mx-auto"></div>
      </div>
    </section>
  );
}
