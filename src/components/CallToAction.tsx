
import { useState } from 'react';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RevealOnScroll from './ui/RevealOnScroll';

const CallToAction = () => {
  const { toast } = useToast();

  const handleDownloadClick = () => {
    toast({
      title: "Coming Soon!",
      description: "The VLV Scanning App will be available shortly. We'll notify you when it's ready.",
      duration: 5000,
    });
  };

  return (
    <section id="signup" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-vlv-light/30 to-vlv-light/10 z-0" />
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-10">
              <h2 className="section-heading">
                Get <span className="gradient-text">Started</span> Today
              </h2>
              <p className="section-subheading mx-auto">
                Download the VLV Scanning App and start your journey to creating personalised products
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-40 h-40 bg-vlv-purple/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-vlv-burgundy/5 rounded-full blur-2xl" />
            
            <RevealOnScroll animation="slide-up">
              <h3 className="text-2xl font-semibold mb-6">Download the VLV Scanning App</h3>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Create your account and start your journey to earning £50+ per sale with zero upfront costs.
              </p>
              
              <button 
                onClick={handleDownloadClick}
                className="button-primary flex items-center justify-center gap-2 group mx-auto"
              >
                Download App
                <Download size={18} className="transition-transform group-hover:translate-y-1" />
              </button>
              
              <p className="text-sm text-muted-foreground mt-6">
                Available soon for iOS and Android devices
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
