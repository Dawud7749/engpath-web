interface BarProps {
  value: number;
  color?: string;
  track?: string;
  h?: number;
  glow?: boolean;
}

export function Bar({ value, color = 'var(--sky)', track = 'rgba(26,43,60,0.07)', h = 10, glow = false }: BarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ height: h, borderRadius: 'var(--r-pill)', background: track, overflow: 'hidden', width: '100%' }}>
      <div style={{
        width: `${pct}%`, height: '100%', borderRadius: 'var(--r-pill)',
        background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 72%, #fff))`,
        boxShadow: glow ? `0 0 10px ${color}` : 'none',
        transition: 'width .7s cubic-bezier(.2,.8,.2,1)',
      }} />
    </div>
  );
}

export function VersusBar({ a = 62, b = 38, height = 18, nameA = 'Dawud', nameB = 'Jea' }: {
  a?: number; b?: number; height?: number; nameA?: string; nameB?: string;
}) {
  const total = a + b || 1;
  const ap = (a / total) * 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, fontWeight: 700 }}>
        <span style={{ color: 'var(--pink-ink)' }}>{nameA}</span>
        <span style={{ color: 'var(--sky-ink)' }}>{nameB}</span>
      </div>
      <div style={{ display: 'flex', height, borderRadius: 'var(--r-pill)', overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(26,43,60,0.08)' }}>
        <div style={{ width: `${ap}%`, background: 'linear-gradient(90deg, var(--pink-deep), var(--pink))', minWidth: 6, transition: 'width .7s' }} />
        <div style={{ width: 3, background: '#fff' }} />
        <div style={{ flex: 1, background: 'linear-gradient(90deg, var(--sky), var(--sky-deep))' }} />
      </div>
      <div className="f-display tabular" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600 }}>
        <span style={{ color: 'var(--pink-ink)' }}>{a}</span>
        <span style={{ color: 'var(--sky-ink)' }}>{b}</span>
      </div>
    </div>
  );
}
