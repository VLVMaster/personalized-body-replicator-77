
import { useState } from 'react';
import { Download, PoundSterling, Lock, Shield, Smartphone } from 'lucide-react';
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
            <div className="text-center mb-12">
              <h2 className="section-heading mb-4">
                Start Your Journey with <span className="gradient-text">VLV</span> Today
              </h2>
              <p className="section-subheading mx-auto text-lg opacity-90">
                Download the VLV Scanning App and join our community of successful creators
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border border-border relative overflow-hidden">
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-vlv-purple/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-vlv-burgundy/10 rounded-full blur-3xl" />
            
            <RevealOnScroll animation="slide-up">
              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
                  Download the VLV App
                </h3>
                <p className="text-lg mb-8 max-w-2xl mx-auto text-center text-muted-foreground">
                  Create your account and start earning £50+ per sale with zero upfront costs
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
                  <a 
                    href="https://inta.io/download" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-transform hover:scale-105 duration-300"
                  >
                    <img 
                      src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" 
                      alt="Download on App Store" 
                      className="h-12"
                    />
                  </a>
                  <a 
                    href="https://inta.io/download" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-transform hover:scale-105 duration-300"
                  >
                    <img 
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                      alt="Get it on Google Play" 
                      className="h-14"
                    />
                  </a>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-card/50 p-6 rounded-xl border border-border/50 hover:border-border/80 transition-colors">
                    <PoundSterling className="h-8 w-8 text-vlv-purple mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Zero Upfront Costs</h4>
                    <p className="text-muted-foreground">Start your business with no financial risk</p>
                  </div>
                  <div className="bg-card/50 p-6 rounded-xl border border-border/50 hover:border-border/80 transition-colors">
                    <Shield className="h-8 w-8 text-vlv-purple mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Privacy Guaranteed</h4>
                    <p className="text-muted-foreground">Your data stays completely secure</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground text-center mt-8">
                  Available for iOS and Android devices. Get started in minutes.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
