
import React, { useState, useRef, useEffect } from 'react';
import { getTattooIdeas, generateTattooImage } from '../services/geminiService';
import { TattooIdea } from '../types';

const styleOptions = [
  { label: "Norse Blackwork", desc: "Heavy black ink, high contrast.", icon: "fa-gavel" },
  { label: "Primal Runes", desc: "Raw, hand-carved magical staves.", icon: "fa-font" },
  { label: "Saga Realism", desc: "Photorealistic gods and beasts.", icon: "fa-eye" },
  { label: "Dotwork", desc: "Intricate shading via dots.", icon: "fa-braille" },
  { label: "Geometric", desc: "Sacred geometry & math.", icon: "fa-shapes" },
  { label: "Viking Traditional", desc: "Bold lines, historic motifs.", icon: "fa-shield-alt" },
  { label: "Dark Surrealism", desc: "Nightmarish, twisted reality.", icon: "fa-skull" },
  { label: "Abstract Flow", desc: "Organic movement & chaos.", icon: "fa-wind" }
];

const AIStudio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [ideas, setIdeas] = useState<TattooIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  
  // Image Adjustment State
  const [filters, setFilters] = useState({ brightness: 100, contrast: 100, saturation: 100 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
        // Reset filters on new image
        setFilters({ brightness: 100, contrast: 100, saturation: 100 });
      };
      reader.readAsDataURL(file);
    }
  };

  const getProcessedImage = async (src: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        } else {
          resolve(src);
        }
      };
      img.onerror = () => resolve(src);
    });
  };

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(prev => prev.filter(s => s !== style));
    } else {
      setSelectedStyles(prev => [...prev, style]);
    }
  };

  const handleGenerateIdeas = async () => {
    if (!prompt && !referenceImage) return;
    setLoading(true);
    try {
      let imageToSend = referenceImage;
      if (referenceImage) {
        imageToSend = await getProcessedImage(referenceImage);
      }
      const result = await getTattooIdeas(
        prompt || "Design inspired by reference image", 
        imageToSend || undefined,
        selectedStyles
      );
      setIdeas(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVisualise = async (title: string, desc: string) => {
    setImgLoading(true);
    setGeneratedImage(null);
    try {
      const img = await generateTattooImage(`${title}: ${desc}. Styles: ${selectedStyles.join(', ')}`);
      setGeneratedImage(img);
    } catch (error) {
      console.error(error);
    } finally {
      setImgLoading(false);
    }
  };

  const updateFilter = (type: 'brightness' | 'contrast' | 'saturation', value: number) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  return (
    <section id="studio" ref={sectionRef} className="py-40 bg-zinc-950 border-y border-red-900/20 relative overflow-hidden splatter-bg">
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none select-none">
        <span className="text-[20rem] font-black italic text-red-900">ᚦ</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="reveal">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.7em] mb-6 block">The Blood Forge</span>
            <h2 className="text-6xl md:text-8xl font-black mb-10 leading-tight">Blod' Hel <br/><span className="text-gradient-blood">Lab</span></h2>
            <p className="text-zinc-500 mb-14 leading-relaxed text-xl font-light italic">
              Manifest your saga. Provide text or a reference image, select your archetypes, and our Oracle will weave the runes of your fate.
            </p>
            
            <div className="bg-black border border-zinc-900 p-8 md:p-12 relative shadow-2xl">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-700"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-700"></div>
              
              {/* 1. Visual Reference */}
              <div className="mb-8">
                <h3 className="text-[10px] font-black mb-4 tracking-[0.4em] text-red-600 uppercase">1. Visual Reference (Optional)</h3>
                <div 
                  onClick={() => !referenceImage && fileInputRef.current?.click()}
                  className={`w-full transition-all flex flex-col items-center justify-center cursor-pointer group bg-zinc-950/50 ${referenceImage ? 'border border-zinc-800 p-4' : 'h-40 border-2 border-dashed border-zinc-800 hover:border-red-700'}`}
                >
                  {referenceImage ? (
                    <div className="w-full">
                      <div className="relative w-full aspect-square md:aspect-video mb-6 overflow-hidden bg-black/50">
                        <img 
                          src={referenceImage} 
                          alt="Reference" 
                          className="w-full h-full object-contain"
                          style={{ 
                            filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)` 
                          }} 
                        />
                        <button 
                          onClick={(e) => { e.stopPropagation(); setReferenceImage(null); }}
                          className="absolute top-2 right-2 w-8 h-8 bg-black/80 flex items-center justify-center hover:text-red-500 z-10 border border-zinc-800"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>

                      {/* Image Controls */}
                      <div className="space-y-4 px-2">
                         <div className="flex items-center space-x-4">
                            <label className="text-[9px] text-zinc-500 uppercase tracking-widest w-24">Brightness</label>
                            <input 
                              type="range" 
                              min="0" 
                              max="200" 
                              value={filters.brightness} 
                              onChange={(e) => updateFilter('brightness', parseInt(e.target.value))}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-700"
                            />
                         </div>
                         <div className="flex items-center space-x-4">
                            <label className="text-[9px] text-zinc-500 uppercase tracking-widest w-24">Contrast</label>
                            <input 
                              type="range" 
                              min="0" 
                              max="200" 
                              value={filters.contrast} 
                              onChange={(e) => updateFilter('contrast', parseInt(e.target.value))}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-700"
                            />
                         </div>
                         <div className="flex items-center space-x-4">
                            <label className="text-[9px] text-zinc-500 uppercase tracking-widest w-24">Saturation</label>
                            <input 
                              type="range" 
                              min="0" 
                              max="200" 
                              value={filters.saturation} 
                              onChange={(e) => updateFilter('saturation', parseInt(e.target.value))}
                              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-700"
                            />
                         </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <i className="fas fa-cloud-upload-alt text-2xl text-zinc-700 group-hover:text-red-700 mb-4"></i>
                      <p className="text-xs text-zinc-600 uppercase tracking-widest font-black">Offer an Image Reference</p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              {/* 2. Describe Intent */}
              <div className="mb-8">
                <h3 className="text-[10px] font-black mb-4 tracking-[0.4em] text-red-600 uppercase">2. Describe the Intent</h3>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="The raven's flight over ruins..."
                  className="w-full h-32 bg-zinc-900/50 border border-zinc-800 p-6 text-white placeholder-zinc-800 focus:outline-none focus:border-red-700 transition-all resize-none italic font-light text-base"
                />
              </div>

              {/* 3. Select Archetypes */}
              <div className="mb-10">
                <h3 className="text-[10px] font-black mb-4 tracking-[0.4em] text-red-600 uppercase">3. Select Archetypes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {styleOptions.map((style) => (
                    <button
                      key={style.label}
                      onClick={() => toggleStyle(style.label)}
                      className={`text-left p-4 border transition-all duration-300 flex flex-col justify-between h-full min-h-[110px] group transform hover:scale-[1.03] active:scale-95 ${
                        selectedStyles.includes(style.label) 
                          ? 'bg-red-900/20 border-red-700 text-white shadow-[0_0_20px_rgba(185,28,28,0.3)]' 
                          : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-red-900/40 hover:text-zinc-300 hover:shadow-[0_0_15px_rgba(185,28,28,0.1)]'
                      }`}
                    >
                      <i className={`fas ${style.icon} text-lg mb-3 ${selectedStyles.includes(style.label) ? 'text-red-500' : 'text-zinc-600 group-hover:text-red-600'} transition-colors duration-300`}></i>
                      <div>
                        <span className="block text-[9px] font-black uppercase tracking-widest mb-1 group-hover:text-white transition-colors">{style.label}</span>
                        <span className="block text-[8px] font-light italic opacity-70 leading-relaxed group-hover:opacity-100 transition-opacity">{style.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleGenerateIdeas}
                disabled={loading || (!prompt && !referenceImage)}
                className="w-full bg-red-700 text-white py-6 font-black uppercase tracking-[0.4em] text-sm hover:bg-white hover:text-black transition-all disabled:opacity-20 flex items-center justify-center space-x-4 shadow-[0_0_20px_rgba(185,28,28,0.2)]"
              >
                {loading ? (
                  <><i className="fas fa-ring animate-spin"></i> <span>Forging Runes...</span></>
                ) : (
                  <><i className="fas fa-skull"></i> <span>Consult Oracle</span></>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-12">
            {imgLoading ? (
              <div className="bg-zinc-900 border-2 border-dashed border-red-900/30 aspect-square flex flex-col items-center justify-center p-12 text-center animate-pulse">
                <div className="relative mb-10">
                  <div className="w-24 h-24 border-2 border-red-900/20 border-t-red-600 rounded-full animate-spin"></div>
                  <i className="fas fa-eye absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600"></i>
                </div>
                <p className="text-red-600 font-display text-2xl tracking-[0.3em] uppercase">Binding Soul to Ink</p>
              </div>
            ) : generatedImage ? (
              <div className="relative group bg-black shadow-[0_0_60px_rgba(0,0,0,1)] border border-zinc-900 p-2 reveal">
                <img src={generatedImage} alt="Prophecy Visual" className="w-full aspect-square object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-16 text-center m-2">
                   <div className="mb-6 w-16 h-16 border border-red-900 flex items-center justify-center text-red-600">
                     <i className="fas fa-check-double"></i>
                   </div>
                  <h4 className="text-2xl font-black mb-6 text-red-600 tracking-widest">MANIFESTATION READY</h4>
                  <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-light italic">"The mark has been forged in the Blod' Hel style. Anchor it to Midgard at our studio."</p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button className="bg-white text-black px-8 py-4 font-black uppercase text-[10px] tracking-widest flex-1 hover:bg-red-700 hover:text-white transition-colors">Download Seal</button>
                    <a href="#booking" className="bg-red-700 text-white px-8 py-4 font-black uppercase text-[10px] tracking-widest flex-1 hover:bg-white hover:text-black transition-colors">Book Ritual</a>
                  </div>
                </div>
                <button 
                  onClick={() => setGeneratedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/80 border border-zinc-900 flex items-center justify-center hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {ideas.length === 0 ? (
                  <div className="bg-zinc-900/10 aspect-[4/5] border border-zinc-900 flex flex-col items-center justify-center text-center p-16 reveal">
                    <i className="fas fa-crow text-4xl text-zinc-800 mb-8"></i>
                    <p className="text-zinc-700 italic tracking-[0.2em] uppercase text-[10px]">The mists await your offering.</p>
                  </div>
                ) : (
                  ideas.map((idea, idx) => (
                    <div key={idx} className="bg-zinc-950 p-10 border border-zinc-900 hover:border-red-900/50 transition-all group relative overflow-hidden reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-900/20 group-hover:bg-red-700 transition-all"></div>
                      <h4 className="text-white font-black text-xl mb-4 tracking-[0.2em] uppercase">{idea.title}</h4>
                      <p className="text-zinc-500 text-sm mb-8 leading-relaxed font-light italic">"{idea.description}"</p>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {idea.suggestedStyles.map((style, sidx) => (
                          <span key={sidx} className="bg-black text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 text-red-600 border border-red-900/30">{style}</span>
                        ))}
                      </div>
                      <button 
                        onClick={() => handleVisualise(idea.title, idea.description)}
                        className="text-zinc-300 text-xs font-black uppercase tracking-[0.4em] hover:text-red-600 flex items-center group/btn"
                      >
                        Summon Vision <i className="fas fa-chevron-right ml-4 group-hover/btn:translate-x-4 transition-transform text-red-700"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStudio;
