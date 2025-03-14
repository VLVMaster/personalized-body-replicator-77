
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a safer client initialization
let supabase: any = null;
try {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error);
}

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
  const [supabaseError, setSupabaseError] = useState<boolean>(false);

  // Check if Supabase is properly configured
  useEffect(() => {
    if (!supabaseUrl || !supabaseKey || !supabase) {
      setSupabaseError(true);
      console.warn('Supabase URL or Anon Key is missing - running in demo mode');
    }
  }, []);

  // Reset state when dialog is opened
  useEffect(() => {
    if (open) {
      setIsSubmitted(false);
      setError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // If Supabase is initialized, store data
      if (supabase) {
        try {
          const { error: supabaseError } = await supabase
            .from('registrations')
            .insert([{ 
              email, 
              domain_preference: domainPreference,
              created_at: new Date().toISOString(),
              source: 'VLV Registration Form'
            }]);
            
          if (supabaseError) {
            console.error('Supabase error:', supabaseError);
            // Don't throw here, just log and continue to show success
          } else {
            console.log('Registration submitted to Supabase:', { email, domainPreference });
          }
        } catch (supabaseErr) {
          console.error('Failed to connect to Supabase:', supabaseErr);
          // Don't throw, continue to show success
        }
      } else {
        console.log('Demo mode: Would have submitted:', { email, domainPreference });
      }
      
      toast({
        title: "Interest registered!",
        description: "We'll be in touch soon."
      });
      
      setIsSubmitted(true);
      setEmail('');
      setDomainPreference('');
      setError(null);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSubmitted ? 'Thank You!' : 'Register Your Interest'}
          </DialogTitle>
          <DialogDescription>
            {isSubmitted 
              ? 'We appreciate your interest. We\'ll be in touch soon with more details.'
              : 'Be among the first to experience VLV. Join our waitlist for early access and exclusive updates.'}
          </DialogDescription>
        </DialogHeader>
        
        {!isSubmitted ? (
          <>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            {supabaseError && (
              <Alert>
                <AlertDescription>
                  Note: Demo mode active. Your details won't be stored, but the form will still work.
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail@example.com"
                  className="flex-grow focus:border-vlv-purple"
                  required
                  disabled={isSubmitting}
                />
                
                <div className="mt-4">
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
                
                <Button 
                  type="submit" 
                  className="mt-4 w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-center text-foreground mb-4">
              Thanks for joining our waitlist! We're excited to have you on board.
            </p>
            <DialogClose asChild>
              <Button variant="outline">
                Close
              </Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
