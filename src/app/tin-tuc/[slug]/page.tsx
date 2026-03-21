import { api, endpoints } from "@/lib/api";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const res = await api.get(endpoints.blogBySlug(slug));
    const post = res.data;
    return {
      title: `${post?.title || "Tin tức"} - Crista Home`,
      description: post?.excerpt || post?.content?.slice(0, 160),
    };
  } catch {
    return { title: "Tin tức - Crista Home" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const res = await api.get(endpoints.blogBySlug(slug));
    const post = res.data;
    if (!post) notFound();

    return (
      <article className="container pt-8 pb-12 md:pb-20">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/tin-tuc">Tin tức</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{post.title}</span>
        </nav>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.thumbnail && (
          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
        {!post.content && post.excerpt && (
          <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
        )}
      </article>
    );
  } catch {
    notFound();
  }
}
