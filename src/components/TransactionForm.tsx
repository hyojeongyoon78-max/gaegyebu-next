'use client';
import { useState } from 'react';
import type { Category, Transaction } from '@/lib/types';

interface Props {
  allCats: Category[];
  onAdd: (tx: Omit<Transaction, 'id'>) => void;
}

export function TransactionForm({ allCats, onAdd }: Props) {
  const [type, setType]         = useState<'income' | 'expense'>('income');
  const [desc, setDesc]         = useState('');
  const [amount, setAmount]     = useState('');
  const [category, setCategory] = useState('식비');
  const [date, setDate]         = useState(() => new Date().toISOString().split('T')[0]);

  const handleAdd = () => {
    if (!desc.trim())      { alert('내용을 입력해주세요.'); return; }
    const amt = parseInt(amount);
    if (!amt || amt <= 0)  { alert('올바른 금액을 입력해주세요.'); return; }
    if (!date)             { alert('날짜를 선택해주세요.'); return; }

    onAdd({ type, desc: desc.trim(), amount: amt, date, category: type === 'expense' ? category : null });
    setDesc('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const inputClass = "w-full px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-3">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">내역 추가</p>

      {/* 수입 / 지출 토글 */}
      <div className="flex bg-gray-50 rounded-xl p-1 gap-1 mb-4">
        <button
          onClick={() => setType('income')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            type === 'income'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          수입
        </button>
        <button
          onClick={() => setType('expense')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            type === 'expense'
              ? 'bg-white text-rose-500 shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          지출
        </button>
      </div>

      {/* 내용 */}
      <input
        type="text"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="내용"
        maxLength={30}
        className={`${inputClass} mb-2.5`}
      />

      {/* 카테고리 */}
      {type === 'expense' && (
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className={`${inputClass} mb-2.5`}
        >
          {allCats.map(c => (
            <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>
          ))}
        </select>
      )}

      {/* 금액 / 날짜 */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="금액 (원)"
          min={0}
          className="flex-1 px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="flex-1 px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
        />
      </div>

      <button
        onClick={handleAdd}
        className="w-full py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
      >
        추가하기
      </button>
    </div>
  );
}
