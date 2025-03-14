
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const RegistrationSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="rounded-full bg-green-100 p-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-center text-foreground mb-4">
        Thanks for joining our waitlist!
      </p>
      <DialogClose asChild>
        <Button variant="outline">
          Close
        </Button>
      </DialogClose>
    </div>
  );
};

export default RegistrationSuccess;
