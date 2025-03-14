
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import RegistrationForm from './registration/RegistrationForm';

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistrationDialog = ({ open, onOpenChange }: RegistrationDialogProps) => {
  // Function to close the dialog
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-[90vw]">
        <DialogHeader>
          <DialogTitle>
            Register Your Interest
          </DialogTitle>
          <DialogDescription>
            Be among the first to experience VLV. Join our waitlist for early information on product launch.
          </DialogDescription>
        </DialogHeader>
        
        <RegistrationForm 
          onSuccess={handleClose} 
          onClose={handleClose} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
