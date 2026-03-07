'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const events = {
  'saas-summit': {
    title: 'SaaS Summit Riyadh 2026',
    date: '15 مارس 2026',
    location: 'الرياض - مركز الملك عبد العزيز للمؤتمرات',
    description: 'أكبر مؤتمر للـ SaaS في منطقة الشرق الأوسط',
    organizer: 'SaudiTech Events',
    price: 'مجاني',
  },
  'techcrunch': {
    title: 'TechCrunch Disrupt',
    date: '8 أبريل 2026',
    location: 'جدة - مركز المؤتمرات',
    description: 'حدث تقني عالمي يجمع أفضل Startups',
    organizer: 'TechCrunch',
    price: '999 ريال',
  },
  'startup-grind': {
    title: 'Startup Grind KSA',
    date: '22 مايو 2026',
    location: 'الدمام - نقطة',
    description: 'تجمع رواد الأعمال والشركات الناشئة',
    organizer: 'Startup Grind',
    price: 'مجاني',
  },
  'cloud-expo': {
    title: 'Cloud Expo Saudi',
    date: '5 يونيو 2026',
    location: 'الرياض - مركز الرياض للمعارض',
    description: 'معرض التقنيات السحابية والذكاء الاصطناعي',
    organizer: 'CloudTech Arabia',
    price: '199 ريال',
  },
};

export default function EventPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id') || 'saas-summit';
  const event = events[eventId as keyof typeof events] || events['saas-summit'];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to API
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A14] via-[#0F0F1A] to-[#0A0A14] py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            العودة للرئيسية
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">{event.title}</h1>
          <p className="text-white/50">{event.description}</p>
        </div>

        {/* Event Details */}
        <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-white/40 text-sm">التاريخ</p>
              <p className="text-white font-semibold">{event.date}</p>
            </div>
            <div>
              <p className="text-white/40 text-sm">الموقع</p>
              <p className="text-white font-semibold">{event.location}</p>
            </div>
            <div>
              <p className="text-white/40 text-sm">المنظم</p>
              <p className="text-white font-semibold">{event.organizer}</p>
            </div>
            <div>
              <p className="text-white/40 text-sm">السعر</p>
              <p className="text-emerald-400 font-bold">{event.price}</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        {!submitted ? (
          <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">سجل في الفعالية</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">البريد الإلكتروني *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none"
                  placeholder="+966 55 123 4567"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">الشركة</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none"
                  placeholder="اسم شركتك"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">المسمى الوظيفي</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none"
                  placeholder="مثل: CEO, Developer, Manager"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#0A0A14] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,217,165,0.3)] transition-all"
              >
                سجل الآن
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">تم التسجيل بنجاح!</h3>
            <p className="text-white/60 mb-4">سيتم إرسال تفاصيل الفعالية إلى بريدك الإلكتروني</p>
            <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
              العودة للرئيسية
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
