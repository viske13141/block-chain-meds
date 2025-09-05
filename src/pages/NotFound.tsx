import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! The page you're looking for doesn't exist.</p>
        <a href="/dashboard" className="text-accent hover:text-accent-glow underline">
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
