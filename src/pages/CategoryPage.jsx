import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Play } from "lucide-react";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProjects = async () => {
      try {
        const response = await axios.get("https://amanftx-backend.onrender.com/api/projects");
        // Sirf wahi projects filter karein jo iss category ke hain
        const filtered = response.data.filter(p => p.category === categoryName);
        setProjects(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProjects();
  }, [categoryName]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-black italic">Filtering {categoryName}...</div>;

  return (
    <section className="min-h-screen pt-40 pb-20 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white mb-10 uppercase text-[10px] font-black tracking-widest transition-all">
          <ArrowLeft size={14} /> Back to Archives
        </button>

        <h2 className="text-6xl md:text-8xl font-black uppercase italic mb-16">
          {categoryName} <span className="text-purple-600">Collection</span>
        </h2>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={project._id}
              className="relative aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer"
            >
              <Link to={`/portfolio/${project._id}`}>
                <img src={project.thumbnailUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-2xl scale-50 group-hover:scale-100 transition-transform">
                      <Play fill="currentColor" size={24} />
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                   <h3 className="text-xl font-black uppercase italic tracking-tighter">{project.title}</h3>
                   <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">Click to view details</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;