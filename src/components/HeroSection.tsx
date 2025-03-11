
import RevealOnScroll from './ui/RevealOnScroll';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-visible">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-vlv-light/50 to-background z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-16 w-64 h-64 bg-vlv-purple/5 rounded-full blur-3xl animate-float z-0" />
      <div className="absolute bottom-1/3 left-16 w-80 h-80 bg-vlv-burgundy/5 rounded-full blur-3xl animate-float animation-delay-2000 z-0" />
      
      <div className="section-container grid md:grid-cols-2 gap-12 items-center z-10">
        <div className="order-2 md:order-1">
          <RevealOnScroll animation="slide-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-vlv-light text-vlv-burgundy rounded-full mb-6">
              Personalized Products for Content Creators
            </span>
          </RevealOnScroll>
          
          <RevealOnScroll animation="slide-up" delay="delay-200">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight text-balance text-foreground">
              Your Body, <span className="gradient-text">Perfectly Replicated</span>
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll animation="slide-up" delay="delay-300">
            <p className="text-lg md:text-xl text-foreground opacity-90 mb-8 max-w-xl">
              At Vulva La Replica (VLV), we empower OnlyFans creators to transform their unique image into personalized products, with zero upfront costs. Simply scan, sell, and profit.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll animation="slide-up" delay="delay-400">
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#signup" className="button-primary flex items-center justify-center gap-2 group">
                Start Earning Now
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#how-it-works" className="button-secondary">
                Learn How It Works
              </a>
            </div>
          </RevealOnScroll>
        </div>
        
        <div className="order-1 md:order-2 relative">
          <RevealOnScroll animation="zoom-in">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-vlv-purple/20 to-vlv-burgundy/20 rounded-3xl transform rotate-6 scale-95" />
              <div className="absolute inset-0 glass-panel transform rotate-3 scale-95" />
              <div className="absolute inset-0 glass-panel overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-vlv-purple/10 to-vlv-burgundy/10" />
                <div className="h-full w-full flex items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-display font-semibold text-foreground">From Scan to Profit</h3>
                    <p className="text-lg text-foreground opacity-90">Create your personalized product and start earning with a 50/50 revenue share.</p>
                    <div className="flex justify-center">
                      <span className="text-4xl font-bold gradient-text">$50+</span>
                    </div>
                    <p className="text-sm text-foreground opacity-70">Your profit per sale</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
