import React from 'react';

interface BtnProps {
  children: React.ReactNode;
  color?: string;
  deep?: string;
  shadow?: string;
  onClick?: () => void;
  disabled?: boolean;
  full?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  size?: 'lg' | 'md' | 'sm';
  type?: 'button' | 'submit';
}

export function Btn({
  children, color = 'var(--sky)', deep = 'var(--sky-deep)',
  shadow = 'var(--sh-blue)', onClick, disabled, full = true,
  icon, style = {}, size = 'lg', type = 'button',
}: BtnProps) {
  const h = size === 'lg' ? 56 : size === 'md' ? 48 : 40;
  const f = size === 'lg' ? 18 : size === 'md' ? 16 : 14;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="f-display" style={{
      height: h, width: full ? '100%' : 'auto', padding: full ? 0 : '0 22px', border: 'none',
      borderRadius: 'var(--r-pill)', cursor: disabled ? 'default' : 'pointer',
      background: disabled ? 'var(--faint)' : `linear-gradient(135deg, ${color}, ${deep})`,
      color: '#fff', fontWeight: 600, fontSize: f, letterSpacing: 0.2,
      boxShadow: disabled ? 'none' : shadow,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
      transition: 'transform .12s ease, box-shadow .2s', ...style,
    }}>
      {icon}{children}
    </button>
  );
}
