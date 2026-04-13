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
    <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-slate-600">카테고리 관리</h2>
        <button onClick={() => setOpen(o => !o)} className="text-xs text-slate-400 hover:text-blue-500 transition-colors">
          {open ? '접기 ▴' : '펼치기 ▾'}
        </button>
      </div>

      {open && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {allCats.map(c => {
              const isDefault = defaultCats.some(d => d.name === c.name);
              return (
                <div
                  key={c.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: c.bg, color: c.color }}
                >
                  {c.emoji} {c.name}
                  {!isDefault && (
                    <button
                      onClick={() => {
                        if (confirm(`'${c.name}' 카테고리를 삭제할까요?\n해당 내역은 '기타'로 변경됩니다.`)) {
                          onDelete(c.name);
                        }
                      }}
                      className="opacity-60 hover:opacity-100 text-[10px] leading-none"
                    >
                      ✕
                    </button>
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
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 whitespace-nowrap transition-colors"
            >
              추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
