
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase, supabaseError, errorMessage } from '@/utils/supabase-client';

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
          console.log('Attempting to insert into Supabase...');
          
          // Check if table exists
          const { data: tableCheck, error: tableError } = await supabase
            .from('registrations')
            .select('*')
            .limit(1);
          
          if (tableError) {
            console.error('Table check error:', tableError);
            // If table doesn't exist, show a more helpful error
            if (tableError.message.includes('does not exist')) {
              toast({
                title: "Database table missing",
                description: "The 'registrations' table doesn't exist in your Supabase project. Please create it first.",
                variant: "destructive"
              });
              setError("The 'registrations' table doesn't exist in your Supabase project. Please create it first with columns: email, domain_preference, created_at, and source.");
              setIsSubmitting(false);
              return;
            }
          }
          
          const { error: insertError } = await supabase
            .from('registrations')
            .insert([{ 
              email, 
              domain_preference: domainPreference,
              created_at: new Date().toISOString(),
              source: 'VLV Registration Form'
            }]);
            
          if (insertError) {
            console.error('Supabase insert error:', insertError);
            toast({
              title: "Registration error",
              description: insertError.message || "Failed to save your information",
              variant: "destructive"
            });
            setError(insertError.message || 'Failed to register. Please try again.');
            setIsSubmitting(false);
            return;
          } else {
            console.log('Registration submitted to Supabase:', { email, domainPreference });
          }
        } catch (supabaseErr: any) {
          console.error('Failed to connect to Supabase:', supabaseErr);
          toast({
            title: "Connection error",
            description: "Couldn't connect to the database",
            variant: "destructive"
          });
          setError(supabaseErr.message || 'Connection error. Please try again later.');
          setIsSubmitting(false);
          return;
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
            Note: {errorMessage || 'Demo mode active. Your details won\'t be stored, but the form will still work.'}
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
