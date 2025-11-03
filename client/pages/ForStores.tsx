import Layout from "@/components/Layout";
import { Store, ArrowRight } from "lucide-react";

export default function ForStores() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-secondary/5 via-background to-background">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <Store size={32} className="text-secondary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Store Dashboard
              </h1>
              <p className="text-lg text-foreground/60">
                Coming soon! Manage your store, respond to customer inquiries, and track
                your sales with our powerful dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold text-foreground mb-2">Manage Products</h3>
                <p className="text-sm text-foreground/60">
                  Upload catalogs and edit product information
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold text-foreground mb-2">Handle Requests</h3>
                <p className="text-sm text-foreground/60">
                  Respond to customer availability inquiries instantly
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold text-foreground mb-2">View Analytics</h3>
                <p className="text-sm text-foreground/60">
                  Track inquiries and sales performance
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Features Include:</h2>
              <ul className="text-left max-w-md mx-auto space-y-3">
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-secondary flex-shrink-0" />
                  <span className="text-foreground/70">One-tap availability responses</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-secondary flex-shrink-0" />
                  <span className="text-foreground/70">
                    Easy CSV upload for bulk catalog management
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-secondary flex-shrink-0" />
                  <span className="text-foreground/70">
                    Auto-reply templates for common products
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-secondary flex-shrink-0" />
                  <span className="text-foreground/70">Real-time customer inquiries</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-secondary flex-shrink-0" />
                  <span className="text-foreground/70">
                    Sales analytics and insights dashboard
                  </span>
                </li>
              </ul>
            </div>

            <button className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all hover:shadow-lg">
              Register Your Store
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
