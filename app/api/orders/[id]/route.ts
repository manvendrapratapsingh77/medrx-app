import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role === "BUYER") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();
    const orderId = params.id;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Security: If SELLER, ensure they own at least one product in this order
    if ((session.user as any).role === "SELLER") {
      const ownsProduct = order.items.some(item => item.product.seller_id === (session.user as any).id);
      if (!ownsProduct) {
        return NextResponse.json({ message: "Forbidden: You don't own products in this order" }, { status: 403 });
      }
    }

    // Logic for confirmed -> deduction
    if (status === "CONFIRMED" && order.status === "QUOTATION") {
      // Transaction to update order and deduct stock
      await prisma.$transaction(async (tx: any) => {
        await tx.order.update({
          where: { id: orderId },
          data: { status: "CONFIRMED" },
        });

        for (const item of order.items) {
          // Double check stock again inside transaction
          const currentProduct = await tx.product.findUnique({
            where: { id: item.product_id },
          });

          if (!currentProduct || Number(currentProduct.stock_in_base_unit) < Number(item.qty_in_base_unit)) {
            throw new Error(`Insufficient stock for ${currentProduct?.name || 'product'}`);
          }

          await tx.product.update({
            where: { id: item.product_id },
            data: {
              stock_in_base_unit: {
                decrement: item.qty_in_base_unit,
              },
            },
          });
        }
      });
    } else {
      await prisma.order.update({
        where: { id: orderId },
        data: { status },
      });
    }

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
