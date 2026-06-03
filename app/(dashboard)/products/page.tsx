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

  const filteredProducts = products.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = async (item: any) => {
    // For this implementation, we'll immediately create a quotation on "Add to Cart" 
    // to simplify the flow as requested (or we could build a full cart).
    // The requirement says "Add to Cart -> Place Quotation".
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

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Browse Inventory</h2>
          <p className="text-muted text-sm">Select products and units for your quotation.</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn glass">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-accent" size={48} />
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
        <div className="text-center py-20 glass rounded-xl">
          <p className="text-muted">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}
