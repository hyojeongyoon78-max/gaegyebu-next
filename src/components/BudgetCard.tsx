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

  const barColor  = level === 'over' ? 'bg-red-500'    : level === 'warn' ? 'bg-orange-400' : 'bg-green-500';
  const textColor = level === 'over' ? 'text-red-500'  : level === 'warn' ? 'text-orange-400' : 'text-green-600';

  const handleSet = () => {
    const val = parseInt(input);
    if (!val || val <= 0) { alert('올바른 예산을 입력해주세요.'); return; }
    setBudgets(prev => ({ ...prev, [monthKey]: val }));
    setInput('');
  };

  return (
    <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-slate-600">월별 예산</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => onChangeMonth(-1)} className="text-xl text-slate-400 hover:bg-slate-100 w-8 h-8 rounded-lg flex items-center justify-center">‹</button>
          <span className="text-sm font-semibold text-slate-700 min-w-[88px] text-center">{monthLabel}</span>
          <button onClick={() => onChangeMonth(1)}  className="text-xl text-slate-400 hover:bg-slate-100 w-8 h-8 rounded-lg flex items-center justify-center">›</button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSet()}
          placeholder="이번 달 예산 입력 (원)"
          className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400"
        />
        <button onClick={handleSet} className="px-4 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 whitespace-nowrap transition-colors">
          설정
        </button>
      </div>

      {budget > 0 ? (
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex justify-between text-sm text-slate-600 mb-1.5">
            <span>이번 달 예산</span><span className="font-semibold">{fmt(budget)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600 mb-3">
            <span>이번 달 지출</span><span className="font-semibold">{fmt(monthExpense)}</span>
          </div>
          <div className="bg-slate-200 rounded-full h-2.5 overflow-hidden mb-2">
            <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
          </div>
          <p className={`text-right text-xs font-semibold ${textColor}`}>
            {remain >= 0 ? `남은 예산 ${fmt(remain)}` : `예산 초과 ${fmt(-remain)}`}
            {' '}({Math.round((monthExpense / budget) * 100)}%)
          </p>
        </div>
      ) : (
        <p className="text-center text-slate-400 text-sm py-1">예산이 설정되지 않았습니다.</p>
      )}
    </div>
  );
}
