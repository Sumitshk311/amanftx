import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Loader2 } from "lucide-react";

const FeaturedEdits = () => {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("https://amanftx-backend.onrender.com/api/projects");
        // Reel style slider mein 5-6 projects best lagte hain
        setProjects(res.data.slice(0, 6));
      } catch (error) {
        console.error("Slider data error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [projects]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [index, projects]);

  if (loading) return (
    <div className="h-[600px] flex items-center justify-center bg-[#020205]">
      <Loader2 className="animate-spin text-purple-600" size={40} />
    </div>
  );

  if (projects.length === 0) return null;

  return (
    <section className="relative py-24 bg-[#020205] overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[700px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-white text-2xl font-bold tracking-[0.3em] uppercase">
          — FEATURED EDITS —
        </h2>
        <p className="text-purple-400/60 text-sm italic mt-2 tracking-widest">Anime & Cinematic Masterpieces</p>
      </div>

      {/* Reel Slider Container */}
      <div className="relative w-full max-w-[1200px] h-[550px] md:h-[750px] flex justify-center items-center">
        <div className="relative w-full h-full flex justify-center items-center">
          {projects.map((project, i) => {
            const isActive = i === index;
            // Desktop par side wali reels thodi dur dikhengi
            const diff = i - index;
            
            return (
              <motion.div
                key={project._id}
                style={{ position: "absolute" }}
                animate={{
                  scale: isActive ? 1 : 0.7,
                  opacity: isActive ? 1 : 0.25,
                  x: isActive ? 0 : `${diff * 45}%`, // Spacing for portrait cards
                  zIndex: isActive ? 40 : 10,
                  rotateY: isActive ? 0 : diff > 0 ? -25 : 25,
                  filter: isActive ? "blur(0px) brightness(1.1)" : "blur(10px) brightness(0.5)",
                }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className={`relative h-full aspect-[9/16] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl ${
                  isActive ? "border-purple-500/60 shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(147,51,234,0.2)]" : ""
                }`}
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={project.videoUrl}
                  poster={project.thumbnailUrl}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Text Overlay optimized for Reel shape */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/20 flex flex-col justify-end p-8 md:p-10"
                    >
                      <motion.p 
                        initial={{ y: 20 }} animate={{ y: 0 }}
                        className="text-purple-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2"
                      >
                        {project.category}
                      </motion.p>
                      <motion.h3 
                        initial={{ y: 20 }} animate={{ y: 0 }}
                        className="text-white font-black text-3xl md:text-5xl italic tracking-tighter uppercase leading-[0.9] mb-6"
                      >
                        {project.title}
                      </motion.h3>
                      <div className="w-12 h-1.5 bg-purple-600 rounded-full mb-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex gap-3 mt-12 md:mt-16 z-10">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === index 
                ? "w-12 md:w-16 bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,1)]" 
                : "w-3 md:w-4 bg-white/10 hover:bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.button 
        whileHover={{ scale: 1.05, backgroundColor: "white", color: "black" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.href = '/portfolio'}
        className="mt-14 md:mt-20 px-10 md:px-16 py-4 md:py-5 border border-white/20 text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] backdrop-blur-md transition-all duration-500"
      >
        Browse Full Portfolio
      
      </motion.button>
    </section>
  );
};

export default FeaturedEdits;