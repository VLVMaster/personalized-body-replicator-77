
import { useState } from 'react';
import { Check, PoundSterling, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RevealOnScroll from './ui/RevealOnScroll';
import RegistrationDialog from './RegistrationDialog';

const CallToAction = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you'd send this to your backend
    // For now, just show a success message
    toast({
      title: "Interest registered!",
      description: "Thank you for your interest in VLR.",
    });
    
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <section id="signup" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-vlv-light/30 to-vlv-light/10 z-0" />
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="section-heading mb-4">
                Register your interest with <span className="gradient-text">VLR</span>
              </h2>
              <p className="section-subheading mx-auto text-lg opacity-90">
                Join our community of successful creators
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
                  Register Interest
                </h3>
                <p className="text-lg mb-8 max-w-2xl mx-auto text-center text-muted-foreground">
                  Be the first to know when we launch to be invited.
                </p>
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-10">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-grow input-field focus:border-vlv-purple"
                        required
                      />
                      <button type="submit" className="button-primary whitespace-nowrap">
                        Register Interest
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-vlv-light/50 p-6 rounded-xl border border-vlv-purple/20 mb-10 max-w-md mx-auto">
                    <div className="flex items-center gap-2 text-vlv-purple font-medium">
                      <Check className="h-5 w-5" />
                      <p>Thank you for registering your interest!</p>
                    </div>
                  </div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-card/50 p-6 rounded-xl border border-border/50 hover:border-border/80 transition-colors">
                    <PoundSterling className="h-8 w-8 text-vlv-purple mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Zero Costs</h4>
                    <p className="text-muted-foreground">Start your business with no financial risk</p>
                  </div>
                  <div className="bg-card/50 p-6 rounded-xl border border-border/50 hover:border-border/80 transition-colors">
                    <Shield className="h-8 w-8 text-vlv-purple mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Privacy Guaranteed</h4>
                    <p className="text-muted-foreground">Your data stays completely secure</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
      
      <RegistrationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </section>
  );
};

export default CallToAction;
