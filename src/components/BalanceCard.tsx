import { fmt } from '@/lib/utils';

interface Props {
  balance: number;
}

export function BalanceCard({ balance }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-8 py-8 text-center mb-3">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">현재 잔액</p>
      <p className="text-5xl font-bold text-gray-900 tracking-tight">{fmt(balance)}</p>
    </div>
  );
}
