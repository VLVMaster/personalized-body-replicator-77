
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
    localStorage.setItem('cookie-consent-timestamp', new Date().toISOString());
    setShowConsent(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    localStorage.setItem('cookie-consent-timestamp', new Date().toISOString());
    setShowConsent(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-timestamp', new Date().toISOString());
    setShowConsent(false);
  };

  // Function to manage consent choices
  const handleConsentChange = (category: string, isChecked: boolean) => {
    const currentConsent = localStorage.getItem('cookie-consent-details') || '{}';
    const consentObj = JSON.parse(currentConsent);
    consentObj[category] = isChecked;
    localStorage.setItem('cookie-consent-details', JSON.stringify(consentObj));
  };

  if (!showConsent) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50 p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm md:text-base">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. 
              You can see our <Link to="/privacy-policy" className="text-primary underline">Privacy Policy</Link> for details on how we use your data.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={rejectAll}
            >
              Reject All
            </Button>
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
              Customize your cookie preferences. Under GDPR and ePrivacy regulations, you have the right to choose which cookies you accept.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="space-y-2 flex items-start justify-between">
              <div>
                <h3 className="font-medium">Necessary Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  These cookies are required for the website to function and cannot be disabled.
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <div className="h-4 w-8 rounded-full bg-primary opacity-50"></div>
              </div>
            </div>
            
            <div className="space-y-2 flex items-start justify-between">
              <div>
                <h3 className="font-medium">Performance & Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <input 
                  type="checkbox" 
                  id="analytics" 
                  className="h-4 w-8 rounded-full"
                  onChange={(e) => handleConsentChange('analytics', e.target.checked)}
                />
              </div>
            </div>
            
            <div className="space-y-2 flex items-start justify-between">
              <div>
                <h3 className="font-medium">Marketing Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  These cookies may be set through our site by our advertising partners to build a profile of your interests.
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <input 
                  type="checkbox" 
                  id="marketing" 
                  className="h-4 w-8 rounded-full"
                  onChange={(e) => handleConsentChange('marketing', e.target.checked)}
                />
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium mb-2">Data Controller Information</h3>
              <p className="text-sm text-muted-foreground">
                Vulva La Replica is the data controller for the personal data collected through this website.
                For details about how we process your data, your rights as a data subject, and how to contact
                our Data Protection Officer, please see our <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
              </p>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              <p>
                Under GDPR (General Data Protection Regulation) and ePrivacy regulations, you have the right to withdraw 
                your consent at any time. You can do this by clearing your browser cookies or by contacting us.
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={rejectAll}>
              Reject All
            </Button>
            <Button variant="outline" onClick={acceptNecessary}>
              Accept Necessary Only
            </Button>
            <Button 
              onClick={() => {
                // First save detailed choices
                const analytics = document.getElementById('analytics') as HTMLInputElement;
                const marketing = document.getElementById('marketing') as HTMLInputElement;
                const detailedConsent = {
                  necessary: true,
                  analytics: analytics?.checked || false,
                  marketing: marketing?.checked || false
                };
                localStorage.setItem('cookie-consent-details', JSON.stringify(detailedConsent));
                localStorage.setItem('cookie-consent', 'custom');
                localStorage.setItem('cookie-consent-timestamp', new Date().toISOString());
                setShowConsent(false);
              }}
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
