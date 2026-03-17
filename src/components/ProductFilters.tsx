'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api, endpoints } from '@/lib/api';

interface ProductFiltersProps {
  searchParams: Record<string, string | undefined>;
}

export function ProductFilters({ searchParams }: ProductFiltersProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const [categories, setCategories] = useState<{ _id: string; name: string; slug: string }[]>([]);

  useEffect(() => {
    api.get(endpoints.categories()).then((res) => setCategories(res.data));
  }, []);

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(urlSearchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`/san-pham?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-24">
      <h3 className="font-semibold mb-4">Bộ lọc</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const search = (form.elements.namedItem('search') as HTMLInputElement)?.value;
          updateFilter('search', search || null);
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Tìm kiếm</label>
          <input
            type="text"
            name="search"
                defaultValue={searchParams.search ?? ''}
            placeholder="Nhập tên sản phẩm..."
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <button type="submit" className="mt-2 w-full py-2 bg-primary-600 text-white rounded-lg text-sm">
            Tìm
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Danh mục</label>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => updateFilter('category', '')}
              className={`block w-full text-left px-3 py-1.5 rounded text-sm ${
                !searchParams.category ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : ''
              }`}
            >
              Tất cả
            </button>
            {categories.map((c) => (
              <button
                key={c._id}
                type="button"
                onClick={() => updateFilter('category', c._id)}
                className={`block w-full text-left px-3 py-1.5 rounded text-sm ${
                      searchParams.category === c._id ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : ''
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Khoảng giá</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Từ"
                defaultValue={searchParams.minPrice ?? ''}
              onChange={(e) => updateFilter('minPrice', e.target.value || null)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              placeholder="Đến"
                defaultValue={searchParams.maxPrice ?? ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value || null)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
