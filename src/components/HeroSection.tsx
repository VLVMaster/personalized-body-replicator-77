
import RevealOnScroll from './ui/RevealOnScroll';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-visible">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-vlv-light/50 to-background z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-16 w-64 h-64 bg-vlv-purple/5 rounded-full blur-3xl animate-float z-0" />
      <div className="absolute bottom-1/3 left-16 w-80 h-80 bg-vlv-burgundy/5 rounded-full blur-3xl animate-float animation-delay-2000 z-0" />
      
      <div className="section-container grid md:grid-cols-1 gap-12 items-center z-10 max-w-3xl mx-auto text-center">
        <div>
          <RevealOnScroll animation="slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-balance text-foreground">
              Your Body, <span className="gradient-text">Perfectly Replicated</span>
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll animation="slide-up" delay="delay-300">
            <p className="text-lg md:text-xl text-foreground opacity-90 mb-4 mx-auto">
              At VLV, we empower OnlyFans creators to transform their unique image into personalised products, with zero upfront costs.
            </p>
            <p className="text-lg md:text-xl text-foreground opacity-90 mb-8 mx-auto font-medium">
              <strong>Simply scan, sell, and profit.</strong>
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll animation="slide-up" delay="delay-400">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#signup" 
                className="button-primary flex items-center justify-center gap-2 group"
              >
                Register Your Interest
                <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
