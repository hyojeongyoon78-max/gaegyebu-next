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
    <div className="bg-white rounded-2xl border border-gray-100 p-6">

      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{monthLabel} 내역</p>
        <button onClick={handleClear} className="text-xs text-gray-300 hover:text-rose-400 transition-colors">
          전체 삭제
        </button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        <button
          onClick={() => onFilterCat(null)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
            activeCategory === null
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          전체
        </button>
        {allCats.map(c => (
          <button
            key={c.name}
            onClick={() => onFilterCat(c.name)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeCategory === c.name
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {/* 목록 */}
      {txs.length === 0 ? (
        <p className="text-center text-gray-300 py-10 text-sm">내역이 없습니다</p>
      ) : (
        <ul className="space-y-0">
          {txs.map((t, i) => {
            const cat = t.category ? getCat(t.category) : null;
            return (
              <li
                key={t.id}
                className={`flex items-center gap-4 py-3.5 ${i !== txs.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                {/* 아이콘 */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${
                  t.type === 'income' ? 'bg-emerald-50' : 'bg-rose-50'
                }`}>
                  {t.type === 'income' ? '↑' : '↓'}
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{t.desc}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{t.date}</span>
                    {cat && (
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                        style={{ background: cat.bg, color: cat.color }}
                      >
                        {cat.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* 금액 */}
                <span className={`text-sm font-semibold shrink-0 ${
                  t.type === 'income' ? 'text-emerald-600' : 'text-gray-800'
                }`}>
                  {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                </span>

                {/* 삭제 */}
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-gray-200 hover:text-rose-400 transition-colors text-sm shrink-0"
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
