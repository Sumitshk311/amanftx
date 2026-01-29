import { Link } from "react-router-dom";

const Hero = () => {
  return (
    // Yahan bg-[#020205] hata kar bg-transparent kar diya hai taaki App.jsx ki image dikhe
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden pt-20">
      {/* Background Glows (Image ke upar depth dene ke liye) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-indigo-500/10 blur-[80px] rounded-full"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Main Heading with Lens Flare effect */}
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-4">
            Professional Video Editor
          </h1>
          {/* Light Streak (Heading ke upar wali chamak) */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
        </div>

        {/* Subheading */}
        <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide mb-10 max-w-2xl mx-auto">
          Transforming Ideas <span className="italic font-serif">Iɴto</span>{" "}
          Stunning Edits
        </p>

        {/* Action Buttons (Wahi purane wale) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-10 py-3.5 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-lg transition-all duration-300 shadow-[0_0_25px_rgba(126,34,206,0.4)] active:scale-95">
          <Link to="/portfolio">
            View My Work
          </Link>
          </button>

          <Link to="/hire-me">
            <button className="w-full sm:w-auto px-10 py-3.5 bg-transparent border border-white/20 hover:border-white/50 text-white font-bold rounded-lg transition-all duration-300 hover:bg-white/5 active:scale-95">
              Hire Me
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent"></div>
      </div>

      {/* Carbon Fibre Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
    </section>
  );
};

export default Hero;
