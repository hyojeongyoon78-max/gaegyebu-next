'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Transaction, Category } from '@/lib/types';
import * as db from '@/lib/db';

export function useGaegyebu() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets,      setBudgetsState] = useState<Record<string, number>>({});
  const [customCats,   setCustomCats]   = useState<Category[]>([]);
  const [loading,      setLoading]      = useState(true);

  /* 초기 로드 */
  useEffect(() => {
    Promise.all([
      db.fetchTransactions(),
      db.fetchBudgets(),
      db.fetchCustomCategories(),
    ]).then(([txs, bud, cats]) => {
      setTransactions(txs);
      setBudgetsState(bud);
      setCustomCats(cats);
    }).finally(() => setLoading(false));
  }, []);

  /* 거래 추가 */
  const addTransaction = useCallback(async (tx: Omit<Transaction, 'id'>) => {
    const saved = await db.insertTransaction(tx);
    setTransactions(prev => [saved, ...prev]);
  }, []);

  /* 거래 삭제 */
  const removeTransaction = useCallback(async (id: number) => {
    await db.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  /* 월별 전체 삭제 */
  const clearMonthTransactions = useCallback(async (monthKey: string) => {
    await db.deleteTransactionsByMonth(monthKey);
    setTransactions(prev => prev.filter(t => !t.date.startsWith(monthKey)));
  }, []);

  /* 예산 설정 */
  const setBudget = useCallback(async (monthKey: string, amount: number) => {
    await db.upsertBudget(monthKey, amount);
    setBudgetsState(prev => ({ ...prev, [monthKey]: amount }));
  }, []);

  /* 카테고리 추가 */
  const addCategory = useCallback(async (cat: Category) => {
    await db.insertCategory(cat);
    setCustomCats(prev => [...prev, cat]);
  }, []);

  /* 카테고리 삭제 */
  const removeCategory = useCallback(async (name: string) => {
    await db.deleteCategory(name);
    setCustomCats(prev => prev.filter(c => c.name !== name));
    setTransactions(prev =>
      prev.map(t => t.category === name ? { ...t, category: '기타' } : t)
    );
  }, []);

  return {
    loading,
    transactions,
    budgets: budgets,
    customCats,
    addTransaction,
    removeTransaction,
    clearMonthTransactions,
    setBudget,
    addCategory,
    removeCategory,
  };
}
