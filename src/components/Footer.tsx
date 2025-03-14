
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-vlv-dark text-white py-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex space-x-4 mb-4">
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact Us
            </Link>
            <span className="text-gray-500">|</span>
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-500">|</span>
            <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          
          <div className="text-center text-gray-400 text-sm">
            <p>© {currentYear} Vulva La Replica. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
