"use client";

import { useState, useEffect } from "react";
import { formatINR } from "@/lib/conversions";
import { 
  ClipboardList, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED": return <CheckCircle2 className="text-green-500" size={18} />;
      case "CANCELLED": return <XCircle className="text-red-500" size={18} />;
      default: return <Clock className="text-accent" size={18} />;
    }
  };

  const handleStatusUpdate = async (orderId: string, status: string) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setOrders(orders.map((o: any) => o.id === orderId ? { ...o, status } : o));
    } else {
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="pb-6 border-b border-glass">
        <h2 className="text-2xl font-bold text-white tracking-wide">Orders & Quotations</h2>
        <p className="text-text-secondary text-sm mt-1">Review, authorize, or cancel chemistry order quotations.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-primary" size={36} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order: any) => (
            <div 
              key={order.id} 
              className={`card glass p-0 overflow-hidden border transition-all rounded-2xl bg-white/[0.01] ${
                expandedOrder === order.id ? 'border-primary/20 ring-1 ring-primary/10' : 'border-white/5 hover:border-primary/15'
              }`}
            >
              {/* Card Header Clickable */}
              <div 
                className="p-6 cursor-pointer flex items-center justify-between gap-4"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-primary shadow-sm hidden sm:block">
                    <ClipboardList size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center flex-wrap gap-2.5">
                      <span className="font-mono text-xs text-text-secondary bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        #{order.id.slice(0, 8)}
                      </span>
                      <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider border ${
                        order.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-primary/10 text-primary border-primary/20'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="font-bold text-sm text-white mt-2 truncate">
                      Buyer: {order.buyer?.email}
                    </p>
                    <p className="text-[9px] text-text-secondary font-semibold uppercase tracking-wider mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[9px] text-text-secondary uppercase font-semibold tracking-wider">Total Amount</p>
                    <p className="text-base font-extrabold text-primary tracking-wide mt-0.5">{formatINR(Number(order.total_inr))}</p>
                  </div>
                  <div className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-white transition-all">
                    {expandedOrder === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {/* Collapsed Order Item Details */}
              {expandedOrder === order.id && (
                <div className="px-6 pb-6 pt-3 border-t border-glass animate-in slide-in-from-top-2 duration-300 bg-black/10">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead>
                        <tr className="text-text-secondary border-b border-glass">
                          <th className="py-3 font-bold uppercase text-[9px] tracking-wider">Product Name</th>
                          <th className="py-3 font-bold uppercase text-[9px] tracking-wider">Ordered Qty</th>
                          <th className="py-3 font-bold uppercase text-[9px] tracking-wider">Base Qty Conversion</th>
                          <th className="py-3 font-bold uppercase text-[9px] tracking-wider text-right">Line Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item: any) => (
                          <tr key={item.id} className="border-b border-glass/30 hover:bg-white/[0.01] transition-colors">
                            <td className="py-3.5">
                              <p className="font-bold text-white text-sm">{item.product.name}</p>
                              <p className="text-[10px] text-text-secondary font-mono mt-0.5">{item.product.sku}</p>
                            </td>
                            <td className="py-3.5 text-white/90 text-sm">
                              {item.ordered_qty} {item.ordered_unit}
                            </td>
                            <td className="py-3.5 text-text-secondary text-xs font-medium">
                              {item.qty_in_base_unit} {item.base_unit}
                            </td>
                            <td className="py-3.5 text-right font-mono text-primary font-bold text-sm">
                              {formatINR(Number(item.line_total_inr))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {order.status === 'QUOTATION' && (
                    <div className="mt-6 flex justify-end gap-3 border-t border-glass pt-5">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, 'CANCELLED'); }}
                        className="btn bg-white/5 border border-white/10 text-red-400 hover:bg-red-500/10 hover:border-red-500/10 px-5 py-2 rounded-xl text-xs font-bold transition-all"
                      >
                        <XCircle size={14} /> Cancel Request
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, 'CONFIRMED'); }}
                        className="btn btn-primary px-6 py-2 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                      >
                        <CheckCircle2 size={14} /> Confirm Quotation
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {!loading && orders.length === 0 && (
            <div className="text-center py-24 glass rounded-2xl border border-glass bg-white/[0.01]">
              <p className="text-text-secondary text-sm">No orders or quotations found in system records.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
