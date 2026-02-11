
import React, { useEffect, useRef } from 'react';

const steps = [
  {
    title: "The Breathing",
    icon: "fa-leaf",
    desc: "Remove the protective veil after 3-4 hours. The spirit of the skin must breathe to begin its transformation into art."
  },
  {
    title: "The Cleansing",
    icon: "fa-water",
    desc: "Gently wash the area with cool mountain water and fragrance-free soap. Pat dry with the care of a storyteller handling an old scroll."
  },
  {
    title: "The Hydration",
    icon: "fa-cloud-showers-heavy",
    desc: "Apply a light veil of natural balm. Like dew on a meadow, it preserves the vitality of the ink without suffocating the life beneath."
  },
  {
    title: "The Sanctuary",
    icon: "fa-sun",
    desc: "Shield the mark from the harsh sun and avoid soaking for two weeks. Let the saga settle into your skin undisturbed."
  }
];

const Aftercare: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="aftercare" ref={sectionRef} className="py-32 bg-zinc-950 relative border-t border-zinc-900">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')" }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="reveal">
            <span className="text-slate-500 text-xs font-black uppercase tracking-[0.6em] mb-6 block">The Preservation</span>
            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-none">The Path to <br/><span className="text-white">Permanence</span></h2>
            <p className="text-zinc-500 text-lg leading-relaxed font-light italic mb-12 border-l-2 border-slate-700 pl-6">
              "The ink is eternal, yet the journey is shared. Tend to your mark as a keeper of the forest tends to its ancient oaks."
            </p>
            
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 bg-black border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:border-slate-500 transition-colors">
                    <i className={`fas ${step.icon} text-slate-400 text-lg`}></i>
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-2 group-hover:text-slate-400 transition-colors">{step.title}</h4>
                    <p className="text-zinc-600 text-xs leading-relaxed font-medium uppercase tracking-widest">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal h-full min-h-[600px] border border-zinc-900 bg-black p-4">
             <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-slate-900/50 -translate-y-4 translate-x-4"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-slate-900/50 translate-y-4 -translate-x-4"></div>
             
             <div className="w-full h-full relative overflow-hidden grayscale contrast-110 hover:grayscale-0 transition-all duration-1000">
               <img 
                 src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800" 
                 alt="Natural Healing" 
                 className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
               />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <i className="fas fa-snowflake text-9xl text-slate-900/20 animate-pulse"></i>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Aftercare;
