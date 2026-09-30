"use client";

import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductSearchForm from "./ProductSearchForm";
import type { Product, ProductDraft, SearchParams } from "../lib/products";

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "300 Touring",
    price: 28999.99,
    stock: 54,
    category: "Vehicle",
  },
  {
    id: 2,
    title: "Amazon Echo Plus",
    price: 99.99,
    stock: 61,
    category: "Mobile-Accessories",
  },
  {
    id: 3,
    title: "American Football",
    price: 19.99,
    stock: 53,
    category: "Sports-Accessories",
  },
  {
    id: 4,
    title: "Annibale Colombo Bed",
    price: 18999.99,
    stock: 88,
    category: "Furniture",
  },
  {
    id: 5,
    title: "Annibale Colombo Sofa",
    price: 2499.99,
    stock: 60,
    category: "Furniture",
  },
  {
    id: 6,
    title: "Apple",
    price: 1.99,
    stock: 8,
    category: "Groceries",
  },
  {
    id: 7,
    title: "Apple Airpods",
    price: 129.99,
    stock: 25,
    category: "Mobile-Accessories",
  },
];

export default function ProductExplorer() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [editingItem, setEditingItem] = useState<Product | null>(null);

  const loadProducts = (params?: SearchParams) => {
    if (!params || (!params.q && !params.category)) {
      setProducts(INITIAL_PRODUCTS);
      return;
    }

    let filtered = [...INITIAL_PRODUCTS];

    if (params.q) {
      const query = params.q.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(query)
      );
    }

    if (params.category) {
      filtered = filtered.filter((p) => p.category === params.category);
    }

    setProducts(filtered);
  };

  const saveProduct = (draft: ProductDraft) => {
    if (editingItem) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...draft } : item
        )
      );
      setEditingItem(null);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...draft,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-sky-600 flex items-center gap-2">
            📦 Product Explorer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            ค้นหาและจัดการรายการสินค้า
          </p>
        </div>
        <button
          onClick={() => setProducts(INITIAL_PRODUCTS)}
          className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-lg transition-colors"
        >
          🔄 รีเซ็ตข้อมูล
        </button>
      </div>

      {/* ค้นหาสินค้า */}
      <section className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
        <ProductSearchForm onSearch={(params) => loadProducts(params)} />
      </section>

      {/* เพิ่ม / แก้ไขสินค้า */}
      <section className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
        <h2 className="text-base font-semibold text-sky-600 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
          {editingItem ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
        </h2>
        <ProductForm
          onSuccess={(draft) => saveProduct(draft)}
          initialValues={editingItem ?? undefined}
          onCancel={() => setEditingItem(null)}
        />
      </section>

      {/* รายการสินค้า */}
      <section className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-sky-100 bg-sky-50/60 text-sky-800 text-xs font-semibold uppercase tracking-wider">
                <th className="p-3.5">ชื่อสินค้า</th>
                <th className="p-3.5">ราคา ($)</th>
                <th className="p-3.5">คงเหลือ</th>
                <th className="p-3.5">หมวดหมู่</th>
                <th className="p-3.5 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-50 text-sm">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    ไม่พบข้อมูลสินค้า
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-sky-50/30 transition-colors">
                    <td className="p-3.5 font-medium text-slate-700">{p.title}</td>
                    <td className="p-3.5 font-semibold text-sky-600">${p.price}</td>
                    <td className="p-3.5 text-slate-600">{p.stock}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 bg-sky-100 text-sky-700 text-xs rounded-md font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-center space-x-2">
                      <button
                        onClick={() => setEditingItem(p)}
                        className="px-2.5 py-1 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded transition-colors"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="px-2.5 py-1 text-xs bg-rose-500 hover:bg-rose-600 text-white rounded transition-colors"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}