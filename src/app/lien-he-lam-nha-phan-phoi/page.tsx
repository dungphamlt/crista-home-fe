import { api, endpoints } from "@/lib/api";
import type { CmsPage } from "@/types/cms-page";
import { notFound } from "next/navigation";
import { NavLinks } from "@/components/NavLinks";

/** Slug trên CMS (`/pages/slug/...`) — trùng với segment URL */
const PAGE_SLUG = "lien-he-lam-nha-phan-phoi";

export async function generateMetadata() {
  try {
    const res = await api.get(endpoints.pageBySlug(PAGE_SLUG));
    const page = res.data as CmsPage | null | undefined;
    if (!page?.name) {
      return { title: "Liên hệ làm nhà phân phối - Crista Home" };
    }
    return {
      title: `${page.name} - Crista Home`,
      description:
        page.metaDescription ||
        (page.content
          ? page.content.replace(/<[^>]+>/g, "").slice(0, 160)
          : undefined),
    };
  } catch {
    return { title: "Liên hệ làm nhà phân phối - Crista Home" };
  }
}

async function getPage(): Promise<CmsPage | null> {
  try {
    const res = await api.get(endpoints.pageBySlug(PAGE_SLUG));
    return res.data as CmsPage;
  } catch {
    return null;
  }
}

export default async function DistributorContactPage() {
  const page = await getPage();
  if (!page) notFound();

  return (
    <article className="container pt-8 pb-12 md:pb-20">
      <NavLinks
        items={[
          { label: "Trang chủ", href: "/" },
          {
            label: "Liên hệ làm nhà phân phối",
            href: "/lien-he-lam-nha-phan-phoi",
            variant: "emphasis",
          },
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
