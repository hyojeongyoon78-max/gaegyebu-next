import { fmt } from '@/lib/utils';

interface Props {
  balance: number;
}

export function BalanceCard({ balance }: Props) {
  return (
    <div className="bg-amber-50 rounded-sm border border-amber-200 px-8 py-8 text-center mb-3 shadow-sm"
         style={{ boxShadow: '0 2px 8px rgba(139,90,43,0.08), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
      {/* 상단 장식선 */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px flex-1 bg-amber-300 opacity-60" />
        <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-display">현재 잔액</span>
        <div className="h-px flex-1 bg-amber-300 opacity-60" />
      </div>

      <p className="font-display text-5xl font-bold tracking-tight" style={{ color: '#3d2410' }}>
        {fmt(balance)}
      </p>

      {/* 하단 장식선 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-1 h-1 rounded-full bg-amber-400 opacity-50" />
        <div className="h-px w-16 bg-amber-300 opacity-40" />
        <div className="w-1 h-1 rounded-full bg-amber-400 opacity-50" />
      </div>
    </div>
  );
}
