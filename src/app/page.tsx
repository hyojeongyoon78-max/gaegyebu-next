'use client';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { BalanceCard } from '@/components/BalanceCard';
import { SummaryCards } from '@/components/SummaryCards';
import { BudgetCard } from '@/components/BudgetCard';
import { TransactionForm } from '@/components/TransactionForm';
import { CategoryManager } from '@/components/CategoryManager';
import { TransactionList } from '@/components/TransactionList';
import { DEFAULT_CATS, CAT_PALETTE } from '@/lib/constants';
import type { Transaction, Category } from '@/lib/types';

export default function Home() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [budgets, setBudgets]           = useLocalStorage<Record<string, number>>('budgets', {});
  const [customCats, setCustomCats]     = useLocalStorage<Category[]>('customCats', []);

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

  /* ── 거래 ── */
  const addTransaction = (tx: Omit<Transaction, 'id'>) =>
    setTransactions(prev => [{ ...tx, id: Date.now() }, ...prev]);

  const deleteTransaction = (id: number) =>
    setTransactions(prev => prev.filter(t => t.id !== id));

  const clearMonthTransactions = () =>
    setTransactions(prev => prev.filter(t => !t.date.startsWith(monthKey())));

  /* ── 카테고리 ── */
  const addCategory = (name: string) => {
    const col = CAT_PALETTE[customCats.length % CAT_PALETTE.length];
    setCustomCats(prev => [...prev, { name, emoji: '📌', ...col }]);
  };

  const deleteCategory = (name: string) => {
    setCustomCats(prev => prev.filter(c => c.name !== name));
    setTransactions(prev => prev.map(t => t.category === name ? { ...t, category: '기타' } : t));
    if (activeCategory === name) setActiveCategory(null);
  };

  return (
    <main className="min-h-screen bg-slate-100 py-6 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-700 mb-6">가계부</h1>

        <BalanceCard balance={income - expense} />

        <SummaryCards income={income} expense={expense} />

        <BudgetCard
          transactions={transactions}
          budgets={budgets}
          setBudgets={setBudgets}
          monthKey={monthKey()}
          monthLabel={monthLabel()}
          onChangeMonth={changeMonth}
        />

        <TransactionForm allCats={allCats()} onAdd={addTransaction} />

        <CategoryManager
          allCats={allCats()}
          defaultCats={DEFAULT_CATS}
          onAdd={addCategory}
          onDelete={deleteCategory}
        />

        <TransactionList
          transactions={transactions}
          monthKey={monthKey()}
          monthLabel={monthLabel()}
          allCats={allCats()}
          getCat={getCat}
          activeCategory={activeCategory}
          onFilterCat={setActiveCategory}
          onDelete={deleteTransaction}
          onClearAll={clearMonthTransactions}
        />
      </div>
    </main>
  );
}
