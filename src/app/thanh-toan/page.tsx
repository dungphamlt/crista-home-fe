'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { api, endpoints } from '@/lib/api';
import { PLACEHOLDER_IMAGES } from '@/lib/constants';

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    note: '',
    shippingFee: 0,
  });

  const finalTotal = Math.max(0, total + form.shippingFee - couponDiscount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const res = await api.get(endpoints.validateCoupon(couponCode.trim(), total));
      if (res.data.valid) {
        setCouponDiscount(res.data.discount);
      } else {
        alert('Mã giảm giá không hợp lệ');
      }
    } catch {
      alert('Không thể kiểm tra mã giảm giá');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Giỏ hàng trống');
      return;
    }
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        product: i.productId,
        productName: i.productName,
        variantName: i.variantName,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      }));
      const orderRes = await api.post(endpoints.orders(), {
        items: orderItems,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerEmail: form.customerEmail,
        customerAddress: form.customerAddress,
        note: form.note,
        shippingFee: form.shippingFee,
        couponCode: couponDiscount > 0 ? couponCode : undefined,
      });
      const orderCode = orderRes.data?.orderCode;
      clearCart();
      router.push(orderCode ? `/don-hang?code=${orderCode}` : '/don-hang');
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Có lỗi xảy ra';
      alert(msg || 'Đặt hàng thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="container py-16 text-center">
        <p className="text-xl text-gray-500 mb-6">Giỏ hàng trống. Vui lòng thêm sản phẩm.</p>
        <Link href="/san-pham" className="text-primary-600 hover:underline font-medium">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Thanh toán</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Họ tên *</label>
            <input
              required
              value={form.customerName}
              onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Số điện thoại *</label>
            <input
              required
              type="tel"
              value={form.customerPhone}
              onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Email *</label>
            <input
              required
              type="email"
              value={form.customerEmail}
              onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Địa chỉ giao hàng *</label>
            <textarea
              required
              rows={3}
              value={form.customerAddress}
              onChange={(e) => setForm((f) => ({ ...f, customerAddress: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Phí vận chuyển (VNĐ)</label>
            <input
              type="number"
              min={0}
              value={form.shippingFee || ''}
              onChange={(e) => setForm((f) => ({ ...f, shippingFee: parseInt(e.target.value, 10) || 0 }))}
              placeholder="0 hoặc để trống"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Ghi chú</label>
            <textarea
              rows={2}
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
            <h3 className="font-semibold mb-4">Đơn hàng của bạn</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantName || ''}`} className="flex gap-3">
                  <div className="w-12 h-12 relative shrink-0 rounded overflow-hidden">
                    <img
                      src={item.image || PLACEHOLDER_IMAGES.product}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-2">{item.productName}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-medium shrink-0">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t space-y-2">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(form.shippingFee)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Mã giảm giá"
                  className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                >
                  Áp dụng
                </button>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Tổng cộng</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold rounded-lg transition"
            >
              {loading ? 'Đang xử lý...' : 'Đặt hàng (COD)'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
