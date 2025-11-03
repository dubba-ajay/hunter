import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Search, MessageSquare, Clock, MapPin, CheckCircle2, TrendingUp } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Find Products at{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nearby Stores Instantly
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed">
              Stop wasting time calling stores. Search any product, check real-time
              availability from nearby retailers, and choose in-store pickup or fast delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/search"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg inline-flex items-center justify-center gap-2 group"
              >
                <Search size={20} />
                Start Searching
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 border border-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>100+ Stores Connected</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-border"></div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <span>Instant Availability Check</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-border"></div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                <span>Local & Fast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Our simple 3-step process gets you what you need faster than ever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-6 -left-3 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="bg-card border border-border rounded-xl p-6 pt-12 hover:shadow-lg transition-shadow">
                <Search className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Search Product</h3>
                <p className="text-foreground/60">
                  Search for any product you need. We instantly find nearby stores that
                  might have it in stock.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-5 w-10 h-px bg-gradient-to-r from-primary to-transparent"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-6 -left-3 w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="bg-card border border-border rounded-xl p-6 pt-12 hover:shadow-lg transition-shadow">
                <MessageSquare className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Check Availability</h3>
                <p className="text-foreground/60">
                  We send instant messages to nearby stores. They reply instantly with
                  availability status for that product.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-5 w-10 h-px bg-gradient-to-r from-secondary to-transparent"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-6 -left-3 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="bg-card border border-border rounded-xl p-6 pt-12 hover:shadow-lg transition-shadow">
                <TrendingUp className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Choose & Order</h3>
                <p className="text-foreground/60">
                  Get results instantly. Choose store pickup or fast delivery. Complete your
                  purchase in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built for Your Shopping Convenience
              </h2>
              <p className="text-lg text-foreground/60 mb-8 leading-relaxed">
                Prount connects you with nearby retail stores instantly, eliminating
                the frustration of calling around or making wasted trips.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    icon: "🔍",
                    title: "Smart Search",
                    desc: "Find any product across multiple stores at once",
                  },
                  {
                    icon: "⚡",
                    title: "Instant Replies",
                    desc: "Get real-time availability from store staff",
                  },
                  {
                    icon: "🚚",
                    title: "Flexible Fulfillment",
                    desc: "Choose in-store pickup or fast delivery",
                  },
                  {
                    icon: "💰",
                    title: "Compare Prices",
                    desc: "See pricing and deals from different stores",
                  },
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-foreground/60">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        Nearby Stores
                      </h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">HomeStore Plus</p>
                          <p className="text-sm text-foreground/60">2.3 km away • $149.99</p>
                        </div>
                        <CheckCircle2 size={20} className="text-green-500" />
                      </div>
                      <div className="h-px bg-border"></div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">TechMart Central</p>
                          <p className="text-sm text-foreground/60">3.1 km away • $144.99</p>
                        </div>
                        <CheckCircle2 size={20} className="text-green-500" />
                      </div>
                      <div className="h-px bg-border"></div>
                      <div className="flex justify-between items-center opacity-50">
                        <div>
                          <p className="font-medium text-foreground">Mega Store North</p>
                          <p className="text-sm text-foreground/60">5.2 km away</p>
                        </div>
                        <span className="text-red-500 text-sm font-medium">Out of Stock</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Stores Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Right Visual */}
            <div className="order-2 md:order-1 relative">
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8 border border-secondary/20">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-border">
                    <h4 className="font-semibold text-foreground mb-4">Store Dashboard</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-foreground">
                          New availability request
                        </p>
                        <p className="text-xs text-foreground/60 mt-1">Rice Cooker • In stock</p>
                        <button className="mt-2 text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors">
                          Confirm Available
                        </button>
                      </div>
                      <div className="bg-white border border-border rounded-lg p-3">
                        <p className="text-sm font-medium text-foreground">
                          Previous request
                        </p>
                        <p className="text-xs text-foreground/60 mt-1">Drill Set • Out of stock</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Content */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                For Retail Stores
              </h2>
              <p className="text-lg text-foreground/60 mb-8 leading-relaxed">
                Increase foot traffic and sales with Prount. Respond to customer
                inquiries instantly without managing complex inventory systems.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "One-tap availability responses",
                  "Auto-reply for popular products",
                  "Upload catalogs easily",
                  "View customer inquiries in real-time",
                  "Analytics and sales insights",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                    <span className="text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/for-stores"
                className="inline-flex px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all hover:shadow-md"
              >
                Access Store Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Never Call Stores Again
            </h2>
            <p className="text-lg text-foreground/60 mb-12">
              Start searching for products at nearby stores in seconds. It's free, instant,
              and no sign-up required.
            </p>

            <Link
              to="/search"
              className="inline-flex px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all text-lg"
            >
              Search Now
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
