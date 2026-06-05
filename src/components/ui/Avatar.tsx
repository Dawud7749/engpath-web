interface AvatarProps {
  initials: string;
  color: string;
  deep: string;
  size?: number;
  ring?: boolean;
  glow?: boolean;
  style?: React.CSSProperties;
}

export function Avatar({ initials, color, deep, size = 44, ring = false, glow = false, style = {} }: AvatarProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(150deg, ${color}, ${deep})`,
      color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600,
      fontSize: size * 0.42, letterSpacing: 0.5,
      border: ring ? '3px solid #fff' : 'none',
      boxShadow: glow ? `0 6px 16px ${color}` : 'var(--sh-xs)',
      ...style,
    }}>{initials}</div>
  );
}

export const ME = {
  name: 'Dawud', initials: 'D',
  color: 'var(--pink)', deep: 'var(--pink-deep)', ink: 'var(--pink-ink)',
};
export const PARTNER = {
  name: 'Jea', initials: 'J',
  color: 'var(--sky)', deep: 'var(--sky-deep)', ink: 'var(--sky-ink)',
};
