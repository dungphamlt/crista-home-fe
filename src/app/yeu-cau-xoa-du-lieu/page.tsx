import type { Metadata } from "next";
import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";

export const metadata: Metadata = {
  title: "Yêu cầu xóa dữ liệu - Crista Home",
  description:
    "Hướng dẫn yêu cầu xóa dữ liệu tài khoản khi đăng nhập bằng Facebook tại Crista Home. Liên hệ hotline & email.",
  robots: { index: true, follow: true },
};

export default function DataDeletionRequestPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="container pt-8 pb-16 md:pb-24">
        <NavLinks
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Yêu cầu xóa dữ liệu" },
          ]}
        />

        <header className="mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-gold mb-3">
            Quyền riêng tư · Đăng nhập Facebook
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Yêu cầu xóa dữ liệu
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Trang này mô tả cách bạn có thể yêu cầu xóa dữ liệu cá nhân liên
            quan đến tài khoản Crista Home khi bạn sử dụng tính năng đăng nhập
            bằng Facebook, phù hợp với yêu cầu của Meta đối với ứng dụng tích
            hợp Facebook Login.
          </p>
        </header>

        <div className="space-y-10 md:space-y-12 text-gray-700 dark:text-gray-300">
          <section aria-labelledby="sec-1">
            <h2
              id="sec-1"
              className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
            >
              1. Phạm vi áp dụng
            </h2>
            <p className="leading-relaxed mb-3">
              Khi bạn chọn đăng nhập hoặc đăng ký bằng Facebook, chúng tôi có
              thể nhận từ Meta các thông tin mà bạn đồng ý chia sẻ theo cài đặt
              tài khoản Facebook của bạn (ví dụ: họ tên hiển thị, địa chỉ email,
              ảnh đại diện, mã định danh người dùng Facebook).
            </p>
            <p className="leading-relaxed">
              Việc xóa dữ liệu theo trang này áp dụng cho dữ liệu do Crista Home
              lưu trữ trong hệ thống của chúng tôi. Một số thông tin có thể vẫn
              tồn tại trên máy chủ của Meta theo chính sách riêng của Facebook;
              bạn có thể quản lý thêm trong phần cài đặt ứng dụng và quyền riêng
              tư trên tài khoản Facebook.
            </p>
          </section>

          <section aria-labelledby="sec-2">
            <h2
              id="sec-2"
              className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
            >
              2. Dữ liệu nào có thể được xóa
            </h2>
            <p className="leading-relaxed mb-3">
              Theo yêu cầu hợp lệ, chúng tôi có thể xóa hoặc ẩn danh hóa các dữ
              liệu liên quan đến việc đăng nhập Facebook, bao gồm (không giới
              hạn):
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Thông tin hồ sơ được đồng bộ từ Facebook;</li>
              <li>Liên kết giữa tài khoản Crista Home và Facebook;</li>
              <li>
                Dữ liệu hoạt động trên website gắn với tài khoản đó (ví dụ: giỏ
                hàng, đơn hàng nếu pháp luật cho phép xóa).
              </li>
            </ul>
            <p className="leading-relaxed mt-3 text-sm text-gray-600 dark:text-gray-400">
              Lưu ý: Thông tin cần thiết để tuân thủ pháp luật (hóa đơn, giao
              dịch đã hoàn tất) có thể được giữ trong thời hạn luật định dưới
              dạng tối thiểu cần thiết.
            </p>
          </section>

          <section aria-labelledby="sec-3">
            <h2
              id="sec-3"
              className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
            >
              3. Cách gửi yêu cầu xóa dữ liệu
            </h2>
            <p className="leading-relaxed mb-4">
              Bạn có thể gửi yêu cầu xóa dữ liệu bằng một trong các cách sau.
              Vui lòng cung cấp email đã dùng để đăng nhập hoặc số điện thoại
              liên kết để chúng tôi xác minh danh tính.
            </p>
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-5 md:p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Email
                </p>
                <a
                  href="mailto:ptcvietnam181@gmail.com?subject=Yêu%20cầu%20xóa%20dữ%20liệu%20-%20Facebook%20Login"
                  className="text-primary-600 dark:text-primary-400 hover:underline break-all"
                >
                  ptcvietnam181@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Hotline
                </p>
                <a
                  href="tel:0962453366"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  0962 45 3366
                </a>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {" "}
                  (giờ hành chính)
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Biểu mẫu liên hệ
                </p>
                <Link
                  href="/lien-he"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Trang Liên hệ
                </Link>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {" "}
                  — chọn nội dung ghi rõ &quot;Yêu cầu xóa dữ liệu Facebook
                  Login&quot;.
                </span>
              </div>
            </div>
          </section>

          <section aria-labelledby="sec-4">
            <h2
              id="sec-4"
              className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
            >
              4. Thời gian xử lý
            </h2>
            <p className="leading-relaxed">
              Sau khi xác minh thành công, chúng tôi sẽ xử lý yêu cầu trong vòng{" "}
              <strong className="text-gray-900 dark:text-white">
                30 ngày làm việc
              </strong>{" "}
              (trừ trường hợp pháp luật yêu cầu lưu trữ lâu hơn). Chúng tôi có
              thể liên hệ lại nếu cần bổ sung thông tin.
            </p>
          </section>

          <section aria-labelledby="sec-5">
            <h2
              id="sec-5"
              className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
            >
              5. Hủy liên kết Facebook
            </h2>
            <p className="leading-relaxed">
              Bạn cũng có thể gỡ quyền của ứng dụng Crista Home khỏi tài khoản
              Facebook trong phần{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                Cài đặt → Quyền riêng tư → Cài đặt ứng dụng và trang web
              </span>{" "}
              trên Facebook. Việc này ngắt kết nối đăng nhập; dữ liệu đã lưu tại
              Crista Home vẫn cần yêu cầu xóa theo mục 3 nếu bạn muốn xóa hoàn
              toàn trên hệ thống của chúng tôi.
            </p>
          </section>

          <section
            aria-labelledby="sec-6"
            className="rounded-xl border border-amber-gold/30 bg-amber-gold-light/40 dark:bg-amber-950/20 dark:border-amber-800/40 p-5 md:p-6"
          >
            <h2
              id="sec-6"
              className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
              Tóm tắt cho Facebook (Data Deletion Callback URL)
            </h2>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              URL công khai này mô tả quy trình xóa dữ liệu người dùng khi họ sử
              dụng Facebook Login tại Crista Home. Người dùng có thể gửi yêu cầu
              xóa qua email hoặc biểu mẫu liên hệ như trên; chúng tôi xác minh
              và xử lý trong thời hạn đã nêu.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
