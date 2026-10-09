import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "./auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  const isLoggedIn = Boolean(session?.user);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-sky-600">📦 Product Explorer</h1>
            <p className="text-sm text-slate-400 mt-1">ดูและจัดการรายการสินค้า</p>
          </div>
          <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
        </header>

        <section className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-sky-100 bg-sky-50/60 text-sky-800 text-xs font-semibold uppercase tracking-wider">
                  <th className="p-3.5">ชื่อสินค้า</th>
                  <th className="p-3.5">ราคา ($)</th>
                  <th className="p-3.5">คงเหลือ</th>
                  <th className="p-3.5">หมวดหมู่</th>
                  {isLoggedIn && <th className="p-3.5 text-center">จัดการ</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50 text-sm">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={isLoggedIn ? 5 : 4} className="p-8 text-center text-slate-400">
                      ไม่มีสินค้า
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} data-testid="product" className="hover:bg-sky-50/30">
                      <td className="p-3.5 font-medium text-slate-700">{product.title}</td>
                      <td className="p-3.5 font-semibold text-sky-600">${product.price}</td>
                      <td className="p-3.5 text-slate-600">{product.stock}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 bg-sky-100 text-sky-700 text-xs rounded-md font-medium">
                          {product.category}
                        </span>
                      </td>
                      {isLoggedIn && (
                        <td className="p-3.5 text-center space-x-2">
                          <Link
                            href={`/products/${product.id}/edit`}
                            className="px-2.5 py-1 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded"
                          >
                            แก้ไข
                          </Link>
                          <Link
                            href={`/products/${product.id}/delete`}
                            className="px-2.5 py-1 text-xs bg-rose-500 hover:bg-rose-600 text-white rounded"
                          >
                            ลบ
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
