import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Search } from "lucide-react";
import { useEffect } from "react";
import heroImage from "../assets/Hero.png";
import ShaderBackground from "./ui/shader-background";


export function TranscendHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const figureX = useTransform(springX, [-1, 1], [-25, 25]);
  const figureY = useTransform(springY, [-1, 1], [-15, 15]);
  const textX = useTransform(springX, [-1, 1], [12, -12]);
  const glowX = useTransform(springX, [-1, 1], [-40, 40]);
  const glowY = useTransform(springY, [-1, 1], [-30, 30]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
    >
      <ShaderBackground />
      {/* Cosmic backdrop layers */}
      <div className="hero-stars" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] rounded-full"
        style={{
          background: "var(--gradient-purple-glow)",
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          animation: "pulse-glow 5s ease-in-out infinite",
        }}
      />
      <div className="hero-grain" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-30 flex items-center justify-between px-6 py-6 md:px-12 md:py-8"
      >
        <div className="flex items-center gap-10">
          <a href="/" aria-label="Home" className="group">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/30 bg-white/5 backdrop-blur-sm transition-colors group-hover:border-white/70">
              <div className="h-3 w-3 rounded-[2px] bg-white" />
            </div>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {["Creator", "Collection", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-xs font-medium uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--hero-purple-glow)] transition-all duration-300 hover:w-full" />
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5 md:gap-7">
          <button
            aria-label="Favorites"
            className="text-white/80 transition-colors hover:text-[var(--hero-purple-glow)]"
          >
            <Heart className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Search"
            className="text-white/80 transition-colors hover:text-[var(--hero-purple-glow)]"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <a
            href="#explore"
            className="group relative text-xs font-semibold uppercase tracking-[0.25em] text-white"
          >
            Explore
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
          </a>
        </div>
      </motion.header>

      {/* Stage */}
      <div className="relative z-10 flex min-h-[calc(100vh-100px)] items-center justify-center">
        {/* Big TRANSCEND text */}
        <motion.h1
          initial={{ opacity: 0, scale: 1.1, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "-0.04em" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--hero-text)",
            x: textX,
            mixBlendMode: "screen",
          }}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-tighter opacity-90 md:text-[16vw]"
        >
          TRANSCEND
        </motion.h1>

        {/* 3D Figure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: figureX, y: figureY }}
          className="relative z-20 h-[90vh] max-h-[900px] w-auto"
        >
          <div
            style={{ animation: "float-slow 7s ease-in-out infinite" }}
            className="relative h-full"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 blur-[140px]"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.62 0.32 305 / 0.95) 0%, oklch(0.45 0.28 300 / 0.5) 35%, transparent 70%)",
              }}
            />
            <img
              src={heroImage}
              alt="Futuristic chrome sculpture with neon purple energy veins"
              width={1024}
              height={1024}
              className="relative h-full w-auto object-contain drop-shadow-[0_40px_120px_rgba(170,70,240,0.65)]"
              style={{
                maskImage:
                  "radial-gradient(ellipse 70% 85% at 50% 45%, black 55%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 85% at 50% 45%, black 55%, transparent 95%)",
                filter: "contrast(1.05) saturate(1.15)",
              }}
            />
          </div>
        </motion.div>

        {/* Bottom-left text block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="absolute bottom-8 left-6 z-30 max-w-[260px] md:bottom-12 md:left-12"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="h-px w-6 bg-[var(--hero-purple-glow)]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90">
              Guided by the Glow
            </p>
          </div>
          <p className="text-xs leading-relaxed text-white/55">
            In the haze of luminous brilliance, existence is redefined by the
            light of endless creation.
          </p>
        </motion.div>

        {/* Bottom-right tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="absolute bottom-8 right-6 z-30 md:bottom-12 md:right-12"
        >
          <p className="text-[10px] font-medium tracking-[0.2em] text-white/40">
            @svg.graphixx
          </p>
        </motion.div>
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, oklch(0.03 0.02 280 / 0.85) 100%)",
        }}
      />
    </section>
  );
}
