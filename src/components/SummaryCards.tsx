import { fmt } from '@/lib/utils';

interface Props {
  income: number;
  expense: number;
}

export function SummaryCards({ income, expense }: Props) {
  return (
    <div className="flex gap-3 mb-3">
      <div className="flex-1 bg-amber-50 border border-amber-200 rounded-sm px-5 py-4 text-center shadow-sm">
        <p className="text-xs tracking-[0.2em] uppercase mb-1.5 font-display" style={{ color: '#a07850' }}>수입</p>
        <p className="font-display text-xl font-semibold" style={{ color: '#3a6b35' }}>{fmt(income)}</p>
      </div>
      <div className="flex-1 bg-amber-50 border border-amber-200 rounded-sm px-5 py-4 text-center shadow-sm">
        <p className="text-xs tracking-[0.2em] uppercase mb-1.5 font-display" style={{ color: '#a07850' }}>지출</p>
        <p className="font-display text-xl font-semibold" style={{ color: '#8b3a2a' }}>{fmt(expense)}</p>
      </div>
    </div>
  );
}
