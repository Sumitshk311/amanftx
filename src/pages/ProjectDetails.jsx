import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Film, Share2, Wrench, Loader2, Volume2, Play, Pause } from "lucide-react";
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
        const response = await axios.get(`https://amanftx-backend.onrender.com/api/projects/${id}`);
        const data = response.data;
        // Tools array handling
        if (data.tools && typeof data.tools === 'string') {
            data.tools = JSON.parse(data.tools);
        }
        setProject(data);
      } catch (error) { console.error("Error fetching project:", error); } 
      finally { setLoading(false); }
    };
    if (id) fetchSingleProject();
  }, [id]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) { videoRef.current.play(); setIsPlaying(true); } 
      else { videoRef.current.pause(); setIsPlaying(false); }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 500);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white italic font-black tracking-[0.5em] text-[10px] uppercase">
      <Loader2 className="animate-spin text-purple-600 mb-6" size={40} />
      Unlocking Masterpiece
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 font-black uppercase italic">
      <h2 className="text-2xl tracking-tighter">Project Not Found</h2>
      <button onClick={() => navigate("/")} className="px-8 py-3 bg-white text-black rounded-full text-[10px] tracking-widest uppercase">Go Back</button>
    </div>
  );

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-32 pb-20 px-4 md:px-6 text-white bg-black">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="group flex items-center gap-3 text-gray-500 hover:text-white mb-12 uppercase text-[10px] font-black tracking-[0.3em] transition-all">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500 group-hover:text-purple-500 transition-all"><ArrowLeft size={16} /></div> 
          Back to Archives
        </button>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="lg:col-span-8 w-full space-y-12">
            <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(147,51,234,0.1)] cursor-pointer group" onClick={togglePlay}>
              <video ref={videoRef} src={project.videoUrl} controls={false} className="w-full h-auto max-h-[85vh] block mx-auto bg-black" poster={project.thumbnailUrl} playsInline onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
              <AnimatePresence>
                {showIcon && (
                  <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-md p-8 rounded-full border border-white/30">{isPlaying ? <Pause size={40} fill="white" /> : <Play size={40} fill="white" className="ml-2" />}</div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center pointer-events-none">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">{isPlaying ? "Now Playing" : "Paused"}</p>
                <Volume2 size={16} />
              </div>
            </div>
            
            <div className="space-y-8 px-2">
              <span className="px-5 py-1.5 bg-purple-600/10 text-purple-500 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{project.category}</span>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.9] tracking-tighter">{project.title}</h1>
                <div className="h-1 w-24 bg-purple-600 rounded-full" />
              </div>
              <p className="text-gray-400 text-lg md:text-2xl leading-relaxed italic border-l-4 border-purple-900/50 pl-6 md:pl-10 max-w-4xl">"{project.description}"</p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32 w-full">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl space-y-12">
              <div className="space-y-10">
                <div className="flex items-start gap-5">
                   <div className="p-4 bg-white/5 rounded-3xl text-purple-500 border border-white/5"><Film size={24}/></div>
                   <div>
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Project Category</p>
                     <p className="text-2xl font-black italic uppercase text-white leading-tight">{project.category}</p>
                   </div>
                </div>
                <div className="flex items-start gap-5">
                   <div className="p-4 bg-white/5 rounded-3xl text-purple-500 border border-white/5"><Wrench size={24}/></div>
                   <div>
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Editing Tools</p>
                     <div className="flex flex-wrap gap-2">
                        {project.tools && project.tools.length > 0 ? project.tools.map((tool, i) => (
                          <span key={i} className="text-[10px] font-black italic text-white bg-white/10 px-3 py-1 rounded-lg border border-white/5 uppercase">{tool}</span>
                        )) : <span className="text-xl font-black italic text-white">PR / AE</span>}
                     </div>
                   </div>
                </div>
              </div>

              {/* <div className="space-y-4 pt-4">
                 <a href={`https://wa.me/91XXXXXXXXXX?text=Yo Aman! I just saw your "${project.title}" edit. Let's talk.`} target="_blank" rel="noreferrer" className="w-full py-6 bg-white text-black font-black uppercase text-center text-xs tracking-[0.2em] rounded-[2rem] hover:bg-purple-600 hover:text-white transition-all duration-500 block active:scale-95">Start Project</a>
                 <button className="w-full py-6 bg-white/5 text-white border border-white/10 font-black uppercase text-xs tracking-[0.2em] rounded-[2rem] hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95"><Share2 size={18} /> Share Work</button>
              </div> */}
              <p className="text-center text-gray-600 text-[9px] font-black uppercase tracking-widest">Aman FTX Archives © 2026</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetails;