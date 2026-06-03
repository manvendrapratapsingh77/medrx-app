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
  const [orders, setOrders] = useState([]);
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
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold">Orders & Quotations</h2>
        <p className="text-muted text-sm">Manage and track your pharmaceutical quotations.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-accent" size={48} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order: any) => (
            <div key={order.id} className="card glass p-0 overflow-hidden border-glass hover:border-accent/20 transition-all">
              <div 
                className="p-6 cursor-pointer flex items-center justify-between"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-glass rounded-xl">
                    <ClipboardList size={24} className="text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted">#{order.id.slice(0, 8)}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        order.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-100' :
                        'bg-accent/10 text-accent'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="font-medium mt-1">
                      {order.buyer?.email || "Multiple Items"}
                    </p>
                    <p className="text-[10px] text-muted uppercase">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] text-muted uppercase">Total Amount</p>
                    <p className="text-lg font-bold text-accent">{formatINR(Number(order.total_inr))}</p>
                  </div>
                  {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="px-6 pb-6 pt-2 border-t border-glass animate-in slide-in-from-top-2 duration-300">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="text-muted border-b border-glass">
                          <th className="py-4 font-medium uppercase text-[10px]">Product</th>
                          <th className="py-4 font-medium uppercase text-[10px]">Ordered Qty</th>
                          <th className="py-4 font-medium uppercase text-[10px]">Base Unit Qty</th>
                          <th className="py-4 font-medium uppercase text-[10px] text-right">Line Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item: any) => (
                          <tr key={item.id} className="border-b border-glass/50">
                            <td className="py-4">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-[10px] text-muted">{item.product.sku}</p>
                            </td>
                            <td className="py-4">
                              {item.ordered_qty} {item.ordered_unit}
                            </td>
                            <td className="py-4">
                              {item.qty_in_base_unit} {item.base_unit}
                            </td>
                            <td className="py-4 text-right font-mono text-accent">
                              {formatINR(Number(item.line_total_inr))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {order.status === 'QUOTATION' && (
                    <div className="mt-6 flex justify-end gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, 'CANCELLED'); }}
                        className="btn glass text-red-400 hover:bg-red-400/10 border-red-400/20"
                      >
                        <XCircle size={16} /> Cancel Order
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, 'CONFIRMED'); }}
                        className="btn btn-primary"
                      >
                        <CheckCircle2 size={16} /> Confirm Order
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {!loading && orders.length === 0 && (
            <div className="text-center py-20 glass rounded-xl">
              <p className="text-muted">No orders or quotations found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
