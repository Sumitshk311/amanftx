import { Plus, Trash2, LogOut, RefreshCcw, GripVertical, Edit3, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://amanftx-backend.onrender.com/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bhai, delete kar dein?")) {
      try {
        await axios.delete(`https://amanftx-backend.onrender.com/api/projects/${id}`);
        setProjects(projects.filter((p) => p._id !== id));
      } catch (error) {
        alert("Error deleting project");
      }
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-10 px-4 md:px-6 max-w-6xl mx-auto bg-[#020205]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            Admin <span className="text-purple-600">Control</span>
          </h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Manage your visual portfolio</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={fetchProjects} 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white p-3 rounded-2xl hover:bg-white/10 transition-all"
          >
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
          </button>
          
          <Link 
            to="/admin/add-project" 
            className="flex-[2] md:flex-none flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_10px_30px_rgba(147,51,234,0.3)]"
          >
            <Plus size={16} /> Add New
          </Link>
        </div>
      </div>

      {/* Main List Container */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-gray-600 uppercase text-xs font-bold tracking-[0.3em] animate-pulse">
            Syncing Database...
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-5 px-8 py-4 text-[10px] uppercase font-black tracking-widest text-gray-600">
              <span>Thumbnail</span>
              <span className="col-span-2">Project Name & Category</span>
              <span className="text-right col-span-2">Actions</span>
            </div>

            <AnimatePresence>
              {projects.map((p) => (
                <div key={p._id} className="relative group overflow-hidden rounded-3xl">
                  
                  {/* Background Delete Action (Slide effect) */}
                  <div className="absolute inset-0 flex items-center justify-end px-8">
                    <div className="text-center">
                      <Trash2 className="text-white mx-auto" size={24} />
                      <span className="text-[8px] text-white font-bold uppercase tracking-tighter">Release to Delete</span>
                    </div>
                  </div>

                  {/* Foreground Content Card */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -120 }}
                    dragElastic={0.1}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) handleDelete(p._id);
                    }}
                    className="relative z-10 bg-white/[0.03] backdrop-blur-xl border border-white/5 p-4 md:px-8 md:py-4 flex items-center justify-between transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-center gap-4 md:grid md:grid-cols-5 md:w-full md:gap-0">
                      
                      {/* Thumbnail & Mobile Grip */}
                      <div className="flex items-center gap-3">
                        <GripVertical size={16} className="text-gray-700 md:hidden flex-shrink-0" />
                        <img 
                          src={p.thumbnailUrl} 
                          alt="thumb" 
                          className="w-16 h-10 md:w-20 md:h-12 object-cover rounded-xl border border-white/10"
                        />
                      </div>

                      {/* Title & Category */}
                      <div className="flex flex-col col-span-2">
                        <span className="text-white font-black italic uppercase tracking-tighter text-sm md:text-base truncate max-w-[150px] md:max-w-none">
                          {p.title}
                        </span>
                        <span className="text-purple-500 text-[9px] md:text-[10px] uppercase font-bold tracking-widest">
                          {p.category}
                        </span>
                      </div>

                      {/* Desktop Actions */}
                      <div className="hidden md:flex justify-end items-center gap-2 col-span-2">
                        <button 
                          onClick={() => navigate(`/admin/edit-project/${p._id}`)}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                          title="Edit Project"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(p._id)}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                          title="Delete Project"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Only: Inline Edit & Indicator */}
                    <div className="md:hidden flex items-center gap-4">
                      <button 
                        onClick={() => navigate(`/admin/edit-project/${p._id}`)}
                        className="p-3 bg-purple-600/20 text-purple-500 rounded-2xl"
                      >
                        <Edit3 size={18} />
                      </button>
                      <div className="flex flex-col items-center opacity-30">
                         <ChevronRight size={14} className="animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>

            {projects.length === 0 && !loading && (
              <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-gray-600 uppercase text-[10px] font-black tracking-[0.4em]">Empty Portfolio</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logout / Exit */}
      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-all font-bold uppercase text-[10px] tracking-widest"
        >
          <LogOut size={14} /> Exit Admin Session
        </button>
      </div>
    </section>
  );
};

export default AdminDashboard;