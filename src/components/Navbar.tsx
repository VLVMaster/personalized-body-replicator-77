
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import RegistrationDialog from './RegistrationDialog';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Check if we're on the Contact page
  const isContactPage = location.pathname === '/contact';

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (isContactPage) {
      // Navigate to home page first, then to the section
      navigate('/');
      // Add a small delay to ensure the home page has loaded
      setTimeout(() => {
        const element = document.querySelector(target);
        if (element) {
          const navbarHeight = document.querySelector('header')?.getBoundingClientRect().height || 80;
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - navbarHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Direct navigation on home page
      const element = document.querySelector(target);
      if (element) {
        const navbarHeight = document.querySelector('header')?.getBoundingClientRect().height || 80;
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - navbarHeight,
          behavior: 'smooth'
        });
      }
    }

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

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
        isScrolled ? 'py-4 bg-background/80 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 relative z-50">
          <span className="text-2xl font-display font-bold text-vlv-purple">Vulva La Replica</span>
        </Link>
        
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
            <a 
              href="#how-it-works" 
              className="nav-link text-sm"
              onClick={(e) => handleNavigation(e, '#how-it-works')}
            >
              How It Works
            </a>
            <a 
              href="#benefits" 
              className="nav-link text-sm"
              onClick={(e) => handleNavigation(e, '#benefits')}
            >
              Why Choose VLR
            </a>
            <a 
              href="#market" 
              className="nav-link text-sm"
              onClick={(e) => handleNavigation(e, '#market')}
            >
              Earning Opportunity
            </a>
            <Link to="/contact" className="nav-link text-sm">Contact Us</Link>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="button-primary ml-4"
            >
              Register Interest
            </button>
          </nav>
        )}
      </div>

      {/* Mobile menu overlay - Updated to have solid background */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-background backdrop-blur-none z-40 transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div 
            className={`flex flex-col items-center justify-start h-full w-full transition-transform duration-300 px-6 pt-20 ${
              isMenuOpen ? 'translate-y-0' : 'translate-y-10'
            }`}
          >
            <nav className="flex flex-col items-center space-y-4 w-full">
              <a 
                href="#how-it-works" 
                className="text-lg font-medium py-1.5 w-full text-center"
                onClick={(e) => handleNavigation(e, '#how-it-works')}
              >
                How It Works
              </a>
              <a 
                href="#benefits" 
                className="text-lg font-medium py-1.5 w-full text-center"
                onClick={(e) => handleNavigation(e, '#benefits')}
              >
                Why Choose VLR
              </a>
              <a 
                href="#market" 
                className="text-lg font-medium py-1.5 w-full text-center"
                onClick={(e) => handleNavigation(e, '#market')}
              >
                Earning Opportunity
              </a>
              <Link 
                to="/contact" 
                className="text-lg font-medium py-1.5 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
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
