import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, ChevronRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const HireMe = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    projectType: "",
    commitment: "",
    budget: "",
    timeline: "",
  });

  const questions = [
    {
      id: "projectType",
      question: "Select your project category",
      options: ["Premium Anime Edit", "High-Retention Reels", "Commercial/Brand Ad", "YouTube Documentary"],
    },
    {
      id: "commitment",
      question: "Are you looking for a long-term editor?",
      options: ["Yes, for 10+ videos/month", "Monthly Retainer", "One-time Masterpiece", "Just testing the waters"],
    },
    {
      id: "budget",
      question: "Your investment budget per video?",
      options: ["Professional (₹5,000+)", "Standard (₹3,000 - ₹5,000)", "Trial (₹1,500+)", "Budget is not an issue"],
    },
    {
      id: "timeline",
      question: "When do you need the first draft?",
      options: ["Urgent (24-48 Hours)", "Within a Week", "Flexible Timeline", "I'm planning for next month"],
    },
  ];

  const handleOptionSelect = (option) => {
    setFormData((prev) => ({ ...prev, [questions[currentStep].id]: option }));
    setCurrentStep((prev) => prev + 1);
  };

  const openWhatsApp = () => {
    const message = `*NEW INQUIRY FROM PORTFOLIO*%0A%0A🚀 *Project:* ${formData.projectType}%0A🤝 *Type:* ${formData.commitment}%0A💰 *Budget:* ${formData.budget}%0A📅 *Timeline:* ${formData.timeline}%0A%0A_Aman, I am serious about this. Let's discuss the details._`;
    window.open(`https://wa.me/7233017308?text=${message}`, "_blank");
  };

  return (
    <section className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      
      {/* Background Polish */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.08),transparent_50%)]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />

      {/* Header Navigation */}
      <div className="absolute top-10 left-6 right-6 flex justify-between items-center z-20 max-w-7xl mx-auto w-full">
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 text-white/40 hover:text-white transition-all uppercase text-[10px] font-black tracking-[0.3em]"
        >
          <ArrowLeft size={14} /> Close
        </button>
        <div className="flex flex-col items-end">
          <span className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">Progress</span>
          <div className="flex gap-1 mt-1">
            {questions.map((_, i) => (
              <div key={i} className={`h-1 w-6 rounded-full transition-all duration-500 ${i <= currentStep ? "bg-purple-600" : "bg-white/10"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <AnimatePresence mode="wait">
          {currentStep < questions.length ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <span className="flex items-center gap-2 text-purple-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  <Sparkles size={12} /> Step {currentStep + 1}
                </span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] italic uppercase">
                  {questions[currentStep].question}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="group flex items-center justify-between p-6 bg-white/[0.03] border border-white/10 rounded-[2rem] hover:bg-white hover:text-black transition-all duration-500 text-left overflow-hidden relative"
                  >
                    <span className="text-lg font-black italic uppercase tracking-tight z-10">{option}</span>
                    <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500 z-10" size={24} />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 bg-white/[0.02] border border-white/5 p-12 md:p-20 rounded-[4rem] backdrop-blur-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600" />
              
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={48} className="text-purple-500" />
              </div>

              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Verified.</h2>
                <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                  Your requirements match my expertise perfectly.
                </p>
              </div>

              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-4 bg-purple-600 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_20px_40px_rgba(147,51,234,0.3)] active:scale-95"
              >
                <MessageCircle size={18} />
                Send Inquiry Now
              </button>
              
              <p className="text-[8px] text-gray-700 uppercase tracking-[0.5em] font-bold">
                🔒 Professional Privacy Guaranteed
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HireMe;