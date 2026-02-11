
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 animate-fade-in">
        <img 
          src="https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=2000" 
          alt="Nordic Ritual" 
          className="w-full h-full object-cover opacity-20 grayscale contrast-150 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl flex flex-col items-center">
        <div className="flex justify-center items-center space-x-6 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="h-[1px] w-16 bg-red-900/40"></div>
          <span className="text-red-700 text-[10px] font-black uppercase tracking-[0.8em] animate-pulse">
            The Mark of the Raven
          </span>
          <div className="h-[1px] w-16 bg-red-900/40"></div>
        </div>
        
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <img 
            src="./logo.png" 
            alt="BLOD' HEL" 
            className="w-full max-w-lg md:max-w-2xl h-auto object-contain drop-shadow-[0_0_30px_rgba(185,28,28,0.3)] filter brightness-110 contrast-125"
          />
        </div>
        
        <p className="text-zinc-500 text-lg md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed font-light italic opacity-80 uppercase tracking-widest animate-slide-up" style={{ animationDelay: '600ms' }}>
          Sacred Blood. Ancient Runes. Permanent Saga.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-slide-up" style={{ animationDelay: '800ms' }}>
          <a href="#booking" className="w-full sm:w-auto bg-red-700 text-white px-16 py-6 rounded-none font-black text-xs uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 shadow-[0_0_40px_rgba(185,28,28,0.2)]">
            The Covenant
          </a>
          <a href="#gallery" className="w-full sm:w-auto border border-zinc-800 bg-black/40 hover:bg-zinc-900 px-16 py-6 rounded-none font-black text-xs uppercase tracking-[0.5em] backdrop-blur-md transition-all">
            The Archives
          </a>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-6 opacity-40 animate-fade-in" style={{ animationDelay: '1200ms' }}>
        <div className="w-[1px] h-24 bg-gradient-to-b from-red-700 to-transparent"></div>
        <span className="text-[8px] uppercase tracking-[0.5em] font-black text-zinc-500">Into the Void</span>
      </div>
    </section>
  );
};

export default Hero;
