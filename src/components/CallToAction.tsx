
import { useState } from 'react';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RevealOnScroll from './ui/RevealOnScroll';

const CallToAction = () => {
  const { toast } = useToast();

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
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                <a 
                  href="https://inta.io/download" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button-primary flex items-center justify-center gap-2 group"
                >
                  <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="Download on App Store" className="h-10" />
                </a>
                <a 
                  href="https://inta.io/download" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button-secondary flex items-center justify-center gap-2 group"
                >
                  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-12" />
                </a>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-vlv-light/50 p-4 rounded-lg">
                  <PoundSterling className="h-6 w-6 text-vlv-purple mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Zero Upfront Costs</h4>
                  <p className="text-sm text-muted-foreground">No financial risk to get started</p>
                </div>
                <div className="bg-vlv-light/50 p-4 rounded-lg">
                  <Lock className="h-6 w-6 text-vlv-purple mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Privacy Guaranteed</h4>
                  <p className="text-sm text-muted-foreground">Your data stays completely secure</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                Available for iOS and Android devices
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
