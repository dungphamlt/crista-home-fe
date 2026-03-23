import { api, endpoints } from "@/lib/api";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";
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
        <NavLinks
          className="dark:text-gray-400"
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Tin tức", href: "/tin-tuc", variant: "emphasis" },
            { label: post.title },
          ]}
        />
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div
          className="prose dark:prose-invert max-w-none ck-content"
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
