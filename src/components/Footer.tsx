import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              CRISTA HOME
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Đồ gia dụng gia đình hiện đại, tinh giản và bền bỉ
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Liên kết</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/san-pham" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/gio-hang" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                  Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Chính sách</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li>Giao hỏa tốc nội thành 4h</li>
              <li>Đổi trả miễn phí 30 ngày</li>
              <li>Hỗ trợ 24/7</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li>181 Nguyễn Lương Bằng, Đống Đa, Hà Nội</li>
              <li>Hotline: 0962 45 3366</li>
              <li>ptcvietnam181@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Crista Home. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
