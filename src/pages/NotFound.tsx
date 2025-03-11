
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-vlv-light/30 to-background p-8">
      <div className="glass-panel p-10 text-center max-w-md">
        <h1 className="text-5xl font-bold gradient-text mb-6">404</h1>
        <p className="text-xl text-vlv-dark mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <a 
          href="/" 
          className="button-primary inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
