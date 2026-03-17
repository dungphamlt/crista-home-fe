'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PLACEHOLDER_IMAGES } from '@/lib/constants';
import { useCart } from '@/lib/cart-context';

interface ProductDetailProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    price: number;
    compareAtPrice?: number;
    images?: string[];
    variants?: { name: string; value?: string; image?: string }[];
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images?.[0] || selectedVariant?.image || PLACEHOLDER_IMAGES.product);

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      productName: product.name,
      slug: product.slug,
      price: product.price,
      quantity,
      image: mainImage,
      variantName: selectedVariant?.name,
    });
  };

  const images = product.images?.length
    ? product.images
    : [PLACEHOLDER_IMAGES.product];

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 shrink-0 relative rounded border-2 ${
                  mainImage === img ? 'border-primary-600' : 'border-transparent'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover rounded" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-primary-600 dark:text-primary-400 text-2xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-gray-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.variants && product.variants.length > 0 && (
            <div>
              <label className="block font-medium mb-2">Chọn biến thể</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => {
                      setSelectedVariant(v);
                      if (v.image) setMainImage(v.image);
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedVariant?.name === v.name
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <label className="font-medium">Số lượng</label>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-16 text-center border-x dark:bg-gray-800"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition"
          >
            Thêm vào giỏ hàng
          </button>

          {product.description && (
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="font-semibold">Mô tả</h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
