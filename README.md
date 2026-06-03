# 🧪 AasaMedChem — Inventory & Order Management System

AasaMedChem is a complete inventory and quotation platform built for chemical suppliers, lab procurement teams, and administrators who need precise, unit-aware stock controls.

## 🌟 Overview

AasaMedChem supports three distinct roles with specialized dashboards:
- **Buyer**: Browse available chemical products, submit quotations, and track order status.
- **Seller**: Add and manage products, update inventory, and review incoming buyer requests.
- **Admin**: Oversee users, manage approvals, and control the full order lifecycle.

This system emphasizes accuracy by normalizing quantities into base units for storage while allowing flexible unit input at the UI layer.

## 🚩 Core Features

### Buyer Functionality
- Browse and filter products by name, category, and availability.
- Choose quantity with unit selection (kg, g, L, mL, unit).
- View live total price calculations before submitting a quotation.
- Submit quotation requests without modifying stock until approval.
- Track order status and see seller/admin confirmations.

### Seller Functionality
- Add new products with SKU, category, price, stock, and unit dimension.
- Manage inventory in base units with consistent stock tracking.
- View all incoming orders for seller-owned products.
- See order status and quotation details for each request.
- Approve or reject customer requests at the product/order level.

### Admin Functionality
- View all products, orders, and user accounts across the platform.
- Approve, confirm, or cancel orders and quotations.
- Manage user roles: buyer, seller, admin.
- Confirming an order automatically deducts base-unit stock.
- Keep the system consistent by applying approval rules centrally.

### Unit-Conscious Inventory
- Weight values stored internally as **grams (g)**.
- Volume values stored internally as **milliliters (mL)**.
- Count-based items stored as **units/items**.
- Price stored as INR per base unit.
- UI conversions keep buyer experience simple while preserving backend accuracy.

## 🔧 Functional Workflows

### Buyer Workflow
1. Login as a buyer.
2. Browse the product catalog.
3. Select quantity and unit for a chemical item.
4. Preview the total price in INR.
5. Submit the quotation request.
6. Wait for admin/seller approval or cancellation.
7. View order history and current status.

### Seller Workflow
1. Login as a seller.
2. Add new products with SKU, stock levels, base price, and unit type.
3. Monitor inventory in normalized units.
4. Review incoming quotations submitted by buyers.
5. Provide fulfillment updates or await admin confirmation.
6. Track status changes for each order.

### Admin Workflow
1. Login as an admin.
2. Review all quotations and orders in the admin dashboard.
3. Approve or cancel requests from buyers.
4. Confirm orders, which deducts the base-unit stock from product inventory.
5. Manage users and assign roles.
6. Keep the entire platform synchronized between buyers and sellers.

## 🧠 Unit Conversion System

This app stores quantities in normalized base units to avoid mismatched inventory totals.

### Supported units and base conversion
| Unit | Base Equivalent | Dimension |
|------|-----------------|-----------|
| kg   | 1000 g          | Weight    |
| g    | 1 g             | Weight    |
| L    | 1000 mL         | Volume    |
| mL   | 1 mL            | Volume    |
| unit | 1 unit          | Count     |

### Why it matters
- Preserves inventory accuracy.
- Avoids floating-point rounding errors.
- Allows consistent stock deductions on confirmed orders.
- Makes price previews reliable across unit types.

## 🧱 Technical Architecture

- **Frontend**: Next.js 14 with app router and React.
- **Styling**: Tailwind CSS plus custom theme variables.
- **Auth**: NextAuth with role-based access control.
- **ORM**: Prisma for PostgreSQL data modelling.
- **Database**: Neon PostgreSQL for cloud-hosted storage.

### Key data model entities
- `User`: Stores authentication and role metadata.
- `Product`: Stores item details, stock, unit dimension, and pricing.
- `Order`: Stores buyer quotations and overall order metadata.
- `OrderItem`: Stores requested quantity, selected unit, base quantity, and price breakdown.

### Schema design points
- Prices use `Decimal @db.Decimal(15, 4)` for currency safety.
- Quantities use `Decimal @db.Decimal(20, 6)` for precision.
- Orders are linked to users and product items to preserve traceability.

## 🗺️ App Pages & Routes

- `/login` — Login page for all users.
- `/register` — Sign-up page with role selection.
- `/dashboard` — Role-specific landing page.
- `/products` — Product catalog and search.
- `/inventory` — Inventory management interface.
- `/orders` — Order and quotation management.
- `/api/*` — REST API routes for auth, products, orders, and user actions.

## 🚀 Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with required variables:
   ```env
   DATABASE_URL="postgresql://user:password@neon-db-url:5432/aasamedchem?sslmode=require"
   AUTH_SECRET="your-secret"
   ```

3. Initialize Prisma and the database:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000`.

## 🔐 Demo Credentials

| Role   | Email                     | Password   |
|--------|---------------------------|------------|
| Admin  | admin@aasamedchem.com     | admin123   |
| Seller | seller@aasamedchem.com    | seller123  |
| Buyer  | buyer@aasamedchem.com     | buyer123   |

## 📝 Notes for Developers

- The app uses centralized unit conversion logic to keep quantity handling consistent.
- Role-based navigation ensures buyers, sellers, and admins only see their relevant workflows.
- Product stock is not decremented until an order is confirmed.
- The API and frontend are decoupled through Next.js app route handlers.

## ❤️ Contribution

If you want to extend the app, consider adding:
- analytics dashboards and reporting,
- permission-based seller workflows,
- multi-currency pricing,
- product category management,
- notification channels for order status changes.

This README is designed to describe every functional area of AasaMedChem so new contributors can get started quickly.
