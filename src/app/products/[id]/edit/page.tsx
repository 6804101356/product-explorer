import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { CATEGORIES } from "@/app/lib/products";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

const inputClass =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700";

export default async function EditProductPage({ params }: EditProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(Number(id));
  if (!product) {
    notFound();
  }

  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
        <h1 className="text-xl font-bold text-sky-600 mb-4">แก้ไขสินค้า</h1>
        <form action={updateAction} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-xs font-medium text-slate-600 mb-1">
              ชื่อสินค้า
            </label>
            <input id="title" name="title" defaultValue={product.title} required className={inputClass} />
          </div>
          <div>
            <label htmlFor="price" className="block text-xs font-medium text-slate-600 mb-1">
              ราคา ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={product.price}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-xs font-medium text-slate-600 mb-1">
              จำนวนคงเหลือ
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              defaultValue={product.stock}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-xs font-medium text-slate-600 mb-1">
              หมวดหมู่
            </label>
            <select
              id="category"
              name="category"
              defaultValue={product.category}
              required
              className={`${inputClass} bg-white`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <Link
              href="/"
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              ยกเลิก
            </Link>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-xl"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
