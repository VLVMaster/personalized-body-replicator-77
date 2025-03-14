
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import RegistrationForm from './registration/RegistrationForm';
import RegistrationSuccess from './registration/RegistrationSuccess';

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistrationDialog = ({ open, onOpenChange }: RegistrationDialogProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Reset state when dialog is opened
  useEffect(() => {
    if (open) {
      setIsSubmitted(false);
    }
  }, [open]);

  const handleSuccess = () => {
    setIsSubmitted(true);
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
          <RegistrationForm onSuccess={handleSuccess} />
        ) : (
          <RegistrationSuccess />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
