import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedEdits = () => {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Fetch projects
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("https://amanftx-backend.onrender.com/api/projects");
        setProjects(res.data.slice(0, 6));
      } catch (error) {
        console.error("Slider data error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Auto slide
  useEffect(() => {
    if (projects.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [projects]);

  // 🎥 Auto play ONLY when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRefs.current[index]?.play().catch(() => {});
          } else {
            videoRefs.current.forEach((v) => v?.pause());
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sliderRef.current) observer.observe(sliderRef.current);
    return () => observer.disconnect();
  }, [index]);

  // Reset videos when slide changes
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [index]);

  // 🖱️ Mouse wheel slide control (Netflix Style)
  useEffect(() => {
    const handleWheel = (e) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.deltaY > 50) setIndex((prev) => (prev + 1) % projects.length);
        if (e.deltaY < -50) setIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [projects]);

  // Dynamic height based on screen width
  const getHeightClass = () => {
    if (window.innerWidth < 640) return "h-[320px]";
    if (window.innerWidth < 768) return "h-[420px]";
    if (window.innerWidth < 1024) return "h-[520px]";
    if (window.innerWidth < 1280) return "h-[620px]";
    return "h-[720px]";
  };

  const [heightClass, setHeightClass] = useState(getHeightClass());

  useEffect(() => {
    const resize = () => setHeightClass(getHeightClass());
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  if (loading)
    return (
      <div className="h-[350px] flex items-center justify-center bg-[#020205]">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );

  if (projects.length === 0) return null;

  return (
    <section ref={sliderRef} className="relative py-20 bg-[#020205] overflow-hidden flex flex-col items-center">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-white text-xl md:text-2xl font-bold tracking-[0.3em] uppercase">
          — FEATURED EDITS —
        </h2>
        <p className="text-purple-400/60 text-sm italic mt-2 tracking-widest">
          Anime & Cinematic Masterpieces
        </p>
      </div>

      {/* Slider */}
      <div className={`relative w-full max-w-[1100px] ${heightClass} flex justify-center items-center`}>
        <div className="relative w-full h-full flex justify-center items-center">

          {projects.map((project, i) => {
            const isActive = i === index;
            const diff = i - index;

            return (
              <motion.div
                key={project._id}
                style={{ position: "absolute", cursor: "pointer" }}
                onClick={() => navigate(`/project/${project._id}`)}
                animate={{
                  scale: isActive ? 1 : 0.75,
                  opacity: isActive ? 1 : 0.3,
                  x: isActive ? 0 : `${diff * 45}%`,
                  zIndex: isActive ? 40 : 10,
                  rotateY: isActive ? 0 : diff > 0 ? -25 : 25,
                  filter: isActive ? "blur(0px) brightness(1.1)" : "blur(10px) brightness(0.4)",
                }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className={`relative h-full aspect-[9/16] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl ${
                  isActive ? "border-purple-500/60 shadow-[0_30px_80px_rgba(0,0,0,0.9)]" : ""
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

                {/* Overlay */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/20 flex flex-col justify-end p-6 md:p-10"
                    >
                      <motion.p className="text-purple-500 font-black text-[9px] uppercase tracking-[0.4em] mb-2">
                        {project.category}
                      </motion.p>

                      <motion.h3 className="text-white font-black text-2xl md:text-4xl italic tracking-tighter uppercase leading-[0.95] mb-4">
                        {project.title}
                      </motion.h3>

                      <div className="w-10 h-1 bg-purple-600 rounded-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex gap-2 mt-10">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === index ? "w-10 bg-purple-600" : "w-3 bg-white/10 hover:bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "white", color: "black" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/portfolio")}
        className="mt-12 px-10 py-4 border border-white/20 text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] backdrop-blur-md"
      >
        Browse Full Portfolio
      </motion.button>
    </section>
  );
};

export default FeaturedEdits;
