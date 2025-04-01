
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

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
  const [selectedInterest, setSelectedInterest] = useState<string>('');
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
      
      // Create a GitHub issue via a GitHub API proxy service
      const response = await fetch('https://formsubmit.co/hannah@vulvalareplica.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          interests: selectedInterest,
          message: message || null,
          created_at: new Date().toISOString(),
          subject: 'New Detailed Registration from VLR Website'
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit registration form');
      }
      
      // Close the dialog first
      onClose();
      
      // Show success toast after dialog closes
      toast({
        title: "Thank you!",
        description: "Your interest has been registered. We'll be in touch soon.",
        variant: "default"
      });
      
      // Reset form state
      setEmail('');
      setMessage('');
      setSelectedInterest('');
      setError(null);
      
      // Call the success callback
      onSuccess();
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
          <RadioGroup value={selectedInterest} onValueChange={setSelectedInterest} className="space-y-2">
            {interestTypes.map((interest) => (
              <div key={interest.id} className="flex items-center space-x-2">
                <RadioGroupItem value={interest.id} id={interest.id} disabled={isSubmitting} />
                <label
                  htmlFor={interest.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {interest.label}
                </label>
              </div>
            ))}
          </RadioGroup>
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
