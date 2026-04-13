import { supabase } from './supabase';
import type { Transaction, Category } from './types';

/* ── 거래 ── */
export async function fetchTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function insertTransaction(tx: Omit<Transaction, 'id'>): Promise<Transaction> {
  const { data, error } = await supabase
    .from('transactions')
    .insert(tx)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTransaction(id: number): Promise<void> {
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw error;
}

export async function deleteTransactionsByMonth(monthKey: string): Promise<void> {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .like('date', `${monthKey}%`);
  if (error) throw error;
}

/* ── 예산 ── */
export async function fetchBudgets(): Promise<Record<string, number>> {
  const { data, error } = await supabase.from('budgets').select('*');
  if (error) throw error;
  return Object.fromEntries((data ?? []).map(r => [r.month_key, r.amount]));
}

export async function upsertBudget(monthKey: string, amount: number): Promise<void> {
  const { error } = await supabase
    .from('budgets')
    .upsert({ month_key: monthKey, amount });
  if (error) throw error;
}

/* ── 사용자 카테고리 ── */
export async function fetchCustomCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('custom_categories').select('*');
  if (error) throw error;
  return data ?? [];
}

export async function insertCategory(cat: Category): Promise<void> {
  const { error } = await supabase.from('custom_categories').insert(cat);
  if (error) throw error;
}

export async function deleteCategory(name: string): Promise<void> {
  const { error } = await supabase.from('custom_categories').delete().eq('name', name);
  if (error) throw error;
}
