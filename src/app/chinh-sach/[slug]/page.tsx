import { api, endpoints } from "@/lib/api";
import type { CmsPage } from "@/types/cms-page";
import { notFound } from "next/navigation";
import { NavLinks } from "@/components/NavLinks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const res = await api.get(endpoints.pageBySlug(slug));
    const page = res.data;
    if (!page) return { title: "Chính sách - Crista Home" };
    return {
      title: `${page.name} - Crista Home`,
      description:
        page.metaDescription ||
        (page.content
          ? page.content.replace(/<[^>]+>/g, "").slice(0, 160)
          : undefined),
    };
  } catch {
    return { title: "Chính sách - Crista Home" };
  }
}

async function getPageBySlug(slug: string): Promise<CmsPage | null> {
  try {
    const res = await api.get(endpoints.pageBySlug(slug));
    return res.data as CmsPage;
  } catch {
    return null;
  }
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <article className="container pt-8 pb-12 md:pb-20">
      <NavLinks
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Chính sách" },
          { label: page.name },
        ]}
      />

      {page.content ? (
        <div
          className="prose dark:prose-invert max-w-none ck-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Chưa có nội dung</p>
      )}
    </article>
  );
}
