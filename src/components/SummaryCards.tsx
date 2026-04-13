import { fmt } from '@/lib/utils';

interface Props {
  income: number;
  expense: number;
}

export function SummaryCards({ income, expense }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 mb-3 overflow-hidden">
      <div className="flex divide-x divide-gray-100">
        <div className="flex-1 px-6 py-4 text-center">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">수입</p>
          <p className="text-lg font-bold text-emerald-600">{fmt(income)}</p>
        </div>
        <div className="flex-1 px-6 py-4 text-center">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">지출</p>
          <p className="text-lg font-bold text-rose-500">{fmt(expense)}</p>
        </div>
      </div>
    </div>
  );
}
