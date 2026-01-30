import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, Image as ImageIcon, CheckCircle, AlertCircle, Loader2, Plus, Wrench, X } from "lucide-react";

const AddProject = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [showAddCat, setShowAddCat] = useState(false);

  // Project States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [previews, setPreviews] = useState({ image: null, video: null });

  // New Category State
  const [newCatName, setNewCatName] = useState("");

  const availableTools = ["Premiere Pro", "After Effects", "DaVinci Resolve", "Photoshop", "CapCut", "Blender"];

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://amanftx-backend.onrender.com/api/categories");
      setCategories(res.data);
    } catch (error) { console.error("Categories load nahi ho payi", error); }
  };

  const toggleTool = (tool) => {
    setSelectedTools(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "image") {
      setImage(file);
      setPreviews(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    } else if (type === "video") {
      setVideo(file);
      setPreviews(prev => ({ ...prev, video: URL.createObjectURL(file) }));
    }
  };

  // ✅ Category Submit Fix (Proper JSON)
  const handleCategorySubmit = async () => {
    if (!newCatName) return;
    try {
      setLoading(true);
      const res = await axios.post("https://amanftx-backend.onrender.com/api/categories", { 
        name: newCatName,
        displayTitle: newCatName 
      });
      setCategories([...categories, res.data]);
      setCategory(res.data.name);
      setNewCatName("");
      setShowAddCat(false);
      setStatus({ type: "success", message: "Category Added! 🔥" });
    } catch (err) {
      setStatus({ type: "error", message: "Category add nahi ho payi!" });
    } finally { setLoading(false); }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !image || !video) {
      setStatus({ type: "error", message: "Bhai, sab kuch bharna zaroori hai!" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    
    // ✅ TOOLS FIX: FormData mein array aise bheja jata hai
    selectedTools.forEach((tool) => {
        formData.append("tools", tool); 
    });

    formData.append("image", image);
    formData.append("video", video);

    try {
      setLoading(true);
      // Backend ko request
      await axios.post("https://amanftx-backend.onrender.com/api/projects", formData, {
          headers: { "Content-Type": "multipart/form-data" }
      });

      setStatus({ type: "success", message: "Successfully Published! 🚀" });
      
      // Reset Form
      setTitle(""); setDescription(""); setCategory(""); setSelectedTools([]);
      setImage(null); setVideo(null); setPreviews({ image: null, video: null });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Upload fail ho gaya!" });
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 pt-24 pb-20">
      <div className="max-w-4xl mx-auto">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
          
          <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
            <div className="p-4 bg-purple-600 rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.3)]"><Upload size={28} /></div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">Upload <span className="text-purple-500">Project</span></h2>
              <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">Add your latest work to the portfolio</p>
            </div>
          </div>

          <form onSubmit={handleProjectSubmit} className="space-y-8">
            
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-4">Project Title</label>
                <input type="text" placeholder="e.g. Anime Music Video" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-purple-500 outline-none transition-all font-bold" />
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-4">Category</label>
                <div className="flex gap-2">
                  <select value={category} onChange={(e)=>setCategory(e.target.value)} className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-purple-500 outline-none appearance-none font-bold italic">
                    <option value="">Choose Category</option>
                    {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.displayTitle}</option>)}
                  </select>
                  <button type="button" onClick={() => setShowAddCat(!showAddCat)} className={`p-5 rounded-2xl transition-all ${showAddCat ? 'bg-red-500/20 text-red-500' : 'bg-purple-600 text-white'}`}>
                    {showAddCat ? <X size={20}/> : <Plus size={20} />}
                  </button>
                </div>

                {/* Inline Add Category Input */}
                <AnimatePresence>
                  {showAddCat && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-20 top-full left-0 right-0 mt-2 p-4 bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex gap-2">
                      <input type="text" placeholder="New category name..." value={newCatName} onChange={(e)=>setNewCatName(e.target.value)} className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-purple-500" />
                      <button type="button" onClick={handleCategorySubmit} className="bg-purple-600 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest">Add</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Tools Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-4 flex items-center gap-2"><Wrench size={12}/> Tools Used</label>
              <div className="flex flex-wrap gap-2 p-5 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                {availableTools.map(tool => (
                  <button key={tool} type="button" onClick={() => toggleTool(tool)} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all border ${selectedTools.includes(tool) ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}>{tool}</button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-4">Short Description</label>
              <textarea placeholder="Tell something about the edit..." value={description} onChange={(e)=>setDescription(e.target.value)} rows="3" className="w-full bg-white/5 border border-white/10 p-5 rounded-[2rem] focus:border-purple-500 outline-none resize-none transition-all font-medium" />
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group h-48 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-purple-500/50 bg-white/[0.01]">
                {previews.image ? <img src={previews.image} className="w-full h-full object-cover" alt="Preview" /> : (
                  <div className="text-center">
                    <ImageIcon className="text-gray-600 mx-auto mb-3" size={32} />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select Thumbnail</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e)=>handleFileChange(e, "image")} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>

              <div className="relative group h-48 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-blue-500/50 bg-white/[0.01]">
                {previews.video ? <video src={previews.video} className="w-full h-full object-cover" muted /> : (
                  <div className="text-center">
                    <Film className="text-gray-600 mx-auto mb-3" size={32} />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select Video</span>
                  </div>
                )}
                <input type="file" accept="video/*" onChange={(e)=>handleFileChange(e, "video")} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {status.message && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`p-4 rounded-2xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                  {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <span className="text-xs font-black uppercase tracking-widest">{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={loading} className="w-full bg-white text-black py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-3">
              {loading ? <Loader2 className="animate-spin" /> : "Publish Project"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProject;