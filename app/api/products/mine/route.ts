import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "SELLER") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      where: { seller_id: (session.user as any).id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "SELLER") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        ...body,
        seller_id: (session.user as any).id,
        base_price: Number(body.base_price),
        stock_in_base_unit: Number(body.stock_in_base_unit),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
