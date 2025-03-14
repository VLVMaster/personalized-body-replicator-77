
import { useState } from 'react';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistrationDialog = ({ open, onOpenChange }: RegistrationDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    toast({
      title: "Interest registered!",
      description: "Thank you for your interest in VLV.",
    });
    
    setIsSubmitted(true);
    setEmail('');
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset state when dialog closes
      setTimeout(() => {
        if (!open && isSubmitted) {
          setIsSubmitted(false);
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
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow input-field focus:border-vlv-purple"
                  required
                />
                <button type="submit" className="button-primary">
                  Register Interest
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-vlv-light/50 p-6 rounded-xl border border-vlv-purple/20">
              <div className="flex items-center gap-2 text-vlv-purple font-medium">
                <Check className="h-5 w-5" />
                <p>Thank you for registering your interest!</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
