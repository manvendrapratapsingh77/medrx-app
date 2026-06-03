# 🧪 AasaMedChem — Inventory & Order Management System

A premium Inventory & Order Management System built with Next.js 14, Neon PostgreSQL, and Prisma ORM.

## 📦 Core Unit System & Storage Strategy

This system implements a precision-focused unit storage strategy to ensure consistency across all dimensions.

### Storage Logic
- **Weight**: All values stored internally in **grams (g)**.
- **Volume**: All values stored internally in **milliliters (mL)**.
- **Count**: Stored as **unit/item** (no conversion).
- **Price**: Per base unit (INR per g, per mL, or per unit).

### Conversion Constants
| Unit | Factor (to base) | Dimension |
|------|------------------|-----------|
| kg   | 1000             | Weight    |
| g    | 1                | Weight    |
| L    | 1000             | Volume    |
| mL   | 1                | Volume    |
| unit | 1                | Count     |

### Where Conversions Happen
- **UI (Buyer Dashboard)**: Live price preview converts `input_qty * CONVERSIONS[unit]` to show total in INR.
- **Order Placement**: Converted quantity is saved in `qty_in_base_unit` column.
- **Stock Management**: Stock deduction occurs in base units (g, mL, unit) upon Admin confirmation.

## 🗄️ Database Schema Justification

- **Prisma Schema**: Uses `Decimal @db.Decimal(15, 4)` for prices and `(20, 6)` for quantities to prevent floating-point errors.
- **Relationships**: 
  - `User -> Product` (One-to-Many): Sellers own products.
  - `Order -> OrderItem` (One-to-Many): Quotations contain multiple products.
  - `User -> Order` (One-to-Many): Buyers place quotations.

## 🚀 Local Setup & Neon Connection

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Setup** (.env):
   ```env
   DATABASE_URL="postgresql://user:password@neon-db-url:5432/aasamedchem?sslmode=require"
   AUTH_SECRET="your-secret"
   ```

3. **Database Migration**:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

4. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## 👥 Test Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@aasamedchem.com | admin123 |
| Seller | seller@aasamedchem.com | seller123 |
| Buyer | buyer@aasamedchem.com | buyer123 |

## 🔄 User Flows

### Buyer Flow
1. **Browse**: Search and filter products by name or category.
2. **Configure**: Select quantity and unit (e.g., 2.5 kg).
3. **Quotation**: View live INR preview and click "Add to Cart" to submit a quotation.

### Seller Flow
1. **Manage**: Add new chemicals with dimensions (Weight/Volume/Count).
2. **Monitor**: View current stock levels in base units (e.g., 5000g).
3. **View Orders**: See orders placed for your products.

### Admin Flow
1. **Approve**: Confirm or Cancel quotations.
2. **Confirm**: Confirming an order automatically deducts the calculated base unit quantity from product stock.
3. **Users**: Oversee all platform users and roles.
