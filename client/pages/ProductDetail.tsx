import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { getProductById, findNearbyStores } from "@/data/mockData";
import { ChevronLeft, MapPin, Truck, ArrowRight } from "lucide-react";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = productId ? getProductById(productId) : null;

  const [selectedColorId, setSelectedColorId] = useState<string | null>(
    product?.colors[0]?.id || null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nearbyStores] = useState(() =>
    product ? findNearbyStores(product.category) : []
  );

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Product not found
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

  const selectedColor = product.colors.find((c) => c.id === selectedColorId);
  const nearbyCount = nearbyStores.length;

  const handleProceed = () => {
    if (!selectedColorId) return;
    navigate("/select-stores", {
      state: { productId: product.id, colorId: selectedColorId },
    });
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-primary/5 via-background to-background min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Search
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="animate-fade-in">
              <div className="bg-white rounded-2xl border border-border overflow-hidden mb-4 aspect-square flex items-center justify-center">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      idx === currentImageIndex
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-fade-in">
              <div className="mb-8">
                <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                  {product.category}
                </p>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-xl font-semibold text-secondary mb-4">
                  by {product.brand}
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Range */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 mb-8">
                <p className="text-sm text-foreground/60 mb-2">Price Range</p>
                <p className="text-3xl font-bold text-primary">
                  ${product.priceRange.min.toFixed(2)} - $
                  {product.priceRange.max.toFixed(2)}
                </p>
                <p className="text-sm text-foreground/50 mt-2">
                  Prices vary by store and availability
                </p>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Select Color
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() =>
                        color.available && setSelectedColorId(color.id)
                      }
                      disabled={!color.available}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all border-2 ${
                        selectedColorId === color.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      } ${!color.available ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                      {!color.available && (
                        <span className="text-xs text-foreground/50">
                          (Out of Stock)
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Store Availability Summary */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Available at {nearbyCount} Nearby Stores
                    </h3>
                    <p className="text-sm text-foreground/60">
                      We found this product at stores in your area. Click next to
                      check availability and message stores.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-700 font-medium">
                    ✓ {nearbyCount} stores nearby with delivery options
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <Truck size={24} className="text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Delivery & Pickup Options
                    </h4>
                    <p className="text-sm text-foreground/60">
                      Choose delivery to your location or pickup in-store after
                      store confirmation
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleProceed}
                disabled={!selectedColorId}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                Check Store Availability
                <ArrowRight size={20} />
              </button>

              {/* Stock Alert */}
              {selectedColor && !selectedColor.available && (
                <p className="text-sm text-red-600 mt-4 text-center">
                  This color is currently out of stock. Please select another
                  color.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
