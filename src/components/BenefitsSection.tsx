
import { DollarSign, ShieldCheck, Printer, Lock } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-vlv-purple" />,
      title: "Zero Upfront Costs",
      description: "We cover all scanning and production expenses, letting you focus on your brand."
    },
    {
      icon: <Lock className="h-8 w-8 text-vlv-purple" />,
      title: "Privacy & Security",
      description: "Your scan and personal data remain completely confidential."
    },
    {
      icon: <Printer className="h-8 w-8 text-vlv-purple" />,
      title: "Personalised Precision",
      description: "Our cutting-edge process not only replicates your body but also closely matches your skin tone for a truly authentic product."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-vlv-purple" />,
      title: "Fair Partnership",
      description: "Enjoy a straightforward 50/50 revenue share. Every sale directly boosts your earnings."
    }
  ];

  return (
    <section id="benefits" className="relative py-20 bg-gradient-to-b from-background to-vlv-light/30">
      <div className="section-container">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-heading">
              Why Choose <span className="gradient-text">VLV</span>
            </h2>
            <p className="section-subheading mx-auto">
              We've designed our service to make monetisation easy, secure, and profitable for creators
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {benefits.map((benefit, index) => (
            <RevealOnScroll 
              key={index} 
              animation="slide-up" 
              delay={`delay-${(index % 2 + 1) * 100}` as any}
            >
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-vlv-light rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
