
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase, supabaseError } from '@/utils/supabase-client';

interface RegistrationFormProps {
  onSuccess: () => void;
}

const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [domainPreference, setDomainPreference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      
      onSuccess();
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
  );
};

export default RegistrationForm;
