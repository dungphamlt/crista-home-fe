'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, endpoints } from '@/lib/api';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

function OrderLookupContent() {
  const searchParams = useSearchParams();
  const codeFromUrl = searchParams.get('code');
  const [code, setCode] = useState(codeFromUrl || '');
  const [order, setOrder] = useState<{
    orderCode: string;
    status: string;
    items: { productName: string; variantName?: string; quantity: number; price: number }[];
    total: number;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (codeFromUrl && codeFromUrl !== code) {
      setCode(codeFromUrl);
    }
  }, [codeFromUrl]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setSearched(true);
    setOrder(null);
    try {
      const res = await api.get(endpoints.orderByCode(code.trim()));
      setOrder(res.data);
    } catch {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Nhập mã đơn hàng (vd: CR2403161234)"
          className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-medium rounded-lg"
        >
          {loading ? 'Đang tìm...' : 'Tra cứu'}
        </button>
      </form>

      {searched && !loading && !order && (
        <p className="text-center text-gray-500 py-8">Không tìm thấy đơn hàng với mã này.</p>
      )}

      {order && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Đơn hàng #{order.orderCode}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'delivered'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : order.status === 'cancelled'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              }`}
            >
              {STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
          <div>
            <h3 className="font-medium mb-2">Sản phẩm</h3>
            <ul className="space-y-2">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span>
                    {item.productName}
                    {item.variantName && ` - ${item.variantName}`} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 border-t">
            <p className="flex justify-between font-semibold">
              <span>Tổng cộng</span>
              <span>{formatPrice(order.total)}</span>
            </p>
          </div>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Người nhận: {order.customerName}</p>
            <p>Điện thoại: {order.customerPhone}</p>
            <p>Địa chỉ: {order.customerAddress}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function OrderLookupPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Tra cứu đơn hàng</h1>
      <Suspense fallback={<p className="text-gray-500">Đang tải...</p>}>
        <OrderLookupContent />
      </Suspense>
    </div>
  );
}
