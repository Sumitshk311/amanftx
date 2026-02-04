import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Film, Wrench, Loader2, Volume2, Play, Pause } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  // Fetch project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://amanftx-backend.onrender.com/api/projects/${id}`
        );

        let data = res.data;

        // ✅ TOOLS FIX (string OR array both support)
        if (data.tools) {
          if (typeof data.tools === "string") {
            try {
              data.tools = JSON.parse(data.tools);
            } catch {
              data.tools = data.tools.split(","); // fallback
            }
          }
        } else {
          data.tools = [];
        }

        setProject(data);
      } catch (err) {
        console.error("Project fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  // Auto play video
  useEffect(() => {
    if (videoRef.current && project?.videoUrl) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setShowIcon(true);
        setTimeout(() => setShowIcon(false), 1500);
      }).catch(() => {});
    }
  }, [project]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowIcon(true);
    setTimeout(() => setShowIcon(false), 800);
  };

  // Loading Screen
  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white uppercase font-black tracking-[0.4em] text-xs">
        <Loader2 className="animate-spin text-purple-600 mb-6" size={40} />
        Loading Project...
      </div>
    );

  if (!project)
    return <div className="text-white p-20 text-center">Project Not Found</div>;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-20 px-4 md:px-6 text-white bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-gray-500 hover:text-white mb-12 uppercase text-[10px] font-black tracking-[0.3em]"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500 group-hover:text-purple-500 transition-all">
            <ArrowLeft size={16} />
          </div>
          Back
        </button>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* 🎥 VIDEO REEL */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              onClick={togglePlay}
              className="relative w-full max-w-[420px] aspect-[9/16] rounded-[3rem] overflow-hidden bg-black border border-white/10 shadow-[0_0_80px_rgba(147,51,234,0.2)] cursor-pointer group"
            >
              <video
                ref={videoRef}
                src={project.videoUrl}
                poster={project.thumbnailUrl}
                loop
                playsInline
                muted={false}
                className="w-full h-full object-cover"
              />

              {/* Play Pause Overlay */}
              <AnimatePresence>
                {showIcon && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                  >
                    <div className="bg-black/50 backdrop-blur-xl p-8 rounded-full border border-white/20">
                      {isPlaying ? <Pause size={42} /> : <Play size={42} />}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-transparent to-transparent flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-purple-500 font-black">
                    FTX Media
                  </p>
                  <p className="text-xs uppercase">{isPlaying ? "Playing" : "Paused"}</p>
                </div>
                <Volume2 size={20} className="text-white/70" />
              </div>
            </div>
          </div>

          {/* 📜 INFO PANEL */}
          <div className="lg:col-span-5 space-y-10">

            {/* Category */}
            <span className="inline-block px-5 py-2 bg-purple-600/10 text-purple-500 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
              {project.category}
            </span>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.9] tracking-tighter">
              {project.title}
            </h1>

            {/* ✅ DESCRIPTION FIX */}
            <p className="text-gray-400 text-lg md:text-xl italic leading-relaxed border-l-2 border-purple-500/30 pl-6">
              {project.description || "No description added by admin."}
            </p>

            {/* 🛠 TOOLS SECTION */}
            <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-600/20 rounded-2xl text-purple-500">
                  <Wrench size={20} />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                  Tools Used
                </h4>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.tools && project.tools.length > 0 ? (
                  project.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:border-purple-500 transition-all"
                    >
                      {tool}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-600 italic text-xs uppercase tracking-widest">
                    No tools listed
                  </span>
                )}
              </div>
            </div>

            {/* Credits */}
            <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-2xl text-blue-500">
                <Film size={20} />
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-widest text-gray-500 font-black">
                  Project Type
                </p>
                <p className="text-sm font-black uppercase italic">
                  Cinematic Motion Edit
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-[9px] uppercase tracking-[0.5em] font-bold">
              © FTX Media 2026. All Rights Reserved. 
            </p>

          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetails;
