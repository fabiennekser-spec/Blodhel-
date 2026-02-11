
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 animate-fade-in">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
          alt="Nordic Mountain Peak" 
          className="w-full h-full object-cover opacity-30 grayscale transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl flex flex-col items-center">
        <div className="flex justify-center items-center space-x-6 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="h-[1px] w-16 bg-slate-700/40"></div>
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.8em]">
            The Spirit of the North
          </span>
          <div className="h-[1px] w-16 bg-slate-700/40"></div>
        </div>
        
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <h1 className="text-7xl md:text-9xl font-black tracking-[0.2em] text-white">
            BLOD' <span className="text-slate-500">HEL</span>
          </h1>
        </div>
        
        <p className="text-zinc-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed font-light italic uppercase tracking-[0.3em] animate-slide-up" style={{ animationDelay: '600ms' }}>
          Ancient Spirit. Sacred Runes. Eternal Saga.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-slide-up" style={{ animationDelay: '800ms' }}>
          <a href="#booking" className="w-full sm:w-auto bg-slate-100 text-black px-16 py-6 rounded-none font-black text-xs uppercase tracking-[0.5em] hover:bg-slate-300 transition-all transform hover:-translate-y-1 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
            The Covenant
          </a>
          <a href="#gallery" className="w-full sm:w-auto border border-zinc-800 bg-black/40 hover:bg-zinc-900 px-16 py-6 rounded-none font-black text-xs uppercase tracking-[0.5em] backdrop-blur-md transition-all">
            The Archives
          </a>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-6 opacity-40 animate-fade-in" style={{ animationDelay: '1200ms' }}>
        <div className="w-[1px] h-24 bg-gradient-to-b from-slate-500 to-transparent"></div>
        <span className="text-[8px] uppercase tracking-[0.5em] font-black text-zinc-500 italic">Ascend the Peak</span>
      </div>
    </section>
  );
};

export default Hero;
