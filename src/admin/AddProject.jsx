import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Film,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
  Wrench,
  X,
  Trash2,
} from "lucide-react";

const AddProject = () => {
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true); // ✅ skeleton state
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

  const [newCatName, setNewCatName] = useState("");

  const availableTools = ["Premiere Pro", "After Effects", "DaVinci Resolve", "Photoshop", "CapCut", "Blender"];

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://amanftx-backend.onrender.com/api/categories");
        setCategories(res.data || []);
      } catch (err) {
        console.error("Category fetch error", err);
      } finally {
        setCatLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Tools Toggle
  const toggleTool = (tool) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  // File Upload
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "image") {
      setImage(file);
      setPreviews((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }

    if (type === "video") {
      setVideo(file);
      setPreviews((prev) => ({ ...prev, video: URL.createObjectURL(file) }));
    }
  };

  // Remove Image/Video
  const removeFile = (type) => {
    if (type === "image") {
      setImage(null);
      setPreviews((prev) => ({ ...prev, image: null }));
    }
    if (type === "video") {
      setVideo(null);
      setPreviews((prev) => ({ ...prev, video: null }));
    }
  };

  // Add Category
  const handleCategorySubmit = async () => {
    if (!newCatName) return;
    try {
      setLoading(true);
      const res = await axios.post("https://amanftx-backend.onrender.com/api/categories", {
        name: newCatName,
        displayTitle: newCatName,
      });

      setCategories((prev) => [...prev, res.data]);
      setCategory(res.data.name);
      setNewCatName("");
      setShowAddCat(false);
      setStatus({ type: "success", message: "Category Added!" });
    } catch {
      setStatus({ type: "error", message: "Category add failed!" });
    } finally {
      setLoading(false);
    }
  };

  // Submit Project
  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !image || !video) {
      setStatus({ type: "error", message: "Title, Category, Image, Video required!" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    
    // ✅ TOOLS FIX: Backend ko array format mein bhejna
    if (selectedTools.length > 0) {
      selectedTools.forEach((tool) => {
        formData.append("tools", tool);
      });
    }

    formData.append("image", image);
    formData.append("video", video);

    try {
      setLoading(true);
      await axios.post("https://amanftx-backend.onrender.com/api/projects", formData);
      setStatus({ type: "success", message: "Project Published 🚀" });

      // Reset
      setTitle("");
      setDescription("");
      setCategory("");
      setSelectedTools([]);
      setImage(null);
      setVideo(null);
      setPreviews({ image: null, video: null });
    } catch {
      setStatus({ type: "error", message: "Upload Failed!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 pt-24 pb-20">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
            <div className="p-4 bg-purple-600 rounded-2xl">
              <Upload size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase italic">
                Upload <span className="text-purple-500">Project</span>
              </h2>
              <p className="text-gray-500 text-xs uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>

          <form onSubmit={handleProjectSubmit} className="space-y-8">

            {/* Title + Category */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase font-bold text-gray-500 ml-2">Project Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl"
                />
              </div>

              <div className="relative">
                <label className="text-xs uppercase font-bold text-gray-500 ml-2">Category</label>

                {/* Skeleton Loading */}
                {catLoading ? (
                  <div className="w-full h-14 bg-white/5 rounded-2xl animate-pulse"></div>
                ) : (
                  <div className="flex gap-2">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl text-black"
                    >
                      <option value="">Choose Category</option>
                      {categories?.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.displayTitle}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => setShowAddCat(!showAddCat)}
                      className="p-5 bg-purple-600 rounded-2xl"
                    >
                      {showAddCat ? <X size={20} /> : <Plus size={20} />}
                    </button>
                  </div>
                )}

                {/* Add Category Popup */}
                <AnimatePresence>
                  {showAddCat && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-20 mt-2 bg-[#111] border border-white/10 p-4 rounded-2xl flex gap-2 w-full"
                    >
                      <input
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl"
                      />
                      <button onClick={handleCategorySubmit} className="bg-purple-600 px-4 rounded-xl text-xs font-bold">
                        Add
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Tools */}
            <div>
              <label className="text-xs uppercase font-bold text-gray-500 ml-2 flex gap-2">
                <Wrench size={12} /> Tools Used
              </label>
              <div className="flex flex-wrap gap-2 p-5 bg-white/5 rounded-2xl">
                {availableTools.map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleTool(tool)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${
                      selectedTools.includes(tool)
                        ? "bg-purple-600"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl"
              placeholder="Short Description"
            />

            {/* Upload Image & Video */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="relative h-48 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                {previews.image ? (
                  <>
                    <img src={previews.image} className="w-full h-full object-cover" />
                    <button onClick={() => removeFile("image")} className="absolute top-2 right-2 bg-red-600 p-2 rounded-full">
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <ImageIcon size={32} className="text-gray-600" />
                )}
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="absolute inset-0 opacity-0" />
              </div>

              {/* Video */}
              <div className="relative h-48 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
                {previews.video ? (
                  <>
                    <video src={previews.video} className="w-full h-full object-cover" muted />
                    <button onClick={() => removeFile("video")} className="absolute top-2 right-2 bg-red-600 p-2 rounded-full">
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <Film size={32} className="text-gray-600" />
                )}
                <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, "video")} className="absolute inset-0 opacity-0" />
              </div>
            </div>

            {/* Status */}
            {status.message && (
              <div className={`p-4 rounded-xl flex gap-2 ${status.type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                {status.type === "success" ? <CheckCircle /> : <AlertCircle />}
                {status.message}
              </div>
            )}

            {/* Publish Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest"
            >
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Publish Project"}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProject;
