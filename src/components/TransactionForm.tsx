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
    if (!desc.trim())           { alert('내용을 입력해주세요.'); return; }
    const amt = parseInt(amount);
    if (!amt || amt <= 0)       { alert('올바른 금액을 입력해주세요.'); return; }
    if (!date)                  { alert('날짜를 선택해주세요.'); return; }

    onAdd({ type, desc: desc.trim(), amount: amt, date, category: type === 'expense' ? category : null });
    setDesc('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-600 mb-3">내역 추가</h2>

      {/* 수입 / 지출 토글 */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setType('income')}
          className={`flex-1 py-2.5 border-2 rounded-lg text-sm transition-all ${
            type === 'income'
              ? 'border-green-500 bg-green-50 text-green-600 font-semibold'
              : 'border-slate-200 bg-white text-slate-400'
          }`}
        >
          + 수입
        </button>
        <button
          onClick={() => setType('expense')}
          className={`flex-1 py-2.5 border-2 rounded-lg text-sm transition-all ${
            type === 'expense'
              ? 'border-red-400 bg-red-50 text-red-500 font-semibold'
              : 'border-slate-200 bg-white text-slate-400'
          }`}
        >
          - 지출
        </button>
      </div>

      {/* 내용 */}
      <input
        type="text"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="내용 (예: 점심식사)"
        maxLength={30}
        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400 mb-3"
      />

      {/* 카테고리 (지출일 때만) */}
      {type === 'expense' && (
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400 bg-white mb-3"
        >
          {allCats.map(c => (
            <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>
          ))}
        </select>
      )}

      {/* 금액 / 날짜 */}
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="금액 (원)"
          min={0}
          className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400"
        />
      </div>

      <button
        onClick={handleAdd}
        className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        추가하기
      </button>
    </div>
  );
}
