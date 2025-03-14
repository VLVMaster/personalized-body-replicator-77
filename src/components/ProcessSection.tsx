
import { useState } from 'react';
import { Scan, Printer, PoundSterling } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';
import RegistrationDialog from './RegistrationDialog';

const ProcessSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const steps = [
    {
      icon: <Scan className="h-12 w-12 text-vlv-purple" />,
      title: "Scan Your Body",
      description: "Download the VLV app and perform a quick, precise scan to generate a digital 3D mould of your intimate features."
    },
    {
      icon: <Printer className="h-12 w-12 text-vlv-purple" />,
      title: "Create Your Replica",
      description: "Our advanced technology turns your scan into a high-quality silicone replica that perfectly mirrors your skin tone."
    },
    {
      icon: <PoundSterling className="h-12 w-12 text-vlv-purple" />,
      title: "Sell Directly to Fans",
      description: "Enjoy a simple 50/50 revenue share—while we handle print-on-demand production and shipping."
    }
  ];

  return (
    <section id="how-it-works" className="relative py-20">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-vlv-purple/5 rounded-r-full blur-3xl z-0" />
      
      <div className="section-container">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-heading">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="section-subheading mx-auto">
              Our streamlined process makes it easy to turn your unique body into a profitable product
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {steps.map((step, index) => (
            <RevealOnScroll 
              key={index} 
              animation="slide-up" 
              delay={`delay-${(index + 1) * 100}` as any}
            >
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-vlv-purple/10 to-vlv-burgundy/5 rounded-xl transform rotate-1 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="relative bg-card rounded-xl p-8 shadow-md border border-border transition-all duration-300 group-hover:translate-y-[-5px] h-full flex flex-col">
                  <div className="mb-6 inline-flex items-center justify-center p-2 rounded-lg" style={{ backgroundColor: "#FFDEE2", width: "48px", height: "48px" }}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground flex-grow">{step.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        
        <RevealOnScroll delay="delay-400">
          <div className="mt-16 text-center">
            <button 
              onClick={() => setIsDialogOpen(true)} 
              className="button-primary"
            >
              Register Your Interest
            </button>
          </div>
        </RevealOnScroll>
      </div>

      <RegistrationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </section>
  );
};

export default ProcessSection;
