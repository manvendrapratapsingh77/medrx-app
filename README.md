# 🧪 AasaMedChem — Inventory & Order Management System

AasaMedChem is a modern, chemical inventory and quotation system built for laboratories, suppliers, and procurement managers. It provides a complete workflow for managing products, generating quotations, and approving orders with unit-aware quantity handling.

## 🌟 What This Website Does

This application brings together three core user experiences:
- **Buyers** can browse available chemicals, select quantity and units, and submit requests as quotations.
- **Sellers** can add products, manage stock, and review orders for the chemicals they provide.
- **Admins** can oversee the full platform, approve or cancel orders, and manage user roles.

The app is designed to preserve measurement accuracy and reduce errors by storing all quantities in a unified base form while allowing flexible unit input in the UI.

## 🧠 Unit & Pricing Intelligence

AasaMedChem treats units as first-class citizens throughout the workflow:

### Internal base units
- Weight values are stored in **grams (g)**.
- Volume values are stored in **milliliters (mL)**.
- Count values are stored as **individual units/items**.
- Prices are expressed per base unit, such as INR per g, INR per mL, or INR per unit.

### Supported conversions
| Unit | Base Equivalent | Dimension |
|------|-----------------|-----------|
| kg   | 1000 g          | Weight    |
| g    | 1 g             | Weight    |
| L    | 1000 mL         | Volume    |
| mL   | 1 mL            | Volume    |
| unit | 1 unit          | Count     |

### Why this matters
- Buyers enter quantities naturally, for example `2.5 kg` or `750 mL`.
- The UI calculates totals instantly and displays the correct INR amount.
- The backend stores a normalized `qty_in_base_unit` so stock management and reporting stay accurate.

## 🧱 Architecture & Data Model

The app uses a clean Next.js 14 frontend with server-side API routes, Prisma ORM, and PostgreSQL for persistent storage.

### Key relationships
- `User` owns products when registered as a seller.
- `Product` records include stock, unit dimension, and base price.
- `Order` groups buyer quotations and connects to one or more `OrderItem` entries.
- `OrderItem` preserves both the requested quantity/unit and the normalized base quantity.

### Database precision
Prisma schema values use decimal fields with high precision to avoid floating-point inaccuracies:
- Prices: `Decimal @db.Decimal(15, 4)`
- Quantities: `Decimal @db.Decimal(20, 6)`

## 🧭 Main User Experiences

### Buyer Dashboard
- Search products by name or category.
- Choose quantity and unit directly from the UI.
- See a live total price preview before submitting a quotation.
- Submit the request and wait for seller/admin confirmation.

### Seller Dashboard
- Add or update products with chemical details, stock, and measurement dimension.
- Monitor available inventory in normalized base units.
- View incoming orders and decide whether to fulfil or reject them.

### Admin Dashboard
- Review all orders and confirm or cancel quotations.
- Manage users and roles across buyers, sellers, and admins.
- Approve orders with automatic stock deduction for confirmed requests.

## 🚀 Local Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your database and auth settings:
   ```env
   DATABASE_URL="postgresql://user:password@neon-db-url:5432/aasamedchem?sslmode=require"
   AUTH_SECRET="your-secret"
   ```

3. Generate Prisma client and push your schema:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

## 🔐 Demo Credentials

| Role   | Email                     | Password   |
|--------|---------------------------|------------|
| Admin  | admin@aasamedchem.com     | admin123   |
| Seller | seller@aasamedchem.com    | seller123  |
| Buyer  | buyer@aasamedchem.com     | buyer123   |

## 📝 Notes

- The system is designed for inventory accuracy and scalable quotation handling.
- All unit conversions are handled consistently so stock updates never lose precision.
- The product and order workflows are intentionally separated for clear role-based access.

## ❤️ Contribution

If you want to extend the application, add new product categories, enhance authentication, or build richer analytics, this README is the best place to start.
