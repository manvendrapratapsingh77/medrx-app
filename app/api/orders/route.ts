import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { convertToItemBaseUnit } from "@/lib/conversions";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { items } = await req.json();
    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Empty quotation" }, { status: 400 });
    }

    // Calculate total and prepare items
    let totalInr = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json({ message: `Product not found: ${item.productId}` }, { status: 404 });
      }

      const qtyInBaseUnit = convertToItemBaseUnit(item.orderedQty, item.orderedUnit);
      
      // Stock availability check (optional for Quotation, but good to have)
      if (Number(product.stock_in_base_unit) < qtyInBaseUnit) {
        return NextResponse.json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock_in_base_unit} ${product.base_unit}` 
        }, { status: 400 });
      }

      const lineTotal = Number(qtyInBaseUnit) * Number(product.base_price);
      totalInr += lineTotal;

      orderItemsData.push({
        product_id: product.id,
        ordered_unit: item.orderedUnit,
        ordered_qty: item.orderedQty,
        base_unit: product.base_unit,
        qty_in_base_unit: qtyInBaseUnit,
        unit_price_inr: product.base_price,
        line_total_inr: lineTotal,
      });
    }

    const order = await prisma.order.create({
      data: {
        buyer_id: (session.user as any).id,
        status: "QUOTATION",
        total_inr: totalInr,
        items: {
          create: orderItemsData,
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    const userId = (session.user as any).id;

    let orders;
    if (role === "ADMIN") {
      orders = await prisma.order.findMany({
        include: { buyer: { select: { email: true } }, items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else if (role === "BUYER") {
      orders = await prisma.order.findMany({
        where: { buyer_id: userId },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else {
      // SELLER - view orders containing their products
      orders = await prisma.order.findMany({
        where: {
          items: {
            some: {
              product: { seller_id: userId }
            }
          }
        },
        include: { 
          buyer: { select: { email: true } }, 
          items: { 
            include: { product: true },
            where: { product: { seller_id: userId } }
          } 
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}
