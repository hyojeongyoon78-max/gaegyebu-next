'use client';
import { useState } from 'react';
import type { Transaction } from '@/lib/types';
import { fmt } from '@/lib/utils';

interface Props {
  transactions: Transaction[];
  budgets: Record<string, number>;
  setBudgets: (val: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>)) => void;
  monthKey: string;
  monthLabel: string;
  onChangeMonth: (delta: number) => void;
}

export function BudgetCard({ transactions, budgets, setBudgets, monthKey, monthLabel, onChangeMonth }: Props) {
  const [input, setInput] = useState('');

  const budget = budgets[monthKey] ?? 0;
  const monthExpense = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(monthKey))
    .reduce((s, t) => s + t.amount, 0);

  const pct    = budget > 0 ? Math.min((monthExpense / budget) * 100, 100) : 0;
  const remain = budget - monthExpense;
  const level  = pct >= 100 ? 'over' : pct >= 80 ? 'warn' : 'safe';

  const barColor  = level === 'over' ? 'bg-rose-400'    : level === 'warn' ? 'bg-amber-400' : 'bg-emerald-400';
  const textColor = level === 'over' ? 'text-rose-500'  : level === 'warn' ? 'text-amber-500' : 'text-emerald-600';

  const handleSet = () => {
    const val = parseInt(input);
    if (!val || val <= 0) { alert('올바른 예산을 입력해주세요.'); return; }
    setBudgets(prev => ({ ...prev, [monthKey]: val }));
    setInput('');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-3">

      {/* 헤더 */}
      <div className="flex justify-between items-center mb-5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">월별 예산</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChangeMonth(-1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors text-lg"
          >‹</button>
          <span className="text-sm font-semibold text-gray-700 min-w-[88px] text-center">{monthLabel}</span>
          <button
            onClick={() => onChangeMonth(1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors text-lg"
          >›</button>
        </div>
      </div>

      {/* 입력 */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSet()}
          placeholder="예산 금액 입력 (원)"
          className="flex-1 px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
        />
        <button
          onClick={handleSet}
          className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 whitespace-nowrap transition-colors"
        >
          설정
        </button>
      </div>

      {/* 상태 */}
      {budget > 0 ? (
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>지출 {fmt(monthExpense)}</span>
            <span>예산 {fmt(budget)}</span>
          </div>
          <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden mb-2">
            <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${pct}%` }} />
          </div>
          <p className={`text-right text-xs font-medium ${textColor}`}>
            {remain >= 0 ? `${fmt(remain)} 남음` : `${fmt(-remain)} 초과`}
            <span className="text-gray-300 ml-1">({Math.round(pct)}%)</span>
          </p>
        </div>
      ) : (
        <p className="text-xs text-gray-300 text-center py-1">예산을 설정해보세요</p>
      )}
    </div>
  );
}
