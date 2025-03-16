
import { PoundSterling, Lock, Users, ShieldCheck } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <PoundSterling className="h-8 w-8 text-vlv-purple" />,
      title: "Zero Costs",
      description: "We only print on demand so you never pay a penny. When your fans pay, you profit."
    },
    {
      icon: <Lock className="h-8 w-8 text-vlv-purple" />,
      title: "Privacy & Security",
      description: "Your scan and personal data remain completely secure. Your body, your control, always."
    },
    {
      icon: <Users className="h-8 w-8 text-vlv-purple" />,
      title: "100% Female Owned",
      description: "Built by women, for creators. VLR empowers you to expand your brand, your way."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-vlv-purple" />,
      title: "Fair Partnership",
      description: "After production costs, profit is 50% to you, 50% to us. No hidden fees, just shared success."
    }
  ];

  return (
    <section id="benefits" className="relative py-20 bg-gradient-to-b from-background to-vlv-light/30">
      <div className="section-container">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-heading">
              Why Choose <span className="gradient-text">VLR</span>
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
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 h-full flex">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-vlv-light rounded-lg shrink-0">
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
