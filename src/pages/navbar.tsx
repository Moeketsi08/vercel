import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-xl font-bold text-primary">
            ConsignConnect
          </Link>
          <nav className="hidden items-center space-x-6 md:flex">
            <Link to="/features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link to="/integrations" className="text-sm font-medium transition-colors hover:text-primary">
              Integrations
            </Link>
            <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link to="/blog" className="text-sm font-medium transition-colors hover:text-primary">
              Blog
            </Link>
            <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>

        {isAuthenticated ? (
          <Link to={user?.role === 'consignee' ? '/consignee/dashboard' : '/consignor/dashboard'}>
            <Button>
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};