
import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createClient } from '@supabase/supabase-js';
import { Textarea } from '@/components/ui/textarea';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistrationDialog = ({ open, onOpenChange }: RegistrationDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [domainPreference, setDomainPreference] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Store the email and domain preference in Supabase
      const { error: supabaseError } = await supabase
        .from('registrations')
        .insert([{ 
          email, 
          domain_preference: domainPreference,
          created_at: new Date().toISOString(),
          source: 'VLV Registration Form'
        }]);
      
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
      console.log('Registration submitted to Supabase:', { email, domainPreference });
      
      toast({
        title: "Interest registered!",
        description: "Thank you for your interest in VLV.",
      });
      
      setIsSubmitted(true);
      setEmail('');
      setDomainPreference('');
      setError(null);
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register. Please try again later.');
      toast({
        title: "Registration failed",
        description: "There was a problem registering your interest. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset state when dialog closes
      setTimeout(() => {
        if (!open && isSubmitted) {
          setIsSubmitted(false);
          setError(null);
        }
      }, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Register Your Interest</DialogTitle>
          <DialogDescription className="text-center">
            Be the first to know when we launch to be invited.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow focus:border-vlv-purple"
                  required
                  disabled={isSubmitting}
                />
                
                <div>
                  <label htmlFor="domain-preference" className="block text-sm font-medium text-muted-foreground mb-1">
                    Domain Preference (optional)
                  </label>
                  <Textarea
                    id="domain-preference"
                    value={domainPreference}
                    onChange={(e) => setDomainPreference(e.target.value)}
                    placeholder="What domain name would you like? (e.g., yourname.com)"
                    className="flex-grow focus:border-vlv-purple"
                    disabled={isSubmitting}
                    rows={2}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="button-primary relative" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">Register Interest</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    "Register Interest"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-vlv-light/50 p-6 rounded-xl border border-vlv-purple/20">
              <div className="flex items-center gap-2 text-vlv-purple font-medium">
                <Check className="h-5 w-5" />
                <p>Thank you for registering your interest!</p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                We'll reach out with more details soon.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
