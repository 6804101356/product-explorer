"use client";

import { useState, useEffect } from "react";
import { CATEGORIES, type Product, type ProductDraft } from "../lib/products";

interface ProductFormProps {
  onSuccess: (draft: ProductDraft) => void | Promise<void>;
  initialValues?: Product;
  onCancel?: () => void;
}

export default function ProductForm({
  onSuccess,
  initialValues,
  onCancel,
}: ProductFormProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setPrice(String(initialValues.price));
      setStock(String(initialValues.stock));
      setCategory(initialValues.category);
    } else {
      setTitle("");
      setPrice("");
      setStock("");
      setCategory("");
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      title,
      price: Number(price),
      stock: Number(stock),
      category,
    });
    if (!initialValues) {
      setTitle("");
      setPrice("");
      setStock("");
      setCategory("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            ชื่อสินค้า
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="เช่น iPhone 15 Pro"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            ราคา ($)
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            จำนวนคงเหลือ
          </label>
          <input
            type="number"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            หมวดหมู่
          </label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 bg-white"
          >
            <option value="">เลือกหมวดหมู่</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            ยกเลิก
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-xl transition-colors"
        >
          {initialValues ? "บันทึกการแก้ไข" : "บันทึกสินค้า"}
        </button>
      </div>
    </form>
  );
}