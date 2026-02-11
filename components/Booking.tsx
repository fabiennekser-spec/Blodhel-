
import React, { useState, useEffect, useRef } from 'react';

const Booking: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    placement: '',
    style: 'Norse Blackwork',
    description: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('The raven has taken flight. We will reach out to schedule your blood oath shortly.');
  };

  return (
    <section id="booking" ref={sectionRef} className="py-40 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-950 border border-zinc-900 overflow-hidden flex flex-col lg:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)] reveal">
          <div className="lg:w-2/5 p-16 lg:p-24 bg-[#c5a059] text-black">
            <h2 className="text-5xl font-black mb-10 uppercase leading-none">The <br/>Covenant</h2>
            <p className="text-xl font-medium mb-16 opacity-90 leading-relaxed italic">Forge your legend in Midgard. Commit your narrative to skin and join the clan of the marked.</p>
            
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-black/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-shield-alt text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-1">Sanctified Hall</h4>
                  <p className="text-xs opacity-70">Surgical precision in a ritual space.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-black/10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-scroll text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-1">Eternal Aftercare</h4>
                  <p className="text-xs opacity-70">The saga continues after the ink settles.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-16 lg:p-24 relative">
             {/* Decorative Corner */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <span className="text-6xl rune-font">ᚠ</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Mortal Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Ragnar Lodbrok" 
                    className="w-full bg-black border-b border-zinc-800 p-4 text-white focus:border-[#c5a059] outline-none transition-all placeholder-zinc-800 italic"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Raven Carrier (Email)</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ragnar@fjord.com" 
                    className="w-full bg-black border-b border-zinc-800 p-4 text-white focus:border-[#c5a059] outline-none transition-all placeholder-zinc-800 italic"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">The Vessel (Placement)</label>
                  <input 
                    type="text" 
                    value={formData.placement}
                    onChange={(e) => setFormData({...formData, placement: e.target.value})}
                    placeholder="Shoulders, Chest, Back..." 
                    className="w-full bg-black border-b border-zinc-800 p-4 text-white focus:border-[#c5a059] outline-none transition-all placeholder-zinc-800 italic"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Mythic Path (Style)</label>
                  <select 
                    value={formData.style}
                    onChange={(e) => setFormData({...formData, style: e.target.value})}
                    className="w-full bg-black border-b border-zinc-800 p-4 text-white focus:border-[#c5a059] outline-none transition-all appearance-none italic"
                  >
                    <option>Norse Blackwork</option>
                    <option>Ancient Runic</option>
                    <option>Saga Realism</option>
                    <option>Traditional Handpoke</option>
                    <option>Other Archetype</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Describe Your Saga</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell us the story behind the mark..." 
                  className="w-full bg-black border border-zinc-900 p-6 text-white focus:border-[#c5a059] outline-none transition-all placeholder-zinc-800 italic resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-[#c5a059] text-black py-6 font-black uppercase tracking-[0.5em] text-sm hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(197,160,89,0.2)]">
                Seal the Covenant
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
