
import { useState } from 'react';
import RevealOnScroll from './ui/RevealOnScroll';
import RegistrationDialog from './RegistrationDialog';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-8 overflow-visible">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-vlv-light/50 to-background z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-16 w-64 h-64 bg-vlv-purple/5 rounded-full blur-3xl animate-float z-0" />
      <div className="absolute bottom-1/3 left-16 w-80 h-80 bg-vlv-burgundy/5 rounded-full blur-3xl animate-float animation-delay-2000 z-0" />
      
      <div className="section-container grid md:grid-cols-1 gap-12 items-center z-10 max-w-3xl mx-auto text-center">
        <div>
          <RevealOnScroll animation="slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-balance text-foreground whitespace-nowrap">
              Your Body, <span className="gradient-text">Perfectly Replicated</span>
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll animation="slide-up" delay="delay-300">
            <p className="text-lg md:text-xl text-foreground opacity-90 mb-8 mx-auto">
              At MoldMe, we help creators transform their most intimate features into personalised replica sex toys. <strong>Simply scan, sell, and profit.</strong>
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll animation="slide-up" delay="delay-400">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsDialogOpen(true)} 
                className="button-primary flex items-center justify-center gap-2 group"
              >
                Register Interest
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <RegistrationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </section>
  );
};

export default HeroSection;
