import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, Image as ImageIcon, CheckCircle, AlertCircle, Loader2, Plus, FolderPlus, Briefcase, Wrench } from "lucide-react";

const AddProject = () => {
  const [activeTab, setActiveTab] = useState("project");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Project States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [previews, setPreviews] = useState({ image: null, video: null });

  // New Category States
  const [newCatName, setNewCatName] = useState("");
  const [newCatImage, setNewCatImage] = useState(null);
  const [catPreview, setCatPreview] = useState(null);

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
    } else if (type === "catImage") {
      setNewCatImage(file);
      setCatPreview(URL.createObjectURL(file));
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !image || !video) {
      setStatus({ type: "error", message: "Saari fields bharna zaruri hai!" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tools", JSON.stringify(selectedTools)); 
    formData.append("image", image);
    formData.append("video", video);

    try {
      setLoading(true);
      await axios.post("https://amanftx-backend.onrender.com/api/projects", formData);
      setStatus({ type: "success", message: "Masterpiece Published! 🚀" });
      setTitle(""); setDescription(""); setCategory(""); setSelectedTools([]);
      setImage(null); setVideo(null); setPreviews({ image: null, video: null });
    } catch (err) {
      setStatus({ type: "error", message: "Upload fail ho gaya!" });
    } finally { setLoading(false); }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!newCatName || !newCatImage) {
      setStatus({ type: "error", message: "Category ka naam aur image dono chahiye!" });
      return;
    }
    const formData = new FormData();
    formData.append("name", newCatName);
    formData.append("displayTitle", newCatName);
    formData.append("image", newCatImage);

    try {
      setLoading(true);
      await axios.post("https://amanftx-backend.onrender.com/api/categories", formData);
      setStatus({ type: "success", message: "Category Added! 🎉" });
      setNewCatName(""); setNewCatImage(null); setCatPreview(null);
      fetchCategories();
    } catch (err) {
      setStatus({ type: "error", message: "Category add nahi ho payi!" });
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 pb-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-8 bg-white/5 p-2 rounded-3xl border border-white/10 w-fit mx-auto">
          <button onClick={() => { setActiveTab("project"); setStatus({type:"", message:""}); }} className={`px-8 py-3 rounded-2xl flex items-center gap-2 transition-all font-bold uppercase text-xs tracking-widest ${activeTab === 'project' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-gray-400 hover:text-white'}`}>
            <Briefcase size={16} /> Add Project
          </button>
          <button onClick={() => { setActiveTab("category"); setStatus({type:"", message:""}); }} className={`px-8 py-3 rounded-2xl flex items-center gap-2 transition-all font-bold uppercase text-xs tracking-widest ${activeTab === 'category' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-gray-400 hover:text-white'}`}>
            <FolderPlus size={16} /> Manage Categories
          </button>
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
          {activeTab === "project" ? (
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-600 rounded-2xl"><Upload size={24} /></div>
                <h2 className="text-2xl font-black uppercase italic">Post New Edit</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Project Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl focus:border-purple-500 outline-none" />
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl focus:border-purple-500 outline-none appearance-none font-bold italic">
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.displayTitle}</option>)}
                </select>
              </div>

              {/* TOOLS SELECTION SECTION */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-2 flex items-center gap-2"><Wrench size={12}/> Select Tools Used</label>
                <div className="flex flex-wrap gap-2 p-4 bg-black/50 border border-white/5 rounded-2xl">
                  {availableTools.map(tool => (
                    <button key={tool} type="button" onClick={() => toggleTool(tool)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${selectedTools.includes(tool) ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}>{tool}</button>
                  ))}
                </div>
              </div>

              <textarea placeholder="Description..." value={description} onChange={(e)=>setDescription(e.target.value)} rows="3" className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl focus:border-purple-500 outline-none resize-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-40 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
                  {previews.image ? <img src={previews.image} className="w-full h-full object-cover rounded-3xl" /> : <><ImageIcon className="text-gray-600 mb-2" /><span className="text-[10px] font-bold text-gray-500 uppercase">Thumbnail</span></>}
                  <input type="file" accept="image/*" onChange={(e)=>handleFileChange(e, "image")} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <div className="relative h-40 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
                  {previews.video ? <video src={previews.video} className="w-full h-full object-cover rounded-3xl" muted /> : <><Film className="text-gray-600 mb-2" /><span className="text-[10px] font-bold text-gray-500 uppercase">Video File</span></>}
                  <input type="file" accept="video/*" onChange={(e)=>handleFileChange(e, "video")} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-purple-600 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-purple-500 transition-all flex justify-center items-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : "Publish Project"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCategorySubmit} className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-600 rounded-2xl"><Plus size={24} /></div>
                <h2 className="text-2xl font-black uppercase italic">Create Category</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <input type="text" placeholder="Category Name" value={newCatName} onChange={(e)=>setNewCatName(e.target.value)} className="w-full bg-black/50 border border-white/10 p-4 rounded-2xl focus:border-purple-500 outline-none" />
                </div>
                <div className="relative h-48 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center group">
                  {catPreview ? <img src={catPreview} className="w-full h-full object-cover rounded-3xl shadow-2xl" /> : <><ImageIcon className="text-gray-600 mb-2" /><span className="text-[10px] font-bold text-gray-500 uppercase">Folder Cover</span></>}
                  <input type="file" accept="image/*" onChange={(e)=>handleFileChange(e, "catImage")} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-indigo-600 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all flex justify-center items-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : "Create Category Folder"}
              </button>
            </form>
          )}

          <AnimatePresence>
            {status.message && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-6 p-4 rounded-2xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <span className="text-xs font-bold uppercase">{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProject;