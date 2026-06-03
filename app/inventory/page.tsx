import { DashboardShell } from '@/components/layout/DashboardShell';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { mockProducts } from '@/lib/mockProducts';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export default function InventoryPage() {
  const columns = ['SKU', 'Name', 'Category', 'Stock', 'Base Price', 'Actions'];
  const rows = mockProducts.map((p) => [
    p.sku,
    p.name,
    p.category,
    `${p.stock} ${p.base_unit}`,
    `₹${p.base_price}`,
    <div className="flex gap-2" key={p.id}>
      <Button variant="outline" size="xs">Edit</Button>
      <Button variant="destructive" size="xs">Delete</Button>
    </div>,
  ]);

  // Simple add‑product form inside a modal (no real submit handling yet)
  const addProductForm = (
    <form className="space-y-4">
      <Input placeholder="Product name" />
      <Input placeholder="SKU" />
      <Select
        placeholder="Category"
        options={[
          { value: 'chem', label: 'Chemicals' },
          { value: 'lab', label: 'Laboratory Supplies' },
        ]}
      />
      <Input placeholder="Stock" type="number" />
      <Input placeholder="Base price (₹)" type="number" />
    </form>
  );

  return (
    <DashboardShell role="ADMIN">
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary">Product Inventory</h2>
          <Modal
            triggerLabel="Add Product"
            title="Add New Product"
            description="Fill in the details and click Save."
            footer={
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="default">Save</Button>
              </div>
            }
          >
            {addProductForm}
          </Modal>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <Table columns={columns} data={rows} />
        </div>
      </section>
    </DashboardShell>
  );
}
