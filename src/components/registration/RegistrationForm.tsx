
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase, supabaseError, errorMessage } from '@/utils/supabase-client';

interface RegistrationFormProps {
  onSuccess: () => void;
}

const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
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
          
          const { error: insertError } = await supabase
            .from('registrations')
            .insert([{ 
              email,
              created_at: new Date().toISOString()
            }]);
            
          if (insertError) {
            console.error('Supabase insert error:', insertError);
            
            // Check for RLS policy error specifically
            if (insertError.message.includes('row-level security') || insertError.code === 'PGRST301') {
              toast({
                title: "Database permission error",
                description: "You need to update your Supabase RLS policies to allow insertions to the 'registrations' table",
                variant: "destructive"
              });
              setError("Row-level security is blocking your registration. Please update your Supabase RLS policies for the 'registrations' table to allow insertions from anonymous users.");
            } else {
              toast({
                title: "Registration error",
                description: insertError.message || "Failed to save your information",
                variant: "destructive"
              });
              setError(insertError.message || 'Failed to register. Please try again.');
            }
            
            setIsSubmitting(false);
            return;
          } else {
            console.log('Registration submitted to Supabase:', { email });
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
        console.log('Demo mode: Would have submitted:', { email });
      }
      
      toast({
        title: "Interest registered!",
        description: "We'll be in touch soon."
      });
      
      onSuccess();
      setEmail('');
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
