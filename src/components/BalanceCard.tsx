import { fmt } from '@/lib/utils';

interface Props {
  balance: number;
}

export function BalanceCard({ balance }: Props) {
  return (
    <div className="bg-blue-500 text-white rounded-2xl p-6 text-center mb-4 shadow-lg shadow-blue-200">
      <p className="text-sm opacity-85 mb-1">현재 잔액</p>
      <p className="text-4xl font-bold">{fmt(balance)}</p>
    </div>
  );
}
