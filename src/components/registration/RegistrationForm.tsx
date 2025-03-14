
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase, supabaseError, errorMessage } from '@/utils/supabase-client';

interface RegistrationFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

interface InterestType {
  id: string;
  label: string;
}

const interestTypes: InterestType[] = [
  { id: 'model', label: 'Model' },
  { id: 'agency', label: 'Agency' },
  { id: 'product_partner', label: 'Product Partner' },
  { id: 'other', label: 'Other' }
];

const RegistrationForm = ({ onSuccess, onClose }: RegistrationFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInterestChange = (interestId: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(id => id !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };

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
              interests: selectedInterests,
              message: message || null,
              created_at: new Date().toISOString()
            }]);
            
          if (insertError) {
            console.error('Supabase insert error:', insertError);
            
            // Check for duplicate key error
            if (insertError.code === '23505') {
              // Close the dialog first
              onClose();
              
              // Then show the toast after dialog is closed
              toast({
                title: "Thank you!",
                description: "You have already registered, we will be in touch.",
                variant: "default"
              });
              
              setEmail('');
              setMessage('');
              setSelectedInterests([]);
              setError(null);
              setIsSubmitting(false);
              return;
            }
            
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
            console.log('Registration submitted to Supabase:', { email, interests: selectedInterests, message });
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
        console.log('Demo mode: Would have submitted:', { email, interests: selectedInterests, message });
      }
      
      // Close the dialog first
      onClose();
      
      // Then show the success toast after dialog is closed
      toast({
        title: "Thank you!",
        description: "Your interest has been registered. We'll be in touch soon.",
        variant: "default"
      });
      
      setEmail('');
      setMessage('');
      setSelectedInterests([]);
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
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Role: (optional)
          </label>
          <div className="space-y-2">
            {interestTypes.map((interest) => (
              <div key={interest.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={interest.id} 
                  checked={selectedInterests.includes(interest.id)}
                  onCheckedChange={() => handleInterestChange(interest.id)}
                  disabled={isSubmitting}
                />
                <label
                  htmlFor={interest.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {interest.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
            Message (optional)
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us more..."
            className="flex-grow focus:border-vlv-purple"
            disabled={isSubmitting}
          />
        </div>
          
        <Button 
          type="submit" 
          className="mt-4 w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </>
  );
};

export default RegistrationForm;
