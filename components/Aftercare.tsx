
import React, { useEffect, useRef } from 'react';

const steps = [
  {
    title: "The Unveiling",
    icon: "fa-scroll",
    desc: "Remove the protective seal after 3-4 hours. Do not re-bandage. The wound must breathe to begin its transformation."
  },
  {
    title: "The Purification",
    icon: "fa-water",
    desc: "Cleanse the mark gently with warm water and fragrance-free antibacterial soap. Pat dry with a clean paper towel. Never rub the ink."
  },
  {
    title: "The Anointing",
    icon: "fa-pump-medical",
    desc: "Apply a thin veil of specialized tattoo balm or fragrance-free lotion 2-3 times daily. Do not drown the skin; a suffocated rune cannot heal."
  },
  {
    title: "The Vigil",
    icon: "fa-eye-slash",
    desc: "Shield the mark from the sun and refrain from soaking in pools or seas for two weeks. Do not scratch the scabs, lest you break the spell."
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
            <span className="text-red-700 text-xs font-black uppercase tracking-[0.6em] mb-6 block">The Preservation</span>
            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-none">The Healing <br/><span className="text-white">Rite</span></h2>
            <p className="text-zinc-500 text-lg leading-relaxed font-light italic mb-12 border-l-2 border-red-900 pl-6">
              "The ink is eternal, but the flesh is temporary. Tend to your wound as a warrior tends to his armor, and the mark shall last until Ragnarok."
            </p>
            
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 bg-black border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:border-red-700 transition-colors">
                    <i className={`fas ${step.icon} text-red-700 text-lg`}></i>
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-2 group-hover:text-red-700 transition-colors">{step.title}</h4>
                    <p className="text-zinc-600 text-xs leading-relaxed font-medium uppercase tracking-widest">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal h-full min-h-[600px] border border-zinc-900 bg-black p-4">
             <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-red-900/50 -translate-y-4 translate-x-4"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-red-900/50 translate-y-4 -translate-x-4"></div>
             
             <div className="w-full h-full relative overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-1000">
               <img 
                 src="https://images.unsplash.com/photo-1562962245-e2d7d23d8c21?auto=format&fit=crop&q=80&w=800" 
                 alt="Healing Process" 
                 className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
               />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <i className="fas fa-heartbeat text-9xl text-red-900/20 animate-pulse"></i>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Aftercare;
