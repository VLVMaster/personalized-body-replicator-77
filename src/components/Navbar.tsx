
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import RegistrationDialog from './RegistrationDialog';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing from mobile to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 relative z-50">
          <span className="text-2xl font-display font-bold text-vlv-purple">Vulva La Replica</span>
        </a>
        
        {isMobile ? (
          <button 
            onClick={toggleMenu}
            className="text-foreground p-2 rounded-md relative z-50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
          <nav className="flex items-center space-x-1">
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#benefits" className="nav-link">Why Choose VLV</a>
            <a href="#market" className="nav-link">Earning Opportunity</a>
            <a href="/contact" className="nav-link">Contact Us</a>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="button-primary ml-4"
            >
              Register Interest
            </button>
          </nav>
        )}
      </div>

      {/* Mobile menu overlay */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div 
            className={`flex flex-col items-center justify-center h-full w-full transition-transform duration-300 px-6 ${
              isMenuOpen ? 'translate-y-0' : 'translate-y-10'
            }`}
          >
            <nav className="flex flex-col items-center space-y-8 w-full">
              <a 
                href="#how-it-works" 
                className="text-xl font-medium py-2 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#benefits" 
                className="text-xl font-medium py-2 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Choose VLV
              </a>
              <a 
                href="#market" 
                className="text-xl font-medium py-2 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Earning Opportunity
              </a>
              <a 
                href="/contact" 
                className="text-xl font-medium py-2 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDialogOpen(true);
                }}
                className="button-primary w-full text-center mt-4 py-4"
              >
                Register Interest
              </button>
            </nav>
          </div>
        </div>
      )}

      <RegistrationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </header>
  );
};

export default Navbar;
