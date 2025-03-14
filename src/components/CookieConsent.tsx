
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      // Show the consent banner if no consent has been given
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setShowConsent(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50 p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm md:text-base">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDetails(true)}
            >
              Cookie Settings
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={acceptNecessary}
            >
              Accept Necessary
            </Button>
            <Button 
              size="sm" 
              onClick={acceptAll}
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Cookie Settings</DialogTitle>
            <DialogDescription>
              Customize your cookie preferences
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="space-y-2">
              <h3 className="font-medium">Necessary Cookies</h3>
              <p className="text-sm text-muted-foreground">
                These cookies are required for the website to function and cannot be disabled.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Performance & Analytics</h3>
              <p className="text-sm text-muted-foreground">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Marketing Cookies</h3>
              <p className="text-sm text-muted-foreground">
                These cookies may be set through our site by our advertising partners to build a profile of your interests.
              </p>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              For more information, please visit our <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={acceptNecessary}>
              Accept Necessary Only
            </Button>
            <Button onClick={acceptAll}>
              Accept All Cookies
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
