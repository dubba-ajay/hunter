import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  getProductById,
  getStoreById,
  findNearbyStores,
} from "@/data/mockData";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Truck,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function SelectStores() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as {
    productId: string;
    colorId: string;
  };

  if (!state?.productId || !state?.colorId) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Invalid selection
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
  const nearbyStores = product ? findNearbyStores(product.category) : [];
  const selectedColor = product?.colors.find((c) => c.id === state.colorId);

  const [selectedStoreIds, setSelectedStoreIds] = useState<string[]>([]);
  const [messageSent, setMessageSent] = useState(false);
  const [waitingForReplies, setWaitingForReplies] = useState(false);
  const [storeReplies, setStoreReplies] = useState<
    Record<string, { available: boolean; price?: number; eta?: string }>
  >({});

  const toggleStoreSelection = (storeId: string) => {
    setSelectedStoreIds((prev) => {
      if (prev.includes(storeId)) {
        return prev.filter((id) => id !== storeId);
      }
      // Max 2 stores
      if (prev.length >= 2) {
        return [prev[1], storeId];
      }
      return [...prev, storeId];
    });
  };

  const handleSendMessage = () => {
    if (selectedStoreIds.length === 0) return;

    setMessageSent(true);
    setWaitingForReplies(true);

    // Simulate store replies coming in
    setTimeout(() => {
      const replies: Record<
        string,
        { available: boolean; price?: number; eta?: string }
      > = {};
      selectedStoreIds.forEach((storeId) => {
        replies[storeId] = {
          available: Math.random() > 0.3,
          price:
            product!.priceRange.min +
            Math.random() *
              (product!.priceRange.max - product!.priceRange.min),
          eta: Math.random() > 0.5 ? "2-3 hours" : "1-2 hours",
        };
      });
      setStoreReplies(replies);
      setWaitingForReplies(false);
    }, 2500);
  };

  const handleProceedToDelivery = () => {
    const availableStores = Object.entries(storeReplies)
      .filter(([, reply]) => reply.available)
      .map(([storeId]) => storeId);

    if (availableStores.length === 0) {
      alert("No stores have this product available. Please try again.");
      return;
    }

    navigate("/delivery-options", {
      state: {
        productId: state.productId,
        colorId: state.colorId,
        selectedStores: availableStores,
        storeReplies,
      },
    });
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-primary/5 via-background to-background min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
          >
            <ChevronLeft size={20} />
            Back
          </button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Select Stores to Message
            </h1>
            <p className="text-lg text-foreground/60">
              Choose 1-2 nearby stores to check availability for{" "}
              <span className="font-semibold text-foreground">
                {product?.name}
              </span>{" "}
              in{" "}
              <span
                className="font-semibold"
                style={{ color: selectedColor?.hex }}
              >
                {selectedColor?.name}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Store List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {nearbyStores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => toggleStoreSelection(store.id)}
                    disabled={messageSent}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                      selectedStoreIds.includes(store.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    } ${messageSent ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {store.name}
                          </h3>
                          {selectedStoreIds.includes(store.id) && (
                            <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-foreground/60 mb-3">
                          {store.address} • {store.city}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <MapPin size={16} className="text-primary flex-shrink-0" />
                        <span>{store.distance} km away</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Clock size={16} className="text-secondary flex-shrink-0" />
                        <span>
                          {store.hours.open} - {store.hours.close}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Truck size={16} className="text-accent flex-shrink-0" />
                        <span>
                          {store.deliveryAvailable
                            ? "Delivery Available"
                            : "Pickup Only"}
                        </span>
                      </div>
                      <div className="text-sm text-foreground/70">
                        📞 {store.phone}
                      </div>
                    </div>

                    {/* Store Reply */}
                    {storeReplies[store.id] && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div
                          className={`flex items-center gap-2 font-semibold ${
                            storeReplies[store.id].available
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <CheckCircle2 size={18} />
                          {storeReplies[store.id].available
                            ? "✓ In Stock"
                            : "✗ Out of Stock"}
                        </div>
                        {storeReplies[store.id].available && (
                          <div className="mt-2 space-y-1 text-sm">
                            <p>
                              Price: ${storeReplies[store.id].price?.toFixed(2)}
                            </p>
                            <p>
                              Est. Delivery:{" "}
                              {storeReplies[store.id].eta || "2-3 hours"}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h2 className="font-bold text-lg text-foreground mb-6">
                  Summary
                </h2>

                {/* Selected Stores */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-sm font-semibold text-foreground/60 mb-3">
                    Selected Stores
                  </p>
                  {selectedStoreIds.length === 0 ? (
                    <p className="text-sm text-foreground/50">
                      No stores selected. Choose 1-2 stores to continue.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {selectedStoreIds.map((storeId) => {
                        const store = getStoreById(storeId);
                        return (
                          <div
                            key={storeId}
                            className="text-sm font-medium text-foreground flex items-center gap-2"
                          >
                            <CheckCircle2 size={16} className="text-primary" />
                            {store?.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-sm font-semibold text-foreground/60 mb-3">
                    Looking for
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {product?.name}
                    </p>
                    <p className="text-sm text-foreground/70">
                      Color: <span style={{ color: selectedColor?.hex }}>●</span>{" "}
                      {selectedColor?.name}
                    </p>
                    <p className="text-sm text-foreground/70">
                      Brand: {product?.brand}
                    </p>
                  </div>
                </div>

                {/* Status */}
                {!messageSent && (
                  <p className="text-xs text-foreground/50 text-center mb-4">
                    Select stores above to send message
                  </p>
                )}

                {waitingForReplies && (
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                      <span className="animate-spin">⏳</span>
                      Waiting for store replies...
                    </div>
                  </div>
                )}

                {/* Send Message Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={selectedStoreIds.length === 0 || messageSent}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-3"
                >
                  <MessageSquare size={18} />
                  {messageSent ? "Message Sent" : "Send Message to Stores"}
                </button>

                {/* Proceed Button */}
                {Object.keys(storeReplies).length > 0 && (
                  <button
                    onClick={handleProceedToDelivery}
                    className="w-full px-6 py-3 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-secondary/90 transition-all flex items-center justify-center gap-2"
                  >
                    Continue to Delivery
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
