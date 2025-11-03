import Layout from "@/components/Layout";
import { BarChart3, ArrowRight } from "lucide-react";

export default function Admin() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-accent/5 via-background to-background">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <BarChart3 size={32} className="text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Admin Dashboard
              </h1>
              <p className="text-lg text-foreground/60">
                Coming soon! Manage stores, verify catalogs, and track platform analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">✓</div>
                <h3 className="font-semibold text-foreground mb-2">Verify Stores</h3>
                <p className="text-sm text-foreground/60">
                  Approve and manage retail store accounts
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-semibold text-foreground mb-2">Analytics</h3>
                <p className="text-sm text-foreground/60">
                  Monitor search trends and platform usage
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">💳</div>
                <h3 className="font-semibold text-foreground mb-2">Subscriptions</h3>
                <p className="text-sm text-foreground/60">
                  Manage store plans and billing
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Admin Capabilities:</h2>
              <ul className="text-left max-w-md mx-auto space-y-3">
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-accent flex-shrink-0" />
                  <span className="text-foreground/70">Store registration and verification</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-accent flex-shrink-0" />
                  <span className="text-foreground/70">Catalog upload and management</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-accent flex-shrink-0" />
                  <span className="text-foreground/70">Platform analytics and reporting</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-accent flex-shrink-0" />
                  <span className="text-foreground/70">
                    Subscription and payment management
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-accent flex-shrink-0" />
                  <span className="text-foreground/70">Category demand insights</span>
                </li>
              </ul>
            </div>

            <button className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all hover:shadow-lg">
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
