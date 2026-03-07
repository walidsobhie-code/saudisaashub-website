'use client';

import { useState } from 'react';
import Link from 'next/link';

const events = [
  {
    id: 1,
    title: 'Saudi Tech Summit 2026',
    description: 'أكبر مؤتمر تقني في المملكة يجمع رواد الأعمال والمستثمرين',
    date: '15 - 17 مارس 2026',
    location: 'الرياض - مركز الرياض للمعارض',
    category: 'مؤتمر',
    color: 'from-emerald-500 to-teal-500',
    registerUrl: '#',
  },
  {
    id: 2,
    title: 'SaaS Founders Meetup',
    description: 'لقاء شهري لرواد مشاريع SaaS في المملكة',
    date: '22 مارس 2026',
    location: 'جدة - Hub Jeddah',
    category: 'لقاء',
    color: 'from-purple-500 to-pink-500',
    registerUrl: '#',
  },
  {
    id: 3,
    title: 'Cloud & AI Conference',
    description: 'مؤتمر التقنية السحابية والذكاء الاصطناعي',
    date: '5 أبريل 2026',
    location: 'الرياض - فندق الريتز كارلتون',
    category: 'مؤتمر',
    color: 'from-blue-500 to-cyan-500',
    registerUrl: '#',
  },
  {
    id: 4,
    title: 'Startup Pitch Night',
    description: 'ليلة عرض المشاريع الناشئة أمام المستثمرين',
    date: '12 أبريل 2026',
    location: 'الدمام - نقطة Innovation Hub',
    category: 'فعالية',
    color: 'from-orange-500 to-red-500',
    registerUrl: '#',
  },
  {
    id: 5,
    title: 'Digital Transformation Workshop',
    description: 'ورشة عمل حول التحول الرقمي للشركات',
    date: '20 أبريل 2026',
    location: 'الرياض - مركز واعد',
    category: 'ورشة عمل',
    color: 'from-yellow-500 to-amber-500',
    registerUrl: '#',
  },
  {
    id: 6,
    title: 'FinTech Saudi Forum',
    description: 'منتدى التقنية المالية في المملكة',
    date: '28 أبريل 2026',
    location: 'الرياض -Ministry of Finance HQ',
    category: 'منتدى',
    color: 'from-indigo-500 to-violet-500',
    registerUrl: '#',
  },
];

export function EventsCalendar() {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categories = ['الكل', 'مؤتمر', 'لقاء', 'ورشة عمل', 'منتدى', 'فعالية'];

  const filteredEvents = activeCategory === 'الكل'
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0A14] via-[#0F0F1A] to-[#0A0A14]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full blur-[180px] opacity-20 bg-gradient-to-r from-blue-500 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full blur-[150px] opacity-15 bg-gradient-to-r from-purple-500 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            الفعاليات القادمة
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            الأحداث <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">التقنية</span> في السعودية
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">تابعةم أحدث المؤتمرات والفعاليات التقنية في المملكة</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/8 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${event.color} text-white/90`}>
                    {event.category}
                  </span>
                  <span className="text-white/40 text-xs">{event.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>

                {/* Register Button */}
                <Link
                  href={event.registerUrl}
                  className={`inline-flex items-center justify-center w-full py-3 rounded-xl bg-gradient-to-r ${event.color} text-white font-semibold hover:shadow-lg transition-all opacity-90 hover:opacity-100`}
                >
                  تسجيل الآن
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Bottom Border */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${event.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-blue-500 hover:border-blue-500 transition-all"
          >
            أضف فعاليتك
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
