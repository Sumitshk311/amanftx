import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Portfolio = () => {
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, catRes] = await Promise.all([
          axios.get("https://amanftx-backend.onrender.com/api/projects"),
          axios.get("https://amanftx-backend.onrender.com/api/categories")
        ]);
        setWorks(projRes.data);
        setFilteredWorks(projRes.data);
        const dynamicCats = ["All", ...catRes.data.map(c => c.name)];
        setCategories(dynamicCats);
      } catch (error) {
        console.error("Data loading failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredWorks(works);
    } else {
      setFilteredWorks(works.filter(w => w.category === activeCategory));
    }
  }, [activeCategory, works]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020205] gap-6">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-16 h-16 border-t-4 border-b-4 border-purple-600 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.3)]"
      />
      <div className="text-center">
        <p className="text-white font-black uppercase tracking-[0.8em] text-[10px] animate-pulse">FTX Media</p>
        <p className="text-gray-600 text-[8px] uppercase tracking-widest mt-2 font-bold italic">Syncing Data ...</p>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-[#020205] overflow-hidden relative font-sans">
      
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 text-purple-500 mb-6 uppercase font-black tracking-[0.4em] text-[10px]">
              <div className="w-10 h-[1px] bg-purple-500"></div> 
              <Sparkles size={14} /> Portfolio
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic text-white leading-[0.85] tracking-tighter">
              Our <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>Projects</span>
            </h2>
          </motion.div>

          {/* Dynamic Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-white/[0.03] p-2 rounded-[2rem] border border-white/10 backdrop-blur-3xl shadow-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 relative overflow-hidden group ${
                  activeCategory === cat ? "bg-white text-black shadow-lg" : "text-gray-500 hover:text-white"
                }`}
              >
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((item) => (
              <motion.div 
                layout
                key={item._id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                onClick={() => navigate(`/project/${item._id}`)} // ✅ Card click to navigate
                className="group relative rounded-[3rem] overflow-hidden bg-[#050508] border border-white/5 aspect-[4/5] hover:border-purple-500/50 transition-all duration-700 shadow-2xl cursor-pointer"
              >
                {/* Thumbnail */}
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s]" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full backdrop-blur-md">
                       <p className="text-purple-500 font-black text-[8px] uppercase tracking-widest">{item.category}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-white text-3xl font-black uppercase italic mb-8 leading-none tracking-tighter group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Floating Action Link */}
                  <div className="flex items-center justify-between w-full p-6 bg-white text-black rounded-3xl transition-all duration-500 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-[0_20px_40px_rgba(147,51,234,0.3)]">
                    <div className="flex items-center gap-3">
                      <PlayCircle size={20} className="text-purple-600 group-hover:text-white transition-colors" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Project</span>
                    </div>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredWorks.length === 0 && (
          <div className="py-40 text-center border border-dashed border-white/10 rounded-[4rem]">
             <p className="text-gray-600 font-black uppercase tracking-[0.5em] italic">Project Empty</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;