import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { NewsletterPopup } from '@/components/NewsletterPopup';
import { BackToTop } from '@/components/BackToTop';

export const metadata: Metadata = {
  title: {
    default: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
    template: '%s | SaudiSaaSHub',
  },
  description: 'المصدرك الأول لأحدث أخبار وتقارير SaaS والشركات الناشئة في المملكة العربية السعودية. نقدم تحليلات السوق، مراجعات الشركات، وأدلة عملية لنمو عملك.',
  keywords: ['SaaS', 'startup', 'السعودية', 'التقنية', 'الأعمال', 'الفوترة الإلكترونية', 'ZATCA', 'PDPL', 'التحول الرقمي', 'رؤية 2030', 'SaaS السعودية', 'شركات ناشئة'],
  authors: [{ name: 'SaudiSaaSHub' }],
  creator: 'SaudiSaaSHub',
  publisher: 'SaudiSaaSHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saudisaashub.pages.dev'),
  alternates: {
    canonical: 'https://saudisaashub.pages.dev',
    languages: {
      'ar': 'https://saudisaashub.pages.dev',
      'en': 'https://saudisaashub.pages.dev/en',
    },
  },
  openGraph: {
    title: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة العربية السعودية',
    description: 'المصدرك الأول لأحدث أخبار وتقارير SaaS والشركات الناشئة في المملكة العربية السعودية. تحليلات السوق، مراجعات الشركات، وأدلة عملية.',
    url: 'https://saudisaashub.pages.dev',
    siteName: 'SaudiSaaSHub',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'SaudiSaaSHub - المصدرك الأول لـ SaaS في المملكة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaudiSaaSHub',
    description: 'المصدرك الأول لـ SaaS في المملكة العربية السعودية',
    creator: '@SaudiSaaSHub',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00D9A5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SaudiSaaS" />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-green focus:text-background">
         _skip to content_
        </a>
        <Header />
        <SearchModal />
        <NewsletterPopup />
        <main id="main-content" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
