"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Search, Filter, Loader2 } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = async (item: any) => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{
          productId: item.id,
          orderedUnit: item.selectedUnit,
          orderedQty: item.selectedQty,
        }]
      }),
    });

    if (res.ok) {
      alert("Quotation placed successfully!");
    } else {
      alert("Failed to place quotation.");
    }
  };

  const categories = ["All", "Reagents", "Solvents", "Labware"];

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-glass">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Browse Catalog</h2>
          <p className="text-text-secondary text-sm mt-1">Select items, configure quantities, and submit your quote request.</p>
        </div>
        
        {/* Search controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input
              type="text"
              placeholder="Search by name, category, SKU..."
              className="input bg-white/5 border border-glass focus:border-primary text-sm pl-11 pr-4 py-2.5 rounded-xl text-white w-full transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
              selectedCategory === cat
                ? "bg-primary/20 text-primary border-primary/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                : "bg-white/5 text-text-secondary border-glass hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-primary" size={36} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: any) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-24 glass rounded-2xl border border-glass bg-white/[0.01]">
          <p className="text-text-secondary text-sm">No products found matching your active filters.</p>
        </div>
      )}
    </div>
  );
}
