'use client';
import { useState } from 'react';
import type { Category } from '@/lib/types';

interface Props {
  allCats: Category[];
  defaultCats: Category[];
  onAdd: (name: string) => void;
  onDelete: (name: string) => void;
}

export function CategoryManager({ allCats, defaultCats, onAdd, onDelete }: Props) {
  const [open, setOpen]   = useState(false);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const name = input.trim();
    if (!name) return;
    if (allCats.find(c => c.name === name)) { alert('이미 있는 카테고리입니다.'); return; }
    onAdd(name);
    setInput('');
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-sm px-6 py-5 mb-3 shadow-sm">
      <div className="flex justify-between items-center">
        <p className="font-display text-xs tracking-[0.2em] uppercase" style={{ color: '#a07850' }}>카테고리</p>
        <button
          onClick={() => setOpen(o => !o)}
          className="font-body text-xs transition-colors"
          style={{ color: '#c4ae8a' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#8b6035')}
          onMouseLeave={e => (e.currentTarget.style.color = '#c4ae8a')}
        >
          {open ? '접기 ▴' : '관리 ▾'}
        </button>
      </div>

      {open && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {allCats.map(c => {
              const isDefault = defaultCats.some(d => d.name === c.name);
              return (
                <div
                  key={c.name}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-body"
                  style={{ background: c.bg, color: c.color, border: `1px solid ${c.color}30` }}
                >
                  {c.emoji} {c.name}
                  {!isDefault && (
                    <button
                      onClick={() => {
                        if (confirm(`'${c.name}' 카테고리를 삭제할까요?\n해당 내역은 '기타'로 변경됩니다.`)) {
                          onDelete(c.name);
                        }
                      }}
                      className="opacity-50 hover:opacity-100 text-[9px] leading-none ml-0.5"
                    >✕</button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="새 카테고리 이름"
              maxLength={10}
              className="flex-1 px-3 py-2 rounded-sm text-sm outline-none font-body"
              style={{ background: '#ede8df', border: '1px solid #d4c9b5', color: '#3d2410' }}
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-sm text-sm font-semibold whitespace-nowrap font-display"
              style={{ background: '#6b4c2a', color: '#fef9f0' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#8b6035')}
              onMouseLeave={e => (e.currentTarget.style.background = '#6b4c2a')}
            >
              추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
