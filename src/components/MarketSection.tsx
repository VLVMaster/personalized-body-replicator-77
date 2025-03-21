import { BarChart3, TrendingUp, Users } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';

const MarketSection = () => {
  return (
    <section id="market" className="relative py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-vlv-light/10 z-0" />
      
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <div>
              <h2 className="section-heading">
                Earning <span className="gradient-text">Opportunity</span>
              </h2>
              <p className="section-subheading">
              With millions of creators and highly engaged audiences, the demand for personalised products has never been greater.
              </p>
              
              <div className="mt-8 space-y-6">
                <RevealOnScroll animation="slide-right" delay="delay-200">
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-vlv-light rounded-lg">
                      <TrendingUp className="h-6 w-6 text-vlv-burgundy" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Monetise Your Audience</h3>
                      <p className="text-muted-foreground">
                      VLR lets you offer your fans something truly personal and exclusive—transforming loyal followers into higher paying customers with a product that strengthens their connection to you.
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
                
                <RevealOnScroll animation="slide-right" delay="delay-300">
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-vlv-light rounded-lg">
                      <Users className="h-6 w-6 text-vlv-burgundy" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Loyal Fan Base</h3>
                      <p className="text-muted-foreground">
                      Your audience is already invested in you—now you can give them the ultimate way to show their support with a unique, personalised product made just for them.
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll animation="zoom-in" delay="delay-200">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-vlv-purple/20 to-vlv-burgundy/20 rounded-3xl transform rotate-1 blur-sm" />
              <div className="relative glass-panel p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-vlv-burgundy/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-vlv-purple/10 rounded-full blur-2xl" />
                
                <h3 className="text-2xl font-semibold mb-6">Potential Monthly Revenue</h3>
                
                <div className="space-y-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">100 Sales</span>
                      <span className="text-lg font-bold">£10,000</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-vlv-burgundy h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">500 Sales</span>
                      <span className="text-lg font-bold">£50,000</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-vlv-burgundy h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">1,000 Sales</span>
                      <span className="text-lg font-bold">£100,000</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-vlv-burgundy h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <p className="text-center text-sm mt-4 opacity-70">
                    Example based on £100 profit per sale for creators. 
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
