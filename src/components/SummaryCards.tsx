import { fmt } from '@/lib/utils';

interface Props {
  income: number;
  expense: number;
}

export function SummaryCards({ income, expense }: Props) {
  return (
    <div className="flex gap-3 mb-5">
      <div className="flex-1 bg-white rounded-xl p-4 text-center shadow-sm">
        <p className="text-xs text-gray-400 mb-1">총 수입</p>
        <p className="text-xl font-bold text-green-600">{fmt(income)}</p>
      </div>
      <div className="flex-1 bg-white rounded-xl p-4 text-center shadow-sm">
        <p className="text-xs text-gray-400 mb-1">총 지출</p>
        <p className="text-xl font-bold text-red-500">{fmt(expense)}</p>
      </div>
    </div>
  );
}
