/**
 * Script to properly add new articles to articles-data.ts
 * Usage: node scripts/add-new-articles.js
 */

const fs = require('fs');
const path = require('path');

const MARKDOWN_FILE = '/Users/walidsobhi/Downloads/16_مقالة_SEO_SaudiSaaSHub_2026.md';
const ARTICLES_FILE = path.join(__dirname, '../lib/articles-data.ts');

// Read markdown file
const markdownContent = fs.readFileSync(MARKDOWN_FILE, 'utf8');

function slugify(text) {
  if (!text) return 'article';
  return text.toLowerCase().replace(/[^\w\s\u0600-\u06FF]/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function convertToHtml(text) {
  if (!text) return '';
  let html = text
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*\*\*(.+?)\*\*\*\*/g, '<strong>$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/---+/g, '')
    .replace(/\n\n+/g, '</p><p>')
    .replace(/\n/g, '<br>');

  // Process lists properly
  let lines = html.split('<br>');
  let inList = false;
  let result = [];
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    if (line.match(/^[●■✓]\s+/) || line.match(/^[\d]+\.\s+/) || line.match(/^[أابـ]-+\s+/) || line.match(/^\d+\) /)) {
      if (!inList) { result.push('<ul>'); inList = true; }
      result.push(`<li>${line.replace(/^[●■✓]\s+/, '').replace(/^[\d]+\.\s+/, '').replace(/^[أابـ]-+\s+/, '').replace(/^\d+\)\s+/, '')}</li>`);
    } else {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(line);
    }
  }
  if (inList) result.push('</ul>');
  return result.join('<br>').replace(/^<p>/, '').replace(/<\/p>$/, '');
}

function getCategory(title) {
  if (title.includes('ذكاء') || title.includes('AI') || title.includes('ALLaM') || title.includes('ChatGPT') || title.includes('مليون')) 
    return ['الذكاء الاصطناعي', 'AI'];
  if (title.includes('أمن') || title.includes('NCA') || title.includes('PDPL') || title.includes('الفدية') || title.includes('Zero')) 
    return ['أمن سيبراني', 'الأمن'];
  if (title.includes('FinTech') || title.includes('مالية') || title.includes('محاسبة') || title.includes('آسا') || title.includes('Open') || title.includes('زاتكا')) 
    return ['التقنية المالية', 'FinTech'];
  if (title.includes('صحة') || title.includes('طبي') || title.includes('EHR') || title.includes('تطبيب') || title.includes('نفيس') || title.includes('سيها')) 
    return ['الصحة الرقمية', 'HealthTech'];
  return ['مقالات'];
}

function getFaq(title) {
  const faqs = {
    'الذكاء الاصطناعي التوليدي': [
      {q:'كم ينفق صندوق الاستثمارات العامة على الذكاء الاصطناعي؟',a:'أكثر من 40 مليار دولار في مشاريع AI'},
      {q:'ما أفضل أدوات AI للشركات السعودية؟',a:'ChatGPT، Claude، Microsoft Copilot، Azure AI Studio، ALLaM API'},
      {q:'هل AI آمن تجارياً في السعودية؟',a:'نعم، مع الالتزام بـ PDPL'}
    ],
    'ALLaM': [
      {q:'ما الفرق بين ALLaM وChatGPT؟',a:'ALLaM للغة العربية، ChatGPT للعالمي'},
      {q:'هل ALLaM مجاني؟',a:'API متاح عبر سدايا'}
    ],
    'NCA': [
      {q:'الغرامات؟',a:'تصل لـ 5 ملايين ريال'},
      {q:'MFA إلزامي؟',a:'نعم'}
    ],
    'FinTech الإسلامي': [
      {q:'BNPL حلال؟',a:'نعم هيكل مرابحة'},
      {q:'أفضل منصات؟',a:'تمارا وتابي'}
    ],
    'زاتكا': [
      {q:'متطلبات المرحلة الثانية؟',a:'تكامل API مباشر'},
      {q:'أفضل برنامج؟',a:'Zoho Books، QuickBooks، Odoo'}
    ],
    'آسا': [
      {q:'ما هو؟',a:'دفع فوري 24/7'},
      {q:'كيف أربطه؟',a:'عبر HyperPay، Moyasar، PayTabs'}
    ],
    'الصحة الرقمية': [
      {q:'نفيس؟',a:'سجل صحي موحد'},
      {q:'حجم السوق؟',a:'مليار دولار'}
    ]
  };
  for (const [key, f] of Object.entries(faqs)) { if (title.includes(key)) return f; }
  return [{q:'ما الهدف؟',a:'دليل شامل'}, {q:'كيف أبدأ؟',a:'حدد احتياجك'}];
}

