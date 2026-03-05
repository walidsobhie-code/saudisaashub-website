import { getArticles } from '@/lib/articles';
import { ArticlesClient } from '@/components/ArticlesClient';

export default async function ArticlesPage() {
  const articles = await getArticles();

  return <ArticlesClient articles={articles} />;
}
