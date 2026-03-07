'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const calculators = {
  mrr: {
    title: 'حساب MRR',
    description: 'احسب الإيرادات الشهرية المتكررة',
    inputs: [
      { name: 'customers', label: 'عدد العملاء', placeholder: 'عدد العملاء المشتركين' },
      { name: 'arpu', label: 'متوسط revenue لكل عميل', placeholder: 'المبلغ الشهري لكل عميل' },
    ],
    calculate: (inputs: Record<string, string>) => {
      const customers = parseFloat(inputs.customers || '0');
      const arpu = parseFloat(inputs.arpu || '0');
      return customers * arpu;
    },
  },
  churn: {
    title: 'حساب churn Rate',
    description: 'احسب معدل فقدان العملاء',
    inputs: [
      { name: 'lostCustomers', label: 'عدد العملاء المفقودين', placeholder: 'عدد العملاء الذين غادروا' },
      { name: 'totalCustomers', label: 'إجمالي العملاء', placeholder: 'إجمالي العملاء في البداية' },
    ],
    calculate: (inputs: Record<string, string>) => {
      const lost = parseFloat(inputs.lostCustomers || '0');
      const total = parseFloat(inputs.totalCustomers || '1');
      return (lost / total) * 100;
    },
  },
  ltv: {
    title: 'حساب LTV',
    description: 'احسب قيمة العميل Lifetime',
    inputs: [
      { name: 'arpu', label: 'متوسط revenue شهري', placeholder: 'المبلغ الشهري' },
      { name: 'months', label: 'متوسط فترة الاشتراك', placeholder: 'عدد الأشهر' },
      { name: 'margin', label: 'هامش الربح %', placeholder: 'نسبة الهامش' },
    ],
    calculate: (inputs: Record<string, string>) => {
      const arpu = parseFloat(inputs.arpu || '0');
      const months = parseFloat(inputs.months || '0');
      const margin = parseFloat(inputs.margin || '100') / 100;
      return arpu * months * margin;
    },
  },
  cac: {
    title: 'حساب CAC',
    description: 'احسب تكلفة اكتساب العميل',
    inputs: [
      { name: 'marketingSpend', label: 'إجمالي الإنفاق التسويقي', placeholder: 'مبلغ الإنفاق' },
      { name: 'newCustomers', label: 'العملاء الجدد', placeholder: 'عدد العملاء الجدد' },
    ],
    calculate: (inputs: Record<string, string>) => {
      const spend = parseFloat(inputs.marketingSpend || '0');
      const customers = parseFloat(inputs.newCustomers || '1');
      return spend / customers;
    },
  },
  roi: {
    title: 'حساب ROI',
    description: 'احسب العائد على الاستثمار',
    inputs: [
      { name: 'revenue', label: 'الإيرادات', placeholder: 'إجمالي الإيرادات' },
      { name: 'cost', label: 'التكلفة', placeholder: 'إجمالي التكلفة' },
    ],
    calculate: (inputs: Record<string, string>) => {
      const revenue = parseFloat(inputs.revenue || '0');
      const cost = parseFloat(inputs.cost || '1');
      return ((revenue - cost) / cost) * 100;
    },
  },
  burn: {
    title: 'حساب Burn Rate',
    description: 'احسب معدل حرق التمويل',
    inputs: [
      { name: 'cash', label: 'النقد المتبقي', placeholder: 'مبلغ النقد المتبقي' },
      { name: 'monthlySpend', label: 'الإنفاق الشهري', placeholder: 'مبلغ الإنفاق الشهري' },
    ],
    calculate: (inputs: Record<string, string>) => {
      const cash = parseFloat(inputs.cash || '0');
      const spend = parseFloat(inputs.monthlySpend || '1');
      return cash / spend;
    },
  },
};

export default function CalculatorPage() {
  const searchParams = useSearchParams();
  const calcType = searchParams.get('type') || 'mrr';
  const calc = calculators[calcType as keyof typeof calculators] || calculators.mrr;

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleCalculate = () => {
    const value = calc.calculate(inputs);
    setResult(value);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to API
    setEmailSent(true);
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
          <h1 className="text-4xl font-bold text-white mb-4">{calc.title}</h1>
          <p className="text-white/50">{calc.description}</p>
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {Object.entries(calculators).map(([key, c]) => (
            <Link
              key={key}
              href={`/calculators?type=${key}`}
              className={`p-4 rounded-xl border text-center transition-all ${
                calcType === key
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : 'bg-white/5 border-white/10 text-white/60 hover:border-emerald-500/30'
              }`}
            >
              <span className="block text-lg font-bold">{c.title}</span>
            </Link>
          ))}
        </div>

        {/* Input Form */}
        <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calc.inputs.map((input) => (
              <div key={input.name}>
                <label className="block text-white/70 text-sm mb-2">{input.label}</label>
                <input
                  type="number"
                  placeholder={input.placeholder}
                  value={inputs[input.name] || ''}
                  onChange={(e) => setInputs({ ...inputs, [input.name]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleCalculate}
            className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#0A0A14] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,217,165,0.3)] transition-all"
          >
            احسب الآن
          </button>
        </div>

        {/* Result */}
        {result !== null && (
          <div className="bg-white/[0.02] border border-emerald-500/30 rounded-2xl p-8 mb-8">
            <h3 className="text-white/70 text-sm mb-2 text-center">النتيجة</h3>
            <p className="text-5xl font-bold text-center text-emerald-400">
              {result.toLocaleString('ar-SA', { maximumFractionDigits: 2 })}
              {calcType === 'churn' || calcType === 'roi' ? '%' : ''}
              {calcType === 'burn' ? ' شهر' : ''}
            </p>
          </div>
        )}

        {/* Email Subscription */}
        {result !== null && !emailSent && (
          <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8">
            <h3 className="text-white font-bold mb-4 text-center">احصل على النتائج في بريدك</h3>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all"
              >
                إرسال
              </button>
            </form>
          </div>
        )}

        {emailSent && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
            <p className="text-emerald-400 font-bold">تم إرسال النتائج إلى بريدك الإلكتروني!</p>
          </div>
        )}
      </div>
    </div>
  );
}
