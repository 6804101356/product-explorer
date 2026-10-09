import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { deleteProductAction } from "@/app/actions";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProductPage({ params }: DeleteProductPageProps) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(Number(id));
  if (!product) {
    notFound();
  }

  const deleteAction = deleteProductAction.bind(null, product.id);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-sky-100 shadow-sm space-y-4">
        <h1 className="text-xl font-bold text-rose-600">ยืนยันการลบ</h1>
        <p className="text-slate-700">ต้องการลบสินค้า “{product.title}” หรือไม่?</p>
        <div className="flex gap-2 justify-end">
          <Link
            href="/"
            className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
          >
            ยกเลิก
          </Link>
          <form action={deleteAction}>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-xl"
            >
              ยืนยันการลบ
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
