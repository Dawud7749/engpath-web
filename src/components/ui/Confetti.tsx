'use client';

export function Confetti({ count = 64, run = true }: { count?: number; run?: boolean }) {
  if (!run) return null;
  const cols = ['var(--sky)', 'var(--pink)', 'var(--sunny)', 'var(--mint)', 'var(--coral)', 'var(--baby)'];
  const bits = Array.from({ length: count }, (_, i) => {
    const left = (i * 1.618 * 13.7) % 100;
    const delay = (i * 0.09) % 0.6;
    const dur = 1.6 + (i * 0.13) % 1.4;
    const sz = 6 + (i * 0.7) % 8;
    const rect = i % 2 === 0;
    return (
      <span key={i} style={{
        position: 'absolute', top: -20, left: `${left}%`, width: sz, height: rect ? sz * 0.5 : sz,
        background: cols[i % cols.length], borderRadius: rect ? 1 : '50%',
        animation: `confetti-fall ${dur}s ${delay}s cubic-bezier(.3,.6,.6,1) forwards`,
      }} />
    );
  });
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 80 }}>
      {bits}
    </div>
  );
}
