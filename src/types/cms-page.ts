/** CMS page từ API `/pages/slug/:slug` */
export type CmsPage = {
  _id?: string;
  name: string;
  slug: string;
  content: string;
  metaDescription?: string;
};
