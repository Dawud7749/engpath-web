'use client';

interface Series {
  values: number[];
  stroke: string;
  fill: string;
}

interface RadarProps {
  size?: number;
  axes: string[];
  series: Series[];
  max?: number;
  labels?: boolean;
}

export function Radar({ size = 230, axes, series, max = 100, labels = true }: RadarProps) {
  const cx = size / 2, cy = size / 2, R = size * 0.37;
  const n = axes.length;
  const pt = (i: number, r: number): [number, number] => {
    const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
  };
  const poly = (vals: number[]) => vals.map((v, i) => pt(i, (v / max) * R).join(',')).join(' ');
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      {rings.map((rr, i) => (
        <polygon key={i}
          points={axes.map((_, idx) => pt(idx, R * rr).join(',')).join(' ')}
          fill={i === rings.length - 1 ? 'var(--offwhite)' : 'none'}
          stroke="rgba(26,43,60,0.09)" strokeWidth="1" />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(26,43,60,0.08)" strokeWidth="1" />;
      })}
      {series.map((s, si) => (
        <g key={si}>
          <polygon points={poly(s.values)} fill={s.fill} fillOpacity="0.28" stroke={s.stroke} strokeWidth="2.5" strokeLinejoin="round" />
          {s.values.map((v, i) => {
            const [x, y] = pt(i, (v / max) * R);
            return <circle key={i} cx={x} cy={y} r="3.5" fill={s.stroke} stroke="#fff" strokeWidth="1.5" />;
          })}
        </g>
      ))}
      {labels && axes.map((a, i) => {
        const [x, y] = pt(i, R + 20);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, fill: 'var(--ink-2)' }}>
            {a}
          </text>
        );
      })}
    </svg>
  );
}
