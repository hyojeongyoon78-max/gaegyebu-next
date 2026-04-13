'use client';
import { useState } from 'react';
import { useGaegyebu } from '@/hooks/useGaegyebu';
import { BalanceCard } from '@/components/BalanceCard';
import { SummaryCards } from '@/components/SummaryCards';
import { BudgetCard } from '@/components/BudgetCard';
import { TransactionForm } from '@/components/TransactionForm';
import { CategoryManager } from '@/components/CategoryManager';
import { TransactionList } from '@/components/TransactionList';
import { DEFAULT_CATS, CAT_PALETTE } from '@/lib/constants';
import type { Category } from '@/lib/types';

export default function Home() {
  const {
    loading,
    transactions,
    budgets,
    customCats,
    addTransaction,
    removeTransaction,
    clearMonthTransactions,
    setBudget,
    addCategory,
    removeCategory,
  } = useGaegyebu();

  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  /* ── 헬퍼 ── */
  const allCats = (): Category[] => [...DEFAULT_CATS, ...customCats];

  const getCat = (name: string): Category =>
    allCats().find(c => c.name === name) ?? { name, emoji: '📌', color: '#4a5568', bg: '#e2e8f0' };

  const monthKey   = () => `${viewYear}-${String(viewMonth).padStart(2, '0')}`;
  const monthLabel = () => `${viewYear}년 ${viewMonth}월`;

  const changeMonth = (delta: number) => {
    setActiveCategory(null);
    setViewMonth(m => {
      const next = m + delta;
      if (next > 12) { setViewYear(y => y + 1); return 1; }
      if (next < 1)  { setViewYear(y => y - 1); return 12; }
      return next;
    });
  };

  /* ── 집계 ── */
  const income  = transactions.filter(t => t.type === 'income') .reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  /* ── 카테고리 추가 ── */
  const handleAddCategory = (name: string) => {
    const col = CAT_PALETTE[customCats.length % CAT_PALETTE.length];
    addCategory({ name, emoji: '📌', ...col });
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#f5efe6' }}>
        <p className="font-body text-sm" style={{ color: '#c4ae8a' }}>불러오는 중...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4" style={{ background: '#f5efe6' }}>
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-2xl font-bold text-center mb-1" style={{ color: '#3d2410' }}>가계부</h1>
        <p className="font-body text-center text-xs tracking-[0.3em] uppercase mb-7" style={{ color: '#c4ae8a' }}>My Ledger</p>

        <BalanceCard balance={income - expense} />

        <SummaryCards income={income} expense={expense} />

        <BudgetCard
          transactions={transactions}
          budgets={budgets}
          setBudget={setBudget}
          monthKey={monthKey()}
          monthLabel={monthLabel()}
          onChangeMonth={changeMonth}
        />

        <TransactionForm allCats={allCats()} onAdd={addTransaction} />

        <CategoryManager
          allCats={allCats()}
          defaultCats={DEFAULT_CATS}
          onAdd={handleAddCategory}
          onDelete={removeCategory}
        />

        <TransactionList
          transactions={transactions}
          monthKey={monthKey()}
          monthLabel={monthLabel()}
          allCats={allCats()}
          getCat={getCat}
          activeCategory={activeCategory}
          onFilterCat={setActiveCategory}
          onDelete={removeTransaction}
          onClearAll={() => clearMonthTransactions(monthKey())}
        />
      </div>
    </main>
  );
}
