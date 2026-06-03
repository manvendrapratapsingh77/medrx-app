"use client";

import { useState, useEffect } from "react";
import { CONVERSIONS, formatINR, convertToItemBaseUnit } from "@/lib/conversions";
import { ShoppingCart, Scale, Droplet, Layers } from "lucide-react";

interface ProductCardProps {
  product: any;
  onAddToCart: (item: any) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [unit, setUnit] = useState(product.base_unit);
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);

  const getIcon = () => {
    switch (product.dimension) {
      case "weight": return <Scale size={18} className="text-accent" />;
      case "volume": return <Droplet size={18} className="text-accent" />;
      default: return <Layers size={18} className="text-accent" />;
    }
  };

  const getUnits = () => {
    if (product.dimension === "weight") return ["g", "kg"];
    if (product.dimension === "volume") return ["mL", "L"];
    return ["unit"];
  };

  useEffect(() => {
    const qtyInBase = convertToItemBaseUnit(qty, unit);
    setTotal(qtyInBase * Number(product.base_price));
  }, [qty, unit, product.base_price]);

  return (
    <div className="card glass p-6 flex flex-col gap-4 border border-white/5 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] transition-all duration-300 group rounded-2xl relative overflow-hidden bg-white/[0.02]">
      {/* Decorative card glow */}
      <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-primary/5 blur-[25px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors" />

      <div className="flex justify-between items-start z-10">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-primary">
          {getIcon()}
        </div>
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/10">
          {product.category}
        </span>
      </div>

      <div className="z-10">
        <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed min-h-[2.25rem]">{product.description || "No description provided."}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-glass flex flex-col gap-4 z-10">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Base Price</span>
          <span className="font-mono text-white/90 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            {formatINR(Number(product.base_price))}/{product.base_unit}
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            min="0.01"
            step="0.01"
            className="input bg-white/5 border border-glass focus:border-primary text-sm py-2 px-3 rounded-xl flex-1 text-white text-center transition-all"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
          <select
            className="input bg-white/5 border border-glass focus:border-primary text-sm py-2 px-3 rounded-xl w-24 text-white transition-all cursor-pointer"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {getUnits().map((u) => (
              <option key={u} value={u} className="bg-[#0d1324] text-white">{u}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between mt-1 pt-1">
          <div className="flex flex-col">
            <span className="text-[9px] text-text-secondary uppercase font-semibold tracking-wider">
              {qty} {unit} Total
            </span>
            <span className="text-base font-extrabold text-primary tracking-wide mt-0.5">{formatINR(total)}</span>
          </div>
          <button
            onClick={() => onAddToCart({ ...product, selectedQty: qty, selectedUnit: unit, totalPrice: total })}
            className="btn btn-primary h-11 w-11 rounded-xl p-0 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-all duration-300"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
