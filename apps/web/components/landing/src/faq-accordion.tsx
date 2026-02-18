'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is DevForce free to use?',
    answer: 'Yes! DevForce offers a free tier with access to 500+ problems, basic analytics, and contest participation. We also offer a Pro plan for advanced features and unlimited problem access.',
  },
  {
    id: 'faq-2',
    question: 'What programming languages are supported?',
    answer: 'We support 15+ programming languages including Python, JavaScript, Java, C++, Go, Rust, and many more. You can switch languages seamlessly while solving problems.',
  },
  {
    id: 'faq-3',
    question: 'Can I use DevForce for interview preparation?',
    answer: 'Absolutely! DevForce is specifically designed for interview preparation. Our problems cover common interview topics, and our analytics help you identify weak areas to focus on.',
  },
  {
    id: 'faq-4',
    question: 'How often are new problems added?',
    answer: 'We add 20+ new problems every week across various categories. Premium members also get early access to new problems and exclusive problem sets.',
  },
  {
    id: 'faq-5',
    question: 'Is there a mobile app?',
    answer: 'We offer web-based responsive design that works on mobile devices. Native iOS and Android apps are in development and coming soon.',
  },
  {
    id: 'faq-6',
    question: 'How do I submit solutions in contests?',
    answer: 'During a contest, you can write your solution in our built-in editor and submit it. You\'ll get instant feedback on whether your solution is correct and how it performs relative to others.',
  },
];

export function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="group border border-zinc-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-zinc-500/50 hover:shadow-lg hover:shadow-zinc-900/10"
        >
          <button
            onClick={() => toggleItem(faq.id)}
            className="w-full px-8 py-6 flex items-center justify-between gap-4 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors duration-200"
          >
            <h3 className="font-semibold text-lg text-left text-white group-hover: transition-colors duration-200">
              {faq.question}
            </h3>
            <ChevronDown
              size={24}
              className={`flex-shrink-0 text-zinc-500 transition-transform duration-500 ${
                openId === faq.id ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Animated Answer */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openId === faq.id ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-8 py-6 bg-gradient-to-b from-zinc-800/20 to-zinc-900/40 border-t border-zinc-700/50">
              <p className="text-zinc-300 leading-relaxed text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
