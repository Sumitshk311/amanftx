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

  useEffect(() => {
    const fetchSingleProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://amanftx-backend.onrender.com/api/projects/${id}`);
        let data = res.data;

        // ✅ Tools Parsing Fix: Check if string or array
        if (data.tools) {
          try {
            if (typeof data.tools === "string") {
              data.tools = JSON.parse(data.tools);
            }
          } catch (e) {
            console.error("Tools parse nahi ho paye", e);
            data.tools = []; 
          }
        }
        
        setProject(data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSingleProject();
  }, [id]);

  useEffect(() => {
    if (videoRef.current && project) {
      const video = videoRef.current;
      video.play().then(() => {
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
    setTimeout(() => setShowIcon(false), 600);
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white italic font-black tracking-[0.5em] text-[10px] uppercase">
      <Loader2 className="animate-spin text-purple-600 mb-6" size={40} />
      Unlocking Masterpiece
    </div>
  );

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen pt-32 pb-20 px-4 md:px-6 text-white bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="group flex items-center gap-3 text-gray-500 hover:text-white mb-12 uppercase text-[10px] font-black tracking-[0.3em]">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500 group-hover:text-purple-500 transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to Archives
        </button>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* VIDEO SECTION - Original Reel Size (9:16) */}
          <div className="lg:col-span-7 flex justify-center">
            <div 
              className="relative w-full max-w-[400px] aspect-[9/16] rounded-[3rem] overflow-hidden bg-black border border-white/10 shadow-[0_0_80px_rgba(147,51,234,0.15)] cursor-pointer group"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src={project.videoUrl}
                loop
                muted={false} // Detail page pe sound honi chahiye!
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Play/Pause UI Overlay */}
              <AnimatePresence>
                {showIcon && (
                  <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="bg-black/40 backdrop-blur-xl p-8 rounded-full border border-white/20">
                      {isPlaying ? <Pause size={40} fill="white" /> : <Play size={40} fill="white" />}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-transparent to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-purple-500">Aman FTX</span>
                    <span className="text-[10px] font-bold uppercase">{isPlaying ? "Live Preview" : "Paused"}</span>
                 </div>
                 <Volume2 size={18} className="text-white/60" />
              </div>
            </div>
          </div>

          {/* SIDE PANEL - Info & Tools */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <motion.span 
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="inline-block px-5 py-2 bg-purple-600/10 text-purple-500 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-widest"
              >
                {project.category}
              </motion.span>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.85] tracking-tighter">
                {project.title}
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl italic leading-relaxed border-l-2 border-purple-500/30 pl-6">
                {project.description}
              </p>
            </div>

            {/* Tools Box */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-600/20 rounded-2xl text-purple-500"><Wrench size={20}/></div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Software Stack</h4>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {project.tools && project.tools.length > 0 ? (
                    project.tools.map((tool, i) => (
                      <span key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:border-purple-500 transition-all cursor-default">
                        {tool}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-600 italic text-xs uppercase tracking-widest">No tools listed</span>
                  )}
                </div>
              </div>

              {/* Technical Credits */}
              <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-2xl text-blue-500"><Film size={20}/></div>
                    <div>
                       <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Project Type</p>
                       <p className="text-sm font-black uppercase italic">High-End Motion Edit</p>
                    </div>
                 </div>
              </div>
            </div>

            <p className="text-gray-700 text-[9px] uppercase tracking-[0.5em] font-bold">
              © AMAN FTX ARCHIVES / EST. 2026
            </p>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetails;