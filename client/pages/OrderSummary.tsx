import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { getProductById, getStoreById } from "@/data/mockData";
import { Home, MapPin, Truck, CheckCircle2, ArrowRight } from "lucide-react";

export default function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as {
    productId: string;
    colorId: string;
    fulfillmentType: "delivery" | "pickup";
    address?: string;
    city?: string;
    postalCode?: string;
    selectedStoreForPickup?: string;
  };

  if (!state?.productId) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Invalid order
            </h1>
            <button
              onClick={() => navigate("/search")}
              className="text-primary hover:underline"
            >
              Back to search
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const product = getProductById(state.productId);
  const selectedColor = product?.colors.find((c) => c.id === state.colorId);
  const pickupStore =
    state.selectedStoreForPickup &&
    getStoreById(state.selectedStoreForPickup);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-green-50 via-background to-background min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-4 py-16">
          {/* Success Message */}
          <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="relative w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 size={64} className="text-green-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-xl text-foreground/70 mb-8">
              We've sent your availability request to the store. You'll receive
              a confirmation message shortly.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-blue-700 text-sm">
                📍 Your location has been securely shared with the store for{" "}
                {state.fulfillmentType === "delivery"
                  ? "fast delivery"
                  : "convenient pickup"}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Product Details */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Product Details
              </h2>

              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-foreground/60 mb-2">Product Name</p>
                  <p className="text-lg font-bold text-foreground">
                    {product?.name}
                  </p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-foreground/60 mb-2">Brand</p>
                  <p className="text-lg font-semibold text-foreground">
                    {product?.brand}
                  </p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-foreground/60 mb-2">Color</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: selectedColor?.hex }}
                    />
                    <span className="font-semibold text-foreground">
                      {selectedColor?.name}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-foreground/60 mb-2">
                    Price Range
                  </p>
                  <p className="text-xl font-bold text-primary">
                    ${product?.priceRange.min.toFixed(2)} - $
                    {product?.priceRange.max.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {state.fulfillmentType === "delivery"
                  ? "Delivery Details"
                  : "Pickup Details"}
              </h2>

              <div className="space-y-4">
                {state.fulfillmentType === "delivery" ? (
                  <>
                    <div className="pb-4 border-b border-border">
                      <p className="text-sm text-foreground/60 mb-2 flex items-center gap-2">
                        <Truck size={16} className="text-secondary" />
                        Fulfillment Type
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        Home Delivery
                      </p>
                    </div>

                    <div className="pb-4 border-b border-border">
                      <p className="text-sm text-foreground/60 mb-2">
                        Delivery Address
                      </p>
                      <div className="space-y-2">
                        <p className="font-semibold text-foreground">
                          {state.address}
                        </p>
                        <p className="text-foreground/70">
                          {state.city}, {state.postalCode}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-foreground/60 mb-2">
                        Estimated Delivery
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        2-3 hours
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="pb-4 border-b border-border">
                      <p className="text-sm text-foreground/60 mb-2 flex items-center gap-2">
                        <Home size={16} className="text-primary" />
                        Fulfillment Type
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        In-Store Pickup
                      </p>
                    </div>

                    <div className="pb-4 border-b border-border">
                      <p className="text-sm text-foreground/60 mb-2">
                        Store Location
                      </p>
                      <p className="font-bold text-foreground mb-1">
                        {pickupStore?.name}
                      </p>
                      <p className="text-sm text-foreground/70">
                        {pickupStore?.address}
                      </p>
                      <p className="text-sm text-foreground/70">
                        {pickupStore?.city}
                      </p>
                    </div>

                    <div className="pb-4 border-b border-border">
                      <p className="text-sm text-foreground/60 mb-2 flex items-center gap-2">
                        <MapPin size={16} className="text-accent" />
                        Distance
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {pickupStore?.distance} km away
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-foreground/60 mb-2">
                        Ready for Pickup
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        ~1 hour
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              What Happens Next
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    Store Confirmation
                  </h3>
                  <p className="text-foreground/70">
                    The store will verify that the product is in stock in your
                    selected color and confirm availability
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    You'll Receive a Message
                  </h3>
                  <p className="text-foreground/70">
                    Get notified immediately when the store replies with
                    availability and pricing confirmation
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    Complete Your Purchase
                  </h3>
                  <p className="text-foreground/70">
                    {state.fulfillmentType === "delivery"
                      ? "Your order will be delivered to your address with tracking updates"
                      : "Pick up your order at the store with your confirmation"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/search")}
              className="flex-1 px-6 py-4 bg-card border border-border text-foreground font-bold rounded-lg hover:bg-muted transition-all"
            >
              Search for Another Product
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Back to Home
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
