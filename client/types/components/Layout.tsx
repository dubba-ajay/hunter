import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MapPin, Store, BarChart3 } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm dark:bg-slate-950">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-105">
              📍
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline">
              Prount
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/search"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              Find Products
            </Link>
            <Link
              to="/for-stores"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors flex items-center gap-1"
            >
              <Store size={16} />
              For Stores
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors flex items-center gap-1"
            >
              <BarChart3 size={16} />
              Admin
            </Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/search"
              className="hidden sm:inline-flex px-5 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all hover:shadow-md"
            >
              Start Search
            </Link>
            <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
              <MapPin size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  📍
                </div>
                <span className="font-bold text-foreground">Prount</span>
              </div>
              <p className="text-sm text-foreground/60">
                Find products at nearby stores instantly
              </p>
            </div>

            {/* For Customers */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">For Customers</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/search"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    Search Products
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* For Stores */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">For Stores</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/for-stores"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    Seller Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-foreground/60">
              © 2024 Prount. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
