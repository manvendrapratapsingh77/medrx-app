"use client";

import { useState, useEffect } from "react";
import { Plus, Package, Edit2, Trash2, Loader2, Save, X } from "lucide-react";
import { formatINR } from "@/lib/conversions";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    sku: "",
    dimension: "weight",
    base_unit: "g",
    base_price: "",
    stock_in_base_unit: "",
  });

  useEffect(() => {
    fetch("/api/products/mine")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products/mine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const newProduct = await res.json();
      setProducts([...products, newProduct] as any);
      setIsAdding(false);
      resetForm();
    } else {
      alert("Failed to save product.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      sku: "",
      dimension: "weight",
      base_unit: "g",
      base_price: "",
      stock_in_base_unit: "",
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-muted text-sm">Add and update your catalog listings.</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn btn-primary">
            <Plus size={18} /> Add New Product
          </button>
        )}
      </div>

      {isAdding && (
        <div className="card glass p-8 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">New Product Details</h3>
            <button onClick={() => setIsAdding(false)} className="text-muted hover:text-white">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted">Product Name</label>
              <input 
                className="input" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted">SKU</label>
              <input 
                className="input" 
                required 
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm text-muted">Description</label>
              <textarea 
                className="input min-h-[100px]" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted">Category</label>
              <input 
                className="input" 
                required 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted">Dimension</label>
              <select 
                className="input"
                value={formData.dimension}
                onChange={(e) => setFormData({...formData, dimension: e.target.value, base_unit: e.target.value === 'weight' ? 'g' : e.target.value === 'volume' ? 'mL' : 'unit'})}
              >
                <option value="weight">Weight</option>
                <option value="volume">Volume</option>
                <option value="count">Count</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted">Base Price (INR per {formData.base_unit})</label>
              <input 
                type="number" 
                step="0.0001" 
                className="input" 
                required 
                value={formData.base_price}
                onChange={(e) => setFormData({...formData, base_price: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted">Initial Stock (in {formData.base_unit})</label>
              <input 
                type="number" 
                step="0.000001" 
                className="input" 
                required 
                value={formData.stock_in_base_unit}
                onChange={(e) => setFormData({...formData, stock_in_base_unit: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="btn glass">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-8">
                <Save size={18} /> Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent" size={32} />
          </div>
        ) : products.map((product: any) => (
          <div key={product.id} className="card glass p-6 flex flex-col md:flex-row justify-between items-center gap-6 group">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 bg-glass rounded-xl text-accent group-hover:bg-accent/10 transition-colors">
                <Package size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">{product.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted font-mono">{product.sku}</span>
                  <span className="h-1 w-1 rounded-full bg-glass" />
                  <span className="text-xs text-accent uppercase font-bold tracking-wider">{product.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-12 text-center">
              <div>
                <p className="text-[10px] text-muted uppercase">Stock Level</p>
                <p className="font-bold">{product.stock_in_base_unit} {product.base_unit}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted uppercase">Price</p>
                <p className="font-mono text-accent font-bold">{formatINR(Number(product.base_price))}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn glass p-2 hover:text-blue-400">
                <Edit2 size={18} />
              </button>
              <button className="btn glass p-2 hover:text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
