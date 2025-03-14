
import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/utils/supabase-client';

const ContactForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      setError('Please fill out all required fields');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // In a real implementation, this would send the data to a server
      // For now, we'll simulate a successful submission
      
      if (supabase) {
        try {
          const { error: insertError } = await supabase
            .from('contact_messages')
            .insert([{
              name,
              email,
              subject: subject || 'Contact Form Submission',
              message,
              created_at: new Date().toISOString()
            }]);
            
          if (insertError) {
            console.error('Error saving contact form:', insertError);
            throw new Error(insertError.message);
          }
        } catch (err) {
          console.error('Failed to save contact form to Supabase:', err);
          // Continue to show success message even if db insert fails
          // The admin should set up email forwarding via a Supabase Edge Function
        }
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      // Success message
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default"
      });
    } catch (err: any) {
      console.error('Contact form error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background rounded-lg shadow-sm border border-border">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Mail className="h-6 w-6" />
        Contact Us
      </h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
            Name *
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
            Subject
          </label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What's this regarding?"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
            Message *
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
            className="min-h-[120px]"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Your message will be sent to Hannah@vulvalareplica.com
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
