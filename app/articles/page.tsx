import { getArticles } from '@/lib/articles';
import { ArticlesClient } from '@/components/ArticlesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'المقالات - SaudiSaaSHub',
  description: 'تصفح أحدث المقالات والتقارير عن سوق SaaS في المملكة العربية السعودية. مقالات عن الفوترة الإلكترونية، ZATCA، PDPL، الشركات الناشئة، والتحول الرقمي.',
  keywords: ['مقالات SaaS', 'أخبار التقنية السعودية', 'شركات ناشئة', 'الفوترة الإلكترونية', 'ZATCA', 'PDPL'],
  openGraph: {
    title: 'المقالات - SaudiSaaSHub',
    description: 'تصفح أحدث المقالات والتقارير عن سوق SaaS في المملكة العربية السعودية.',
    url: 'https://saudisaashub.pages.dev/articles',
    type: 'website',
  },
  alternates: {
    canonical: 'https://saudisaashub.pages.dev/articles',
  },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return <ArticlesClient articles={articles} />;
}
