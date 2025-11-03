import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
        <div className="text-center px-4">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">404</h1>
          <p className="text-xl text-foreground/60 mb-3">Page not found</p>
          <p className="text-foreground/50 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-md"
          >
            <Home size={18} />
            Return Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
