import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      {showVideo && (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="background-video"
        >
          <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236234db2db9c25a5bbc7b7cf0bfe8b5e5f9cb41&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          {/* Fallback image */}
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Aerial landscape view" 
            className="w-full h-full object-cover"
          />
        </motion.video>
      )}
      
      <div className="hero-overlay absolute inset-0"></div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
        data-testid="hero-content"
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.5, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-gradient mb-8 leading-tight font-serif"
          data-testid="hero-title"
        >
          Qual momento você quer<br />
          <span className="text-primary">eternizar hoje?</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          data-testid="hero-subtitle"
        >
          Capturamos a beleza do mundo através de uma perspectiva única: do alto dos céus
        </motion.p>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 4.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
          data-testid="hero-buttons"
        >
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all hover-scale"
            data-testid="button-contact"
          >
            Entre em Contato
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="glass-effect hover:bg-muted/50 text-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all hover-scale"
            data-testid="button-portfolio"
          >
            Ver Portfólio
          </button>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5.5, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => scrollToSection("portfolio")}
        data-testid="scroll-indicator"
      >
        <ChevronDown size={32} className="text-muted-foreground" />
      </motion.div>
    </section>
  );
}
