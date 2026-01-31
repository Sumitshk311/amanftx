import { Plus, Trash2, LogOut, RefreshCcw, GripVertical, Edit3, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [holdProject, setHoldProject] = useState(null); // 🔥 hold popup state
  const holdTimer = useRef(null);

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
    try {
      await axios.delete(`https://amanftx-backend.onrender.com/api/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
      setHoldProject(null);
    } catch (error) {
      alert("Error deleting project");
    }
  };

  // 🔥 HOLD EVENTS
  const handleTouchStart = (project) => {
    holdTimer.current = setTimeout(() => {
      setHoldProject(project);
    }, 600); // 0.6 second hold
  };

  const handleTouchEnd = () => {
    clearTimeout(holdTimer.current);
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
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white p-3 rounded-2xl"
          >
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
          </button>

          <Link
            to="/admin/add-project"
            className="flex-[2] md:flex-none flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest"
          >
            <Plus size={16} /> Add New
          </Link>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-20 text-center text-gray-600 uppercase text-xs animate-pulse">
            Syncing Database...
          </div>
        ) : (
          <AnimatePresence>
            {projects.map((p) => (
              <motion.div
                key={p._id}
                onTouchStart={() => handleTouchStart(p)}
                onTouchEnd={handleTouchEnd}
                className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <GripVertical size={16} className="text-gray-600 md:hidden" />
                  <img
                    src={p.thumbnailUrl}
                    className="w-16 h-10 object-cover rounded-xl border border-white/10"
                  />
                  <div>
                    <p className="text-white font-bold text-sm truncate max-w-[150px]">
                      {p.title}
                    </p>
                    <p className="text-purple-500 text-[9px] uppercase font-bold">
                      {p.category}
                    </p>
                  </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/edit-project/${p._id}`)}
                    className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:text-blue-400"
                  >
                    <Edit3 size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Mobile Edit Button */}
                <div className="md:hidden">
                  <button
                    onClick={() => navigate(`/admin/edit-project/${p._id}`)}
                    className="p-3 bg-purple-600/20 text-purple-500 rounded-xl"
                  >
                    <Edit3 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* HOLD DELETE POPUP */}
      <AnimatePresence>
        {holdProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-[#0b0b12] border border-white/10 p-8 rounded-3xl text-center max-w-xs"
            >
              <p className="text-white font-bold text-lg mb-2">
                Delete Project?
              </p>
              <p className="text-gray-500 text-xs mb-6">
                {holdProject.title}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setHoldProject(null)}
                  className="flex-1 py-3 bg-white/10 rounded-xl text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleDelete(holdProject._id)}
                  className="flex-1 py-3 bg-red-600 rounded-xl text-white font-bold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 font-bold text-[10px]"
        >
          <LogOut size={14} /> Exit Admin Session
        </button>
      </div>
    </section>
  );
};

export default AdminDashboard;