function buildFaqHtml(faqs) {
  return '<div class="faq-section"><h2>الأسئلة الشائعة</h2>' + 
    faqs.map(f => `<div class="faq-item"><h3>❓ ${f.q}</h3><p>${f.a}</p></div>`).join('') + '</div>';
}

// Parse articles
const articleBlocks = markdownContent.split(/(?:^|\n)## المقالة \d+\/\d+/g);
const articles = [];

for (let i = 1; i < articleBlocks.length; i++) {
  const block = articleBlocks[i];
  const titleMatch = block.match(/### العنوان \(H1\):\s*[\*]*([^\n\*]+)[\*]*/);
  if (!titleMatch) continue;

  const title = titleMatch[1].trim();
  const descMatch = block.match(/### Meta Description[^\n]*:\s*([^\n]+)/);
  const description = descMatch ? descMatch[1].trim() : title.substring(0, 150);

  // Extract sections - REMOVE the hook prefix
  const hookMatch = block.match(/### 🎙️ الهوك[^]+?(?=###|\n\n)/);
  const hook = hookMatch ? hookMatch[0].replace(/### 🎙️ الهوك[^]*?\n/, '').trim() : '';
  
  const introMatch = block.match(/### المقدمة:[^]+?(?=###)/);
  const intro = introMatch ? introMatch[0].replace(/### المقدمة:\n/, '').trim() : '';
  
  const sections = [];
  for (const sectionName of ['أولاً', 'ثانياً', 'ثالثاً', 'رابعاً', 'خامساً']) {
    const match = block.match(new RegExp(`### ${sectionName}:[^]+?(?=###|$)`));
    if (match) {
      sections.push(convertToHtml(match[0].replace(`### ${sectionName}:\n`, '').trim()));
    }
  }
  
  const conclusionMatch = block.match(/### الخاتمة:[^]+?(?=#|$)/);
  const conclusion = conclusionMatch ? conclusionMatch[0].replace(/### الخاتمة:\n/, '').trim() : '';

  // Build HTML - hook goes directly WITHOUT prefix
  let html = `<h1>${title}</h1>`;
  if (hook) html += `<p class="hook">${convertToHtml(hook)}</p>`;
  if (intro) html += `<div class="intro">${convertToHtml(intro)}</div>`;
  html += sections.join('');
  if (conclusion) html += `<div class="conclusion">${convertToHtml(conclusion)}</div>`;
  html += buildFaqHtml(getFaq(title));

  const wordCount = html.length / 5;
  articles.push({
    title,
    slug: slugify(title),
    content: html,
    excerpt: description.substring(0,150) + '...',
    date: new Date().toISOString(),
    categories: getCategory(title),
    author: 'Saudi SaaS Hub Team',
    readingTime: Math.max(10, Math.ceil(wordCount / 800))
  });
}

console.log(`✓ Parsed ${articles.length} articles`);

// Read existing file
let articlesData = fs.readFileSync(ARTICLES_FILE, 'utf8');

// Remove import line temporarily
const importLine = "import { additionalArticles } from './new-articles';\n";
articlesData = articlesData.replace(importLine, '');

// Find the end of articles array - the "];"
const exportEnd = '];';
const insertPos = articlesData.lastIndexOf(exportEnd);

if (insertPos === -1) {
  console.error('Could not find end of articles array');
  process.exit(1);
}

// Build new articles as proper JSON with commas
const articlesJson = articles.map(a => 
  `  {\n    title: "${a.title.replace(/"/g, '\\"')}",\n    slug: "${a.slug}",\n    content: \`${a.content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,\n    excerpt: "${a.excerpt.replace(/"/g, '\\"')}",\n    date: "${a.date}",\n    categories: ${JSON.stringify(a.categories)},\n    author: "${a.author}",\n    readingTime: ${a.readingTime}\n  }`
).join(',\n\n');

// Insert before the closing bracket
const newContent = articlesData.substring(0, insertPos) + ',\n\n' + articlesJson + '\n];';

// Add import back
const finalContent = importLine + newContent;

fs.writeFileSync(ARTICLES_FILE, finalContent);
console.log(`✓ Added ${articles.length} articles to articles-data.ts`);
