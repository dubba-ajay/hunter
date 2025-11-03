import { useState } from "react";
import { useLocation as useLocationHook, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  getProductById,
  getStoreById,
  MOCK_STORES,
} from "@/data/mockData";
import {
  ChevronLeft,
  Truck,
  MapPin,
  CheckCircle2,
  Home,
  ArrowRight,
  MapPinIcon,
} from "lucide-react";

interface DeliveryOption {
  type: "delivery" | "pickup";
  label: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  eta: string;
  available: boolean;
}

export default function DeliveryOptions() {
  const location = useLocationHook();
  const navigate = useNavigate();

  const state = location.state as {
    productId: string;
    colorId: string;
    selectedStores: string[];
    storeReplies: Record<string, { available: boolean; price?: number }>;
  };

  if (!state?.productId) {
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
  const [fulfillmentType, setFulfillmentType] = useState<"delivery" | "pickup" | null>(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedStoreForPickup, setSelectedStoreForPickup] = useState<string | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [locating, setLocating] = useState(false);

  const availableStores = state.selectedStores
    .map((id) => getStoreById(id))
    .filter(Boolean);

  const deliveryOptions: DeliveryOption[] = [
    {
      type: "delivery",
      label: "Fast Home Delivery",
      description: "Get it delivered to your address within 2-3 hours",
      icon: <Truck size={32} />,
      price: 7.99,
      eta: "2-3 hours",
      available: true,
    },
    {
      type: "pickup",
      label: "In-Store Pickup",
      description: "Pick up your order at the store",
      icon: <Home size={32} />,
      price: 0,
      eta: "Ready in 1 hour",
      available: availableStores.length > 0,
    },
  ];

  const handleUseCurrentLocation = () => {
    setLocating(true);
    // Simulate geolocation
    setTimeout(() => {
      setAddress("123 Your Street, Apt 4B");
      setCity("New York");
      setPostalCode("10001");
      setUseCurrentLocation(true);
      setLocating(false);
    }, 1500);
  };

  const handleProceedToCheckout = () => {
    if (fulfillmentType === "delivery") {
      if (!address || !city) {
        alert("Please enter your delivery address");
        return;
      }
    } else if (fulfillmentType === "pickup") {
      if (!selectedStoreForPickup) {
        alert("Please select a store for pickup");
        return;
      }
    }

    navigate("/order-summary", {
      state: {
        productId: state.productId,
        colorId: state.colorId,
        fulfillmentType,
        address: fulfillmentType === "delivery" ? address : undefined,
        city: fulfillmentType === "delivery" ? city : undefined,
        postalCode: fulfillmentType === "delivery" ? postalCode : undefined,
        selectedStoreForPickup:
          fulfillmentType === "pickup" ? selectedStoreForPickup : undefined,
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
              Choose How to Get Your Order
            </h1>
            <p className="text-lg text-foreground/60">
              Select delivery or in-store pickup for your {product?.name}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Options */}
            <div className="lg:col-span-2">
              <div className="space-y-6 mb-8">
                {deliveryOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setFulfillmentType(option.type)}
                    disabled={!option.available}
                    className={`w-full text-left p-8 rounded-2xl border-2 transition-all ${
                      fulfillmentType === option.type
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    } ${!option.available ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="text-primary">{option.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-2xl font-bold text-foreground">
                            {option.label}
                          </h2>
                          {fulfillmentType === option.type && (
                            <CheckCircle2 size={28} className="text-primary" />
                          )}
                        </div>
                        <p className="text-foreground/70 mb-4">
                          {option.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm text-foreground/60">
                              Estimated Time
                            </p>
                            <p className="font-semibold text-foreground">
                              {option.eta}
                            </p>
                          </div>
                          <div className="space-y-1 text-right">
                            <p className="text-sm text-foreground/60">
                              Shipping Cost
                            </p>
                            <p className="font-bold text-primary text-xl">
                              {option.price === 0 ? "FREE" : `$${option.price}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Delivery Address Form */}
              {fulfillmentType === "delivery" && (
                <div className="bg-card border border-border rounded-2xl p-8 mb-8 animate-slide-up">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Delivery Address
                  </h2>

                  {/* Current Location Button */}
                  <button
                    onClick={handleUseCurrentLocation}
                    disabled={locating}
                    className="w-full px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mb-6"
                  >
                    {locating ? (
                      <>
                        <span className="animate-spin">🌍</span>
                        Getting your location...
                      </>
                    ) : (
                      <>
                        <MapPinIcon size={18} />
                        Use Current Location
                      </>
                    )}
                  </button>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main Street, Apt 4B"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="New York"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          placeholder="10001"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-700">
                        📍 Your location will be shared with the store for accurate
                        delivery
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Store Pickup Selection */}
              {fulfillmentType === "pickup" && (
                <div className="bg-card border border-border rounded-2xl p-8 animate-slide-up">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Select Pickup Store
                  </h2>

                  <div className="space-y-4">
                    {availableStores.map((store) => (
                      <button
                        key={store!.id}
                        onClick={() => setSelectedStoreForPickup(store!.id)}
                        className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                          selectedStoreForPickup === store!.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-foreground mb-2">
                              {store!.name}
                            </h3>
                            <p className="text-sm text-foreground/70 mb-3">
                              {store!.address}, {store!.city}
                            </p>
                            <div className="flex flex-wrap gap-3 text-sm">
                              <span className="flex items-center gap-1 text-foreground/60">
                                <MapPin size={14} />
                                {store!.distance} km away
                              </span>
                              <span className="flex items-center gap-1 text-foreground/60">
                                🕐 {store!.hours.open} - {store!.hours.close}
                              </span>
                            </div>
                          </div>
                          {selectedStoreForPickup === store!.id && (
                            <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                    <p className="text-sm text-green-700">
                      ✓ Location will be shared with the store for pickup
                      instructions
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h2 className="font-bold text-lg text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Product */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-sm font-semibold text-foreground/60 mb-3">
                    Product
                  </p>
                  <p className="font-medium text-foreground">{product?.name}</p>
                  <p className="text-sm text-foreground/70">
                    Brand: {product?.brand}
                  </p>
                </div>

                {/* Price Info */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-sm font-semibold text-foreground/60 mb-3">
                    Price
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${product?.priceRange.max.toFixed(2)}
                  </p>
                  <p className="text-xs text-foreground/50">
                    From nearby stores
                  </p>
                </div>

                {/* Fulfillment Type */}
                {fulfillmentType && (
                  <div className="mb-6 pb-6 border-b border-border">
                    <p className="text-sm font-semibold text-foreground/60 mb-3">
                      Fulfillment
                    </p>
                    <div className="flex items-center gap-2">
                      {fulfillmentType === "delivery" ? (
                        <>
                          <Truck size={16} className="text-secondary" />
                          <span className="font-medium text-foreground">
                            Home Delivery
                          </span>
                        </>
                      ) : (
                        <>
                          <Home size={16} className="text-primary" />
                          <span className="font-medium text-foreground">
                            In-Store Pickup
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={handleProceedToCheckout}
                  disabled={!fulfillmentType || (fulfillmentType === "delivery" && !address) || (fulfillmentType === "pickup" && !selectedStoreForPickup)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Complete Order
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
