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
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex justify-between items-center pb-6 border-b border-glass">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Product Management</h2>
          <p className="text-text-secondary text-sm mt-1">Create and manage your chemistry product catalog.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)} 
            className="btn btn-primary px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            <Plus size={16} /> Add New Product
          </button>
        )}
      </div>

      {/* Add Product Drawer/Form */}
      {isAdding && (
        <div className="card glass p-8 border border-white/10 rounded-2xl bg-white/[0.01] relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-primary/5 blur-[40px] rounded-full pointer-events-none" />
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Add New Product to Catalog</h3>
            <button onClick={() => setIsAdding(false)} className="text-text-secondary hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Product Name</label>
              <input 
                className="input bg-white/5 border border-glass focus:border-primary text-sm px-4 py-2.5 rounded-xl text-white transition-all" 
                required 
                placeholder="e.g. Sodium Chloride"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">SKU Code</label>
              <input 
                className="input bg-white/5 border border-glass focus:border-primary text-sm px-4 py-2.5 rounded-xl text-white font-mono transition-all" 
                required 
                placeholder="e.g. RE-NaCl-001"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Description</label>
              <textarea 
                className="input bg-white/5 border border-glass focus:border-primary text-sm px-4 py-3 rounded-xl text-white transition-all min-h-[100px]" 
                placeholder="Describe chemical purity, usage warning, or storage recommendations..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Category</label>
              <input 
                className="input bg-white/5 border border-glass focus:border-primary text-sm px-4 py-2.5 rounded-xl text-white transition-all" 
                required 
                placeholder="e.g. Reagents"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Dimension</label>
              <select 
                className="input bg-white/5 border border-glass focus:border-primary text-sm px-4 py-2.5 rounded-xl text-white transition-all cursor-pointer"
                value={formData.dimension}
                onChange={(e) => setFormData({...formData, dimension: e.target.value, base_unit: e.target.value === 'weight' ? 'g' : e.target.value === 'volume' ? 'mL' : 'unit'})}
              >
                <option value="weight" className="bg-[#0d1324] text-white">Weight (g, kg)</option>
                <option value="volume" className="bg-[#0d1324] text-white">Volume (mL, L)</option>
                <option value="count" className="bg-[#0d1324] text-white">Count (Unit)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Base Price (INR per {formData.base_unit})</label>
              <input 
                type="number" 
                step="0.0001" 
                className="input bg-white/5 border border-glass focus:border-primary text-sm px-4 py-2.5 rounded-xl text-white transition-all" 
                required 
                placeholder="0.00"
                value={formData.base_price}
                onChange={(e) => setFormData({...formData, base_price: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Initial Stock (in {formData.base_unit})</label>
              <input 
                type="number" 
                step="0.000001" 
                className="input bg-white/5 border border-glass focus:border-primary text-sm px-4 py-2.5 rounded-xl text-white transition-all" 
                required 
                placeholder="0"
                value={formData.stock_in_base_unit}
                onChange={(e) => setFormData({...formData, stock_in_base_unit: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t border-glass pt-6">
              <button 
                type="button" 
                onClick={() => setIsAdding(false)} 
                className="btn bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary px-6 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <Save size={16} /> Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 glass rounded-2xl border border-glass bg-white/[0.01]">
            <p className="text-text-secondary text-sm">{"You haven't listed any products yet. Click \"Add New Product\" to begin."}</p>
          </div>
        ) : products.map((product: any) => (
          <div 
            key={product.id} 
            className="card glass p-6 flex flex-col md:flex-row justify-between items-center gap-6 group border border-white/5 hover:border-primary/20 transition-all rounded-2xl bg-white/[0.01]"
          >
            <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-primary group-hover:bg-primary/10 transition-colors shadow-sm">
                <Package size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-base text-white truncate">{product.name}</h4>
                <div className="flex items-center flex-wrap gap-2.5 mt-1">
                  <span className="text-[10px] text-text-secondary font-mono tracking-wider bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                    {product.sku}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/10" />
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest bg-primary/10 border border-primary/10 px-2 py-0.5 rounded">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end border-t border-glass md:border-none pt-4 md:pt-0">
              <div className="text-left md:text-right">
                <p className="text-[9px] text-text-secondary uppercase font-semibold tracking-wider">Available Stock</p>
                <p className="font-bold text-white text-sm mt-0.5">{product.stock_in_base_unit} {product.base_unit}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[9px] text-text-secondary uppercase font-semibold tracking-wider">Base Price</p>
                <p className="font-mono text-primary font-bold text-sm mt-0.5">{formatINR(Number(product.base_price))}/{product.base_unit}</p>
              </div>
              
              <div className="flex gap-2">
                <button className="btn bg-white/5 border border-white/5 p-2 h-9 w-9 rounded-lg hover:text-primary hover:bg-primary/10 hover:border-primary/10 transition-all">
                  <Edit2 size={15} />
                </button>
                <button className="btn bg-white/5 border border-white/5 p-2 h-9 w-9 rounded-lg hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/10 transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
