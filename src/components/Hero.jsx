import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/20 blur-[140px] rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-pink-500/10 blur-[100px] rounded-full"></div>

      {/* Content */}
<div className="relative z-10 text-center px-6 max-w-4xl">

  {/* 🔥 Main Heading */}
  <h1 className="text-3xl md:text-5xl text-white leading-tight font-semibold">

    WE TURN{" "}

    <span className="merienda-AB bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      RAW FOOTAGE
    </span>{" "}

    INTO <br />

    <span className="merienda-AB bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
      PREMIUM LOOKING CONTENT
    </span>{" "}

    <br />

    <span className="merienda-AB tracking-wide text-white">
      that convert
    </span>

  </h1>

{/* </div> */}
        {/* Subheading */}
        {/* <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
          Helping creators & brands grow faster with high-quality edits that
          attract attention and boost engagement.
        </p> */}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          {/* Primary CTA */}
          <a href="tel:+917233017308">
            <button className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition">
              Book a Free Call
            </button>
          </a>

          {/* Secondary CTA */}
          <Link to="/portfolio">
            <button className="w-full sm:w-auto px-10 py-3.5 border border-purple-400/40 text-white font-medium rounded-xl hover:bg-purple-500/10 transition duration-300">
              View My Work
            </button>
          </Link>
        </div>
        <br />
        {/* Small Trust Line */}
        <Link to="/hire-me">
          <button className="w-full sm:w-auto px-10 py-3.5 bg-blue text-white font-bold rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition duration-300">
            Get my First Work
          </button>
        </Link>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-10 bg-gradient-to-b from-purple-500 to-transparent"></div>
      </div>

      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
    </section>
  );
};

export default Hero;
