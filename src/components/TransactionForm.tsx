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

  const inputStyle = {
    background: '#ede8df',
    border: '1px solid #d4c9b5',
    color: '#3d2410',
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-sm p-6 mb-3 shadow-sm">
      <p className="font-display text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#a07850' }}>내역 추가</p>

      {/* 수입 / 지출 토글 — 도장 느낌 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setType('income')}
          className="flex-1 py-2.5 rounded-sm text-sm font-semibold transition-all font-display tracking-wide"
          style={type === 'income'
            ? { background: '#3a6b35', color: '#f0f7ef', border: '1px solid #2d5229' }
            : { background: 'transparent', color: '#a07850', border: '1px solid #d4c9b5' }
          }
        >
          수입
        </button>
        <button
          onClick={() => setType('expense')}
          className="flex-1 py-2.5 rounded-sm text-sm font-semibold transition-all font-display tracking-wide"
          style={type === 'expense'
            ? { background: '#8b3a2a', color: '#fff5f2', border: '1px solid #6b2a1e' }
            : { background: 'transparent', color: '#a07850', border: '1px solid #d4c9b5' }
          }
        >
          지출
        </button>
      </div>

      {/* 내용 */}
      <input
        type="text"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="내용을 적어주세요"
        maxLength={30}
        className="w-full px-3 py-2.5 rounded-sm text-sm outline-none mb-2.5 font-body transition-all focus:ring-1"
        style={{ ...inputStyle, '--tw-ring-color': '#c4ae8a' } as React.CSSProperties}
      />

      {/* 카테고리 */}
      {type === 'expense' && (
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-3 py-2.5 rounded-sm text-sm outline-none mb-2.5 font-body"
          style={inputStyle}
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
          className="flex-1 px-3 py-2.5 rounded-sm text-sm outline-none font-body"
          style={inputStyle}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="flex-1 px-3 py-2.5 rounded-sm text-sm outline-none font-body"
          style={inputStyle}
        />
      </div>

      <button
        onClick={handleAdd}
        className="w-full py-2.5 rounded-sm text-sm font-semibold transition-colors font-display tracking-widest uppercase"
        style={{ background: '#6b4c2a', color: '#fef9f0', letterSpacing: '0.15em' }}
        onMouseEnter={e => (e.currentTarget.style.background = '#8b6035')}
        onMouseLeave={e => (e.currentTarget.style.background = '#6b4c2a')}
      >
        기록하기
      </button>
    </div>
  );
}
