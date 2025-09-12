import { Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = { pathname: window.location.pathname };

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-sky">
      <div className="text-center glass rounded-3xl p-12 max-w-md mx-4">
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-foreground/70">Oops! Page not found</p>
        <p className="mb-8 text-foreground/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-gradient-mountain text-white rounded-full font-semibold hover:shadow-large hover:scale-105 transition-all duration-300 inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
