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
    <div className="card glass p-6 flex flex-col gap-4 hover:border-accent/30 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-glass">
          {getIcon()}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
          {product.category}
        </span>
      </div>

      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-muted mt-1 line-clamp-2">{product.description}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-glass flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Base Price</span>
          <span className="font-mono">{formatINR(Number(product.base_price))}/{product.base_unit}</span>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            min="0.01"
            step="0.01"
            className="input text-sm py-2 flex-1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
          <select
            className="input text-sm py-2 w-24"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {getUnits().map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted uppercase">
              {qty} {unit} @ {formatINR(Number(product.base_price))}/{product.base_unit}
            </span>
            <span className="text-lg font-bold text-accent">{formatINR(total)}</span>
          </div>
          <button
            onClick={() => onAddToCart({ ...product, selectedQty: qty, selectedUnit: unit, totalPrice: total })}
            className="btn btn-primary p-2 h-10 w-10"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
