import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Portfolio = () => {
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]); // Start with "All"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Projects aur Categories dono fetch karo
        const [projRes, catRes] = await Promise.all([
          axios.get("https://amanftx-backend.onrender.com/api/projects"),
          axios.get("https://amanftx-backend.onrender.com/api/categories")
        ]);

        setWorks(projRes.data);
        setFilteredWorks(projRes.data);
        
        // 2. Sirf unique names nikal lo filter ke liye
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

  // Filter Logic
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredWorks(works);
    } else {
      setFilteredWorks(works.filter(w => w.category === activeCategory));
    }
  }, [activeCategory, works]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-4">
      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white font-black uppercase tracking-[0.5em] text-[10px]">Aman FTX Archives</p>
    </div>
  );

  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-black">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 text-purple-500 mb-4 uppercase font-black tracking-[0.4em] text-[10px]">
              <Sparkles size={14} /> Premium Portfolio
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase italic text-white leading-none tracking-tighter">
              Aman <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>FTX</span>
            </h2>
          </motion.div>

          {/* Dynamic Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeCategory === cat ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((item) => (
              <motion.div 
                layout
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 aspect-[4/5]"
              >
                <img src={item.thumbnailUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>

                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <p className="text-purple-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">{item.category}</p>
                  <h3 className="text-white text-3xl font-black uppercase italic mb-8 leading-tight line-clamp-2">{item.title}</h3>
                  
                  {/* Link to Detail Page using ID */}
                  <Link 
                    to={`/project/${item._id}`} 
                    className="flex items-center justify-between w-full p-5 bg-white text-black rounded-2xl transition-all hover:bg-purple-600 hover:text-white group/btn"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">View Project</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;