
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

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-vlv-purple">Vulva La Replica</span>
        </a>
        
        {isMobile ? (
          <button 
            onClick={toggleMenu}
            className="text-foreground p-2 rounded-md"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
          <nav className="flex items-center space-x-1">
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#benefits" className="nav-link">Why Choose VLV</a>
            <a href="#market" className="nav-link">Earning Opportunity</a>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="button-primary ml-4"
            >
              Register Interest
            </button>
          </nav>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-background pt-20 z-40 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col items-center space-y-6 p-6">
            <a 
              href="#how-it-works" 
              className="text-xl py-2 w-full text-center"
              onClick={toggleMenu}
            >
              How It Works
            </a>
            <a 
              href="#benefits" 
              className="text-xl py-2 w-full text-center"
              onClick={toggleMenu}
            >
              Why Choose VLV
            </a>
            <a 
              href="#market" 
              className="text-xl py-2 w-full text-center"
              onClick={toggleMenu}
            >
              Earning Opportunity
            </a>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsDialogOpen(true);
              }}
              className="button-primary w-full text-center mt-4"
            >
              Register Interest
            </button>
          </nav>
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
