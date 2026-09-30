"use client";

import { useState } from "react";
import { CATEGORIES, type SearchParams } from "../lib/products";

interface ProductSearchFormProps {
  onSearch: (params?: SearchParams) => void | Promise<void>;
}

export default function ProductSearchForm({ onSearch }: ProductSearchFormProps) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ q, category });
  };

  const handleReset = () => {
    setQ("");
    setCategory("");
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-base font-semibold text-sky-600 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
        ค้นหาสินค้า
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            คำค้นหา (ชื่อสินค้า)
          </label>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ค้นหาชื่อสินค้า..."
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            หมวดหมู่
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-700 bg-white"
          >
            <option value="">ทั้งหมด</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          ล้างการค้นหา
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-xs font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-xl transition-colors"
        >
          ค้นหา
        </button>
      </div>
    </form>
  );
}