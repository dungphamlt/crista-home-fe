'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { PLACEHOLDER_IMAGES } from '@/lib/constants';

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p className="text-xl text-gray-500 mb-6">Giỏ hàng trống</p>
        <Link href="/san-pham" className="text-primary-600 hover:underline font-medium">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Giỏ hàng</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variantName || ''}`}
              className="flex gap-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="w-24 h-24 relative shrink-0 rounded overflow-hidden">
                <Image
                  src={item.image || PLACEHOLDER_IMAGES.product}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/san-pham/${item.slug}`}
                  className="font-medium hover:text-primary-600 line-clamp-2"
                >
                  {item.productName}
                  {item.variantName && ` - ${item.variantName}`}
                </Link>
                <p className="text-primary-600 font-semibold mt-1">
                  {formatPrice(item.price)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex border rounded overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantName)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantName)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.variantName)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
            <h3 className="font-semibold mb-4">Tóm tắt đơn hàng</h3>
            <div className="flex justify-between mb-2">
              <span>Tạm tính</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Phí vận chuyển sẽ được tính ở bước thanh toán
            </p>
            <Link
              href="/thanh-toan"
              className="mt-6 block w-full py-3 bg-primary-600 hover:bg-primary-700 text-white text-center font-semibold rounded-lg transition"
            >
              Thanh toán
            </Link>
            <Link href="/san-pham" className="mt-4 block text-center text-primary-600 hover:underline text-sm">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
