import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';

export async function GET() {
  try {
    const articles = await getArticles();

    // Return all article data for homepage
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ articles: [] });
  }
}
