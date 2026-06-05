import React from 'react';

interface CardProps {
  children: React.ReactNode;
  pad?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
  tint?: string;
  accent?: string;
  className?: string;
}

export function Card({ children, pad = 16, style = {}, onClick, tint, accent, className }: CardProps) {
  return (
    <div onClick={onClick} className={className} style={{
      background: tint || '#fff', borderRadius: 'var(--r-lg)', padding: pad,
      boxShadow: 'var(--sh-sm)', border: '1px solid rgba(26,43,60,0.04)',
      position: 'relative', overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default', ...style,
    }}>
      {accent && (
        <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', border: `2px solid ${accent}`, pointerEvents: 'none', opacity: 0.5 }} />
      )}
      {children}
    </div>
  );
}

export function SectionLabel({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '2px 2px 10px' }}>
      <h3 className="f-display" style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{children}</h3>
      {action}
    </div>
  );
}
