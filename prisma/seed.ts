import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const sellerPassword = await bcrypt.hash("seller123", 10);
  const buyerPassword = await bcrypt.hash("buyer123", 10);

  // Create Users
  await prisma.user.upsert({
    where: { email: "admin@aasamedchem.com" },
    update: {},
    create: {
      email: "admin@aasamedchem.com",
      password_hash: adminPassword,
      role: "ADMIN",
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: "seller@aasamedchem.com" },
    update: {},
    create: {
      email: "seller@aasamedchem.com",
      password_hash: sellerPassword,
      role: "SELLER",
    },
  });

  await prisma.user.upsert({
    where: { email: "buyer@aasamedchem.com" },
    update: {},
    create: {
      email: "buyer@aasamedchem.com",
      password_hash: buyerPassword,
      role: "BUYER",
    },
  });

  // Create some products
  const products = [
    {
      name: "Sodium Chloride",
      description: "High purity NaCl for laboratory use",
      category: "Reagents",
      sku: "RE-NaCl-001",
      dimension: "weight" as const,
      base_unit: "g",
      base_price: 0.5, // 0.5 INR per gram
      stock_in_base_unit: 10000,
      seller_id: seller.id,
    },
    {
      name: "Ethanol 99%",
      description: "Absolute Ethanol for chemical analysis",
      category: "Solvents",
      sku: "SO-ETH-002",
      dimension: "volume" as const,
      base_unit: "mL",
      base_price: 1.2, // 1.2 INR per mL
      stock_in_base_unit: 5000,
      seller_id: seller.id,
    },
    {
      name: "Petri Dishes",
      description: "Sterile plastic petri dishes, 90mm",
      category: "Labware",
      sku: "LW-PET-003",
      dimension: "count" as const,
      base_unit: "unit",
      base_price: 15.0, // 15 INR per unit
      stock_in_base_unit: 200,
      seller_id: seller.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
  }

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
