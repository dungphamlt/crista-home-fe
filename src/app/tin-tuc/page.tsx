import { api, endpoints } from '@/lib/api';
import { PLACEHOLDER_IMAGES } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Tin tức - Crista Home',
  description: 'Tin tức và bài viết về đồ gia dụng, thủy tinh, gốm sứ',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = '1' } = await searchParams;
  let data: { data: { _id: string; title: string; slug: string; excerpt?: string; thumbnail?: string }[]; totalPages: number } = {
    data: [],
    totalPages: 1,
  };
  try {
    const res = await api.get(endpoints.blogs(parseInt(page, 10)));
    data = res.data;
  } catch {
    // fallback
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Tin tức</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((post) => (
          <Link
            key={post._id}
            href={`/tin-tuc/${post.slug}`}
            className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
          >
            <div className="aspect-video relative">
              <Image
                src={post.thumbnail || PLACEHOLDER_IMAGES.blog}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold group-hover:text-primary-600 line-clamp-2">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
      {data.data.length === 0 && (
        <p className="text-center py-12 text-gray-500">Chưa có bài viết nào.</p>
      )}
      {data.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/tin-tuc?page=${p}`}
              className={`px-4 py-2 rounded ${
                p === parseInt(page, 10)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
