import { BoltIcon, FireIcon, ShieldCheckIcon } from './Icons';

export function XPBadge({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' }) {
  const s = size === 'sm'
    ? { h: 26, f: 13, ic: 13, pad: '0 10px 0 8px' }
    : { h: 32, f: 15, ic: 15, pad: '0 13px 0 9px' };
  return (
    <div className="f-display tabular" style={{
      height: s.h, display: 'inline-flex', alignItems: 'center', gap: 4, padding: s.pad,
      borderRadius: 'var(--r-pill)', background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))',
      color: '#fff', fontWeight: 600, fontSize: s.f, boxShadow: 'var(--sh-blue)',
    }}>
      <BoltIcon size={s.ic} style={{ color: 'var(--sunny)' }} />
      {value.toLocaleString('id-ID')}
      <span style={{ fontSize: s.f - 3, opacity: 0.85, fontWeight: 500 }}>XP</span>
    </div>
  );
}

export function StreakBadge({ days, size = 'md', live = true }: { days: number; size?: 'sm' | 'md'; live?: boolean }) {
  const s = size === 'sm'
    ? { h: 28, f: 14, ic: 16, pad: '0 12px 0 8px' }
    : { h: 38, f: 18, ic: 22, pad: '0 16px 0 11px' };
  return (
    <div className="f-display" style={{
      height: s.h, display: 'inline-flex', alignItems: 'center', gap: 5, padding: s.pad,
      borderRadius: 'var(--r-pill)', background: 'linear-gradient(135deg, var(--sunny), var(--coral))',
      color: '#fff', fontWeight: 600, fontSize: s.f, boxShadow: '0 8px 18px rgba(255,158,125,0.45)',
    }}>
      <FireIcon size={s.ic} style={{ animation: live ? 'flame 1.3s ease-in-out infinite' : 'none', transformOrigin: 'bottom center' }} />
      <span className="tabular">{days}</span>
      <span style={{ fontSize: s.f - 5, opacity: 0.9, fontWeight: 500 }}>hari</span>
    </div>
  );
}

export function LevelBadge({ level = 'B1', size = 'md' }: { level?: string; size?: 'sm' | 'md' }) {
  const h = size === 'sm' ? 22 : 28, f = size === 'sm' ? 12 : 15;
  return (
    <span className="f-display tabular" style={{
      height: h, minWidth: h + 6, padding: '0 9px',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 'var(--r-xs)', background: 'var(--sky-wash)',
      color: 'var(--sky-ink)', fontWeight: 600, fontSize: f, border: '1.5px solid var(--baby)',
    }}>{level}</span>
  );
}

export function PhaseChip({ phase = 1, week = 3 }: { phase?: number; week?: number }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 12px',
      borderRadius: 'var(--r-pill)', background: '#fff', color: 'var(--ink-2)',
      fontSize: 12.5, fontWeight: 700, boxShadow: 'var(--sh-xs)', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--mint)' }} />
      Fase {phase} · Minggu {week}
    </span>
  );
}

export function ShieldBadge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'rgba(255,255,255,0.22)', borderRadius: 'var(--r-md)', padding: '8px 10px' }}>
      <ShieldCheckIcon size={22} style={{ color: '#fff' }} />
      <span style={{ fontSize: 9.5, fontWeight: 800, color: '#fff', letterSpacing: 0.2 }}>SHIELD ×1</span>
    </div>
  );
}
