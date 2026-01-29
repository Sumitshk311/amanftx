import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import axios from "axios";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    thumbnailUrl: "",
    videoUrl: "",
  });

  // 1. Purana Data Load Karna
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`https://amanftx-backend.onrender.com/api/projects/${id}`);
        setFormData(res.data);
      } catch (err) {
        alert("Project load nahi ho paya!");
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  // 2. Update Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`https://amanftx-backend.onrender.com/api/projects/${id}`, formData);
      alert("🔥 Masterpiece Updated!");
      navigate("/admin");
    } catch (err) {
      alert("Update fail ho gaya!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020205] flex items-center justify-center">
      <Loader2 className="text-purple-500 animate-spin" size={40} />
    </div>
  );

  return (
    <section className="min-h-screen bg-[#020205] pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-all mb-8 uppercase text-[10px] font-black tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
          
          <div className="mb-10">
            <h4 className="flex items-center gap-2 text-purple-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
              <Sparkles size={12} /> Refine your work
            </h4>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white tracking-tighter">
              Edit <span className="text-purple-600">Project</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-4">Project Title</label>
              <input 
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all font-bold italic"
                placeholder="Enter Project Name"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-4">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all font-bold appearance-none"
              >
                <option value="Anime Edit">Anime Edit</option>
                <option value="Reels">Reels</option>
                <option value="Commercial">Commercial</option>
                <option value="Short Film">Short Film</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Thumbnail URL */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-4">Thumbnail Link</label>
                <input 
                  type="text"
                  required
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                  placeholder="https://imgur.com/..."
                />
              </div>

              {/* Video URL */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-4">Video Link (YT/Drive)</label>
                <input 
                  type="text"
                  required
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-xs focus:outline-none focus:border-purple-500/50 transition-all"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            {/* Live Preview (Chota Thumbnail) */}
            <div className="mt-4 p-4 bg-black/40 rounded-3xl border border-white/5 flex items-center gap-4">
               <div className="w-20 h-12 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                  {formData.thumbnailUrl ? (
                    <img src={formData.thumbnailUrl} className="w-full h-full object-cover" alt="preview" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-800"><ImageIcon size={16}/></div>
                  )}
               </div>
               <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest italic">Live Preview of your current thumbnail</p>
            </div>

            {/* Submit Button */}
            <button
              disabled={updating}
              type="submit"
              className="w-full bg-white text-black py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-purple-600 hover:text-white transition-all active:scale-95 disabled:opacity-50"
            >
              {updating ? <Loader2 className="animate-spin" size={16}/> : <Save size={16} />}
              Save Changes
            </button>
          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default EditProject;