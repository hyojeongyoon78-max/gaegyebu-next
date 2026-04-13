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
    <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 mb-3">
      <div className="flex justify-between items-center">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">카테고리</p>
        <button
          onClick={() => setOpen(o => !o)}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          {open ? '접기' : '관리'}
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
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
                      className="opacity-50 hover:opacity-100 text-[9px] leading-none ml-0.5"
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
              className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-xl text-sm text-gray-700 placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 whitespace-nowrap transition-colors"
            >
              추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
