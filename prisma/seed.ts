import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Generate password hashes
  const adminPassword = await bcrypt.hash("admin123", 10);
  const sellerPassword = await bcrypt.hash("seller123", 10);
  const buyerPassword = await bcrypt.hash("buyer123", 10);

  // 1. Seed Users
  console.log("Seeding users...");
  
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@aasamedchem.com" },
    update: { password_hash: adminPassword, role: "ADMIN" },
    create: {
      email: "admin@aasamedchem.com",
      password_hash: adminPassword,
      role: "ADMIN",
    },
  });

  const sellerUser = await prisma.user.upsert({
    where: { email: "seller@aasamedchem.com" },
    update: { password_hash: sellerPassword, role: "SELLER" },
    create: {
      email: "seller@aasamedchem.com",
      password_hash: sellerPassword,
      role: "SELLER",
    },
  });

  const buyerUser = await prisma.user.upsert({
    where: { email: "buyer@aasamedchem.com" },
    update: { password_hash: buyerPassword, role: "BUYER" },
    create: {
      email: "buyer@aasamedchem.com",
      password_hash: buyerPassword,
      role: "BUYER",
    },
  });

  // 2. Seed Products
  console.log("Seeding products...");
  const productsData = [
    {
      name: "Sodium Chloride",
      description: "Analytical grade reagent NaCl for precision chemistry",
      category: "Reagents",
      sku: "RE-NaCl-001",
      dimension: "weight" as const,
      base_unit: "g",
      base_price: 0.5, // 0.5 INR per gram (500 INR/kg)
      stock_in_base_unit: 25000, // 25 kg
      seller_id: sellerUser.id,
    },
    {
      name: "Ethanol 99%",
      description: "Absolute solvent grade ethanol for extraction and sanitization",
      category: "Solvents",
      sku: "SO-ETH-002",
      dimension: "volume" as const,
      base_unit: "mL",
      base_price: 1.2, // 1.2 INR per mL (1200 INR/L)
      stock_in_base_unit: 10000, // 10 L
      seller_id: sellerUser.id,
    },
    {
      name: "Petri Dishes",
      description: "Sterile plastic petri dishes, 90mm diameter, pack of 10",
      category: "Labware",
      sku: "LW-PET-003",
      dimension: "count" as const,
      base_unit: "unit",
      base_price: 15.0, // 15 INR per dish
      stock_in_base_unit: 500,
      seller_id: sellerUser.id,
    },
    {
      name: "Hydrochloric Acid 37%",
      description: "Concentrated HCl reagent for chemical synthesis and pH control",
      category: "Reagents",
      sku: "RE-HCl-004",
      dimension: "volume" as const,
      base_unit: "mL",
      base_price: 2.5, // 2.5 INR per mL
      stock_in_base_unit: 5000, // 5 L
      seller_id: sellerUser.id,
    },
    {
      name: "Acetone HPLC",
      description: "High-purity acetone solvent for chromatography applications",
      category: "Solvents",
      sku: "SO-ACE-005",
      dimension: "volume" as const,
      base_unit: "mL",
      base_price: 3.1,
      stock_in_base_unit: 4000,
      seller_id: sellerUser.id,
    },
    {
      name: "Graduated Pipettes 10mL",
      description: "Glass graduated measuring pipettes, Class A accuracy",
      category: "Labware",
      sku: "LW-PIP-006",
      dimension: "count" as const,
      base_unit: "unit",
      base_price: 120.0,
      stock_in_base_unit: 50,
      seller_id: sellerUser.id,
    },
  ];

  const seededProducts = [];
  for (const p of productsData) {
    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name,
        description: p.description,
        category: p.category,
        base_price: p.base_price,
        stock_in_base_unit: p.stock_in_base_unit,
      },
      create: p,
    });
    seededProducts.push(product);
  }

  // 3. Seed Orders & Quotations
  console.log("Seeding sample orders and quotations...");

  // Clean old orders first to start fresh and clean
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});

  // Order 1: A Pending Quotation (QUOTATION status)
  const prodNaCl = seededProducts.find(p => p.sku === "RE-NaCl-001")!;
  const prodEthanol = seededProducts.find(p => p.sku === "SO-ETH-002")!;

  const qtyNaCl = 1000; // 1000g (1kg)
  const qtyEthanol = 2000; // 2000mL (2L)
  
  const priceNaCl = Number(prodNaCl.base_price) * qtyNaCl;
  const priceEthanol = Number(prodEthanol.base_price) * qtyEthanol;
  const totalOrder1 = priceNaCl + priceEthanol;

  const order1 = await prisma.order.create({
    data: {
      buyer_id: buyerUser.id,
      status: "QUOTATION",
      total_inr: totalOrder1,
      items: {
        create: [
          {
            product_id: prodNaCl.id,
            ordered_unit: "kg",
            ordered_qty: 1,
            base_unit: "g",
            qty_in_base_unit: qtyNaCl,
            unit_price_inr: prodNaCl.base_price,
            line_total_inr: priceNaCl,
          },
          {
            product_id: prodEthanol.id,
            ordered_unit: "L",
            ordered_qty: 2,
            base_unit: "mL",
            qty_in_base_unit: qtyEthanol,
            unit_price_inr: prodEthanol.base_price,
            line_total_inr: priceEthanol,
          }
        ]
      }
    }
  });

  // Order 2: A Confirmed Order (CONFIRMED status)
  const prodPetri = seededProducts.find(p => p.sku === "LW-PET-003")!;
  const qtyPetri = 10;
  const pricePetri = Number(prodPetri.base_price) * qtyPetri;

  const order2 = await prisma.order.create({
    data: {
      buyer_id: buyerUser.id,
      status: "CONFIRMED",
      total_inr: pricePetri,
      items: {
        create: [
          {
            product_id: prodPetri.id,
            ordered_unit: "unit",
            ordered_qty: qtyPetri,
            base_unit: "unit",
            qty_in_base_unit: qtyPetri,
            unit_price_inr: prodPetri.base_price,
            line_total_inr: pricePetri,
          }
        ]
      }
    }
  });

  // Order 3: A Cancelled Order (CANCELLED status)
  const prodHCl = seededProducts.find(p => p.sku === "RE-HCl-004")!;
  const qtyHCl = 500; // 500 mL
  const priceHCl = Number(prodHCl.base_price) * qtyHCl;

  const order3 = await prisma.order.create({
    data: {
      buyer_id: buyerUser.id,
      status: "CANCELLED",
      total_inr: priceHCl,
      items: {
        create: [
          {
            product_id: prodHCl.id,
            ordered_unit: "mL",
            ordered_qty: qtyHCl,
            base_unit: "mL",
            qty_in_base_unit: qtyHCl,
            unit_price_inr: prodHCl.base_price,
            line_total_inr: priceHCl,
          }
        ]
      }
    }
  });

  console.log("Database seeded successfully with users, products, and order histories.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
