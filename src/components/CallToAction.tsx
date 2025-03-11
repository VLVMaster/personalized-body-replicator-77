
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RevealOnScroll from './ui/RevealOnScroll';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Thank you for signing up. We'll be in touch soon.",
        duration: 5000,
      });
      setEmail('');
      setLoading(false);
    }, 1500);
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
                Ready to turn your unique body into a profitable product? Join VLV now and start earning.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-vlv-purple/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-vlv-burgundy/5 rounded-full blur-2xl" />
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative">
              <RevealOnScroll animation="slide-up">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Join Our Creator Program</h3>
                  
                  <ul className="space-y-3 mb-8">
                    {[
                      "Download the VLV app",
                      "Scan your body",
                      "Start selling and earning immediately",
                      "No upfront costs",
                      "Receive 50% of each sale"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-vlv-light rounded-full p-1 mt-0.5">
                          <Check className="h-4 w-4 text-vlv-burgundy" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-sm text-muted-foreground mb-6">
                    Because your body is your brand, and it deserves to be celebrated.
                  </p>
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll animation="slide-up" delay="delay-200">
                <div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="input-field"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="platform" className="block text-sm font-medium mb-1">
                        Platform
                      </label>
                      <select id="platform" className="input-field" required>
                        <option value="">Select your platform</option>
                        <option value="onlyfans">OnlyFans</option>
                        <option value="fansly">Fansly</option>
                        <option value="patreon">Patreon</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="pt-2">
                      <button 
                        type="submit" 
                        className="button-primary w-full flex items-center justify-center gap-2 group"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <>
                            Sign Up Now
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
