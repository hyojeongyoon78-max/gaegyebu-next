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
    <div className="bg-amber-50 border border-amber-200 rounded-sm p-6 shadow-sm">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <p className="font-display text-xs tracking-[0.2em] uppercase" style={{ color: '#a07850' }}>
          {monthLabel} 내역
        </p>
        <button
          onClick={handleClear}
          className="font-body text-xs transition-colors"
          style={{ color: '#d4c9b5' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#8b3a2a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#d4c9b5')}
        >
          전체 삭제
        </button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        <button
          onClick={() => onFilterCat(null)}
          className="px-3 py-1 rounded-sm text-xs font-body transition-all"
          style={activeCategory === null
            ? { background: '#6b4c2a', color: '#fef9f0', border: '1px solid #6b4c2a' }
            : { background: 'transparent', color: '#a07850', border: '1px solid #d4c9b5' }
          }
        >
          전체
        </button>
        {allCats.map(c => (
          <button
            key={c.name}
            onClick={() => onFilterCat(c.name)}
            className="px-3 py-1 rounded-sm text-xs font-body transition-all"
            style={activeCategory === c.name
              ? { background: '#6b4c2a', color: '#fef9f0', border: '1px solid #6b4c2a' }
              : { background: 'transparent', color: '#a07850', border: '1px solid #d4c9b5' }
            }
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {/* 목록 — 장부 느낌 */}
      {txs.length === 0 ? (
        <p className="text-center py-10 font-body italic" style={{ color: '#c4ae8a' }}>내역이 없습니다</p>
      ) : (
        <ul>
          {txs.map((t, i) => {
            const cat = t.category ? getCat(t.category) : null;
            return (
              <li
                key={t.id}
                className="flex items-center gap-4 py-3.5"
                style={{
                  borderBottom: i !== txs.length - 1 ? '1px dashed #e0d5c0' : 'none',
                }}
              >
                {/* 수입/지출 표시 */}
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold shrink-0 font-display"
                  style={t.type === 'income'
                    ? { background: '#e8f0e6', color: '#3a6b35', border: '1px solid #b8d4b4' }
                    : { background: '#f0e6e4', color: '#8b3a2a', border: '1px solid #d4b4b0' }
                  }
                >
                  {t.type === 'income' ? '입' : '출'}
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate font-body" style={{ color: '#3d2410' }}>{t.desc}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-body" style={{ color: '#b5a080' }}>{t.date}</span>
                    {cat && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-sm font-body"
                        style={{ background: cat.bg, color: cat.color }}
                      >
                        {cat.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* 금액 */}
                <span
                  className="text-sm font-semibold shrink-0 font-display"
                  style={{ color: t.type === 'income' ? '#3a6b35' : '#3d2410' }}
                >
                  {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                </span>

                {/* 삭제 */}
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-xs shrink-0 transition-colors font-body"
                  style={{ color: '#d4c9b5' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#8b3a2a')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#d4c9b5')}
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
