import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    
    const products = await prisma.product.findMany({
      where: category ? { category } : {},
      include: { seller: { select: { email: true } } },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}
