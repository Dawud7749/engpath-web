import React from 'react';

interface OnboardingShellProps {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function OnboardingShell({ step, total, title, subtitle, children }: OnboardingShellProps) {
  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(165deg, var(--sky-wash), var(--offwhite))' }}>
      {/* Progress */}
      <div style={{ padding: '52px 24px 0' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 6, borderRadius: 999, background: i < step ? 'var(--sky)' : 'rgba(26,43,60,0.08)', transition: 'background .3s' }} />
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', marginTop: 10 }}>{step} dari {total}</div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 24px 32px' }}>
        <h1 className="f-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px', lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 14.5, color: 'var(--ink-2)', fontWeight: 600, margin: '0 0 22px' }}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
