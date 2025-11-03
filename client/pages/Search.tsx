import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { Search as SearchIcon, X, TrendingUp, ChevronRight } from "lucide-react";
import { Product } from "@/types";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searching, setSearching] = useState(false);

  const categories = [
    "Home & Kitchen",
    "Electronics",
    "Hardware",
    "Sports & Outdoors",
    "Tools",
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      let results = MOCK_PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (selectedCategory) {
        results = results.filter(
          (product) => product.category === selectedCategory
        );
      }

      setSearchResults(results);
      setSearching(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 py-12">
          {/* Search Header */}
          <div className="mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Find Products Near You
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl">
              Search for any product and discover which nearby stores have it in
              stock with real-time availability.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow">
              <div className="flex items-center px-6 py-4 gap-4">
                <SearchIcon size={24} className="text-primary flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search for any product... (e.g., rice cooker, drill, kitchen sink)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 outline-none text-lg text-foreground placeholder:text-foreground/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X size={20} className="text-foreground/40" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || searching}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {searching ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Searching products...
                  </>
                ) : (
                  <>
                    <SearchIcon size={18} />
                    Search Products
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-sm font-semibold text-foreground/60 mb-4">
              Filter by Category:
            </p>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div className="max-w-6xl mx-auto">
              {searchResults.length > 0 ? (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground">
                      Found {searchResults.length} product
                      {searchResults.length !== 1 ? "s" : ""}
                    </h2>
                    <p className="text-foreground/60">
                      for "{searchQuery}"
                      {selectedCategory && ` in ${selectedCategory}`}
                    </p>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group"
                      >
                        <div className="bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden h-full flex flex-col">
                          {/* Product Image */}
                          <div className="relative w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden flex items-center justify-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>

                          {/* Product Info */}
                          <div className="p-5 flex flex-col flex-1">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                              {product.category}
                            </p>

                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {product.name}
                            </h3>

                            <p className="text-sm text-foreground/60 mb-4">
                              by {product.brand}
                            </p>

                            {/* Color Options */}
                            <div className="mb-4">
                              <p className="text-xs text-foreground/60 mb-2">
                                Colors available:
                              </p>
                              <div className="flex gap-2">
                                {product.colors
                                  .filter((c) => c.available)
                                  .slice(0, 3)
                                  .map((color) => (
                                    <div
                                      key={color.id}
                                      className="w-5 h-5 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                                      style={{ backgroundColor: color.hex }}
                                      title={color.name}
                                    />
                                  ))}
                                {product.colors.filter((c) => c.available)
                                  .length > 3 && (
                                  <span className="text-xs text-foreground/60 flex items-center">
                                    +{product.colors.filter((c) => c.available).length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Price Range */}
                            <div className="flex-1"></div>
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                              <div>
                                <p className="text-xs text-foreground/60">Price</p>
                                <p className="text-lg font-bold text-primary">
                                  ${product.priceRange.min.toFixed(2)}
                                </p>
                              </div>
                              <button className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all group-hover:shadow-md flex items-center gap-1">
                                View
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    No products found
                  </h2>
                  <p className="text-foreground/60">
                    Try searching for a different product or removing filters
                  </p>
                </div>
              )}
            </div>
          )}

          {!hasSearched && (
            <div className="max-w-4xl mx-auto text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Ready to find a product?
              </h2>
              <p className="text-foreground/60 mb-8">
                Search above to see which nearby stores have what you're
                looking for
              </p>

              {/* Popular Products */}
              <div className="mt-12">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <TrendingUp size={20} className="text-primary" />
                  <h3 className="text-lg font-bold text-foreground">
                    Popular Products
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MOCK_PRODUCTS.slice(0, 3).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <p className="text-sm font-semibold text-foreground/60 mb-2 group-hover:text-primary">
                        {product.category}
                      </p>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </p>
                      <p className="text-sm text-foreground/60">
                        ${product.priceRange.min.toFixed(2)} - $
                        {product.priceRange.max.toFixed(2)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
