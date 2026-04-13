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

  const barColor  = level === 'over' ? '#8b3a2a' : level === 'warn' ? '#b5742a' : '#3a6b35';
  const textColor = level === 'over' ? '#8b3a2a' : level === 'warn' ? '#b5742a' : '#3a6b35';

  const handleSet = () => {
    const val = parseInt(input);
    if (!val || val <= 0) { alert('올바른 예산을 입력해주세요.'); return; }
    setBudgets(prev => ({ ...prev, [monthKey]: val }));
    setInput('');
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-sm p-6 mb-3 shadow-sm">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-5">
        <p className="font-display text-xs tracking-[0.2em] uppercase" style={{ color: '#a07850' }}>월별 예산</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChangeMonth(-1)}
            className="w-7 h-7 flex items-center justify-center rounded font-display text-lg transition-colors hover:bg-amber-100"
            style={{ color: '#a07850' }}
          >‹</button>
          <span className="font-display text-sm font-semibold min-w-[88px] text-center" style={{ color: '#3d2410' }}>
            {monthLabel}
          </span>
          <button
            onClick={() => onChangeMonth(1)}
            className="w-7 h-7 flex items-center justify-center rounded font-display text-lg transition-colors hover:bg-amber-100"
            style={{ color: '#a07850' }}
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
          className="flex-1 px-3 py-2.5 rounded-sm text-sm outline-none transition-all font-body"
          style={{
            background: '#ede8df',
            border: '1px solid #d4c9b5',
            color: '#3d2410',
          }}
        />
        <button
          onClick={handleSet}
          className="px-4 py-2.5 rounded-sm text-sm font-semibold whitespace-nowrap transition-colors font-display"
          style={{ background: '#6b4c2a', color: '#fef9f0' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#8b6035')}
          onMouseLeave={e => (e.currentTarget.style.background = '#6b4c2a')}
        >
          설정
        </button>
      </div>

      {/* 상태 */}
      {budget > 0 ? (
        <div>
          <div className="flex justify-between text-sm mb-1.5 font-body" style={{ color: '#8b7050' }}>
            <span>지출 {fmt(monthExpense)}</span>
            <span>예산 {fmt(budget)}</span>
          </div>
          <div className="rounded-full h-2 overflow-hidden mb-2" style={{ background: '#e0d5c5' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: barColor }}
            />
          </div>
          <p className="text-right text-xs font-semibold font-body" style={{ color: textColor }}>
            {remain >= 0 ? `${fmt(remain)} 남음` : `${fmt(-remain)} 초과`}
            <span className="ml-1" style={{ color: '#c4ae8a' }}>({Math.round(pct)}%)</span>
          </p>
        </div>
      ) : (
        <p className="text-xs text-center font-body" style={{ color: '#c4ae8a' }}>예산을 설정해보세요</p>
      )}
    </div>
  );
}
