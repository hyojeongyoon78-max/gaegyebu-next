import type { Transaction, Category } from '@/lib/types';
import { fmt } from '@/lib/utils';

interface Props {
  transactions: Transaction[];
  monthKey: string;
  monthLabel: string;
  allCats: Category[];
  getCat: (name: string) => Category;
  activeCategory: string | null;
  onFilterCat: (name: string | null) => void;
  onDelete: (id: number) => void;
  onClearAll: () => void;
}

export function TransactionList({
  transactions, monthKey, monthLabel, allCats, getCat,
  activeCategory, onFilterCat, onDelete, onClearAll,
}: Props) {
  let txs = transactions.filter(t => t.date.startsWith(monthKey));
  if (activeCategory !== null) txs = txs.filter(t => t.category === activeCategory);

  const handleClear = () => {
    const count = transactions.filter(t => t.date.startsWith(monthKey)).length;
    if (count === 0) return;
    if (confirm(`${monthLabel} 내역을 모두 삭제할까요?`)) onClearAll();
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-slate-600">{monthLabel} 거래 내역</h2>
        <button onClick={handleClear} className="text-xs text-slate-400 hover:text-red-400 transition-colors">
          전체 삭제
        </button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => onFilterCat(null)}
          className={`px-3 py-1 rounded-full border text-xs transition-all ${
            activeCategory === null
              ? 'bg-blue-500 border-blue-500 text-white font-semibold'
              : 'border-slate-200 text-slate-500 hover:border-blue-300'
          }`}
        >
          전체
        </button>
        {allCats.map(c => (
          <button
            key={c.name}
            onClick={() => onFilterCat(c.name)}
            className={`px-3 py-1 rounded-full border text-xs transition-all ${
              activeCategory === c.name
                ? 'bg-blue-500 border-blue-500 text-white font-semibold'
                : 'border-slate-200 text-slate-500 hover:border-blue-300'
            }`}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {txs.length === 0 ? (
        <p className="text-center text-slate-400 py-8 text-sm">내역이 없습니다.</p>
      ) : (
        <ul>
          {txs.map(t => {
            const cat = t.category ? getCat(t.category) : null;
            return (
              <li key={t.id} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-none">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
                  t.type === 'income' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {t.type === 'income' ? '💰' : '💸'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{t.desc}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs text-slate-400">{t.date}</span>
                    {cat && (
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: cat.bg, color: cat.color }}
                      >
                        {cat.emoji} {cat.name}
                      </span>
                    )}
                  </div>
                </div>
                <span className={`text-sm font-bold shrink-0 ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                </span>
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-slate-300 hover:text-red-400 transition-colors text-base px-1 shrink-0"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
