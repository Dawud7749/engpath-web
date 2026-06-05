'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, SectionLabel } from '@/components/ui/Card';
import { Bar } from '@/components/ui/Bar';
import { SparkleIcon, MicIcon, BookIcon, PenIcon, ChevRIcon } from '@/components/ui/Icons';

const modules = [
  { icon: PenIcon,     title: 'Grammar',    sub: 'Pelajari aturan + latihan',     pct: 0, color: 'var(--sunny)', deep: '#F2B43C', href: '/learn/grammar', badge: 'MATERI' },
  { icon: BookIcon,    title: 'Reading',    sub: 'Baca + pahami artikel',         pct: 0, color: 'var(--mint)', deep: '#3FB7A2', href: '/learn/reading', badge: 'MATERI' },
  { icon: SparkleIcon, title: 'Vocabulary', sub: 'Flashcard kata baru',           pct: 0, color: 'var(--sky)', deep: 'var(--sky-deep)', href: '/learn/vocab' },
  { icon: MicIcon,     title: 'Speaking',   sub: 'Coming soon — rekam pengucapan', pct: 0, color: 'var(--pink)', deep: 'var(--pink-deep)', href: '/learn', badge: 'SOON' },
];

export default function LearnPage() {
  const router = useRouter();
  return (
    <div style={{ background: 'var(--offwhite)', minHeight: '100%' }}>
      <div style={{ background: 'linear-gradient(165deg, var(--mint-soft), var(--offwhite))', padding: '58px 18px 16px', borderRadius: '0 0 28px 28px' }}>
        <div className="f-display" style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)' }}>Belajar</div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 700, marginTop: 2 }}>4 modul · 30 menit sehari</div>
        <Link href="/learn/session" style={{ textDecoration: 'none' }}>
          <Card pad={14} style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 'var(--r-md)', background: 'linear-gradient(140deg,var(--sky),var(--sky-deep))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)' }}>
                <PlayIcon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="f-display" style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>Sesi hari ini</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 700 }}>1 dari 4 blok selesai · ±22 mnt lagi</div>
              </div>
              <div className="f-display tabular" style={{ fontSize: 15, fontWeight: 700, color: 'var(--sky-ink)' }}>25%</div>
            </div>
          </Card>
        </Link>
      </div>

      <div style={{ padding: '16px 18px 24px' }}>
        <SectionLabel>Modul</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {modules.map(({ icon: Icon, title, sub, pct, color, deep, href, badge }) => (
            <Link key={title} href={href} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 'var(--r-lg)', padding: 14, boxShadow: 'var(--sh-sm)', border: '1px solid rgba(26,43,60,0.04)', textDecoration: 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--r-md)', background: `linear-gradient(140deg, ${color}, ${deep})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 6px 14px ${color}` }}>
                <Icon size={24} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span className="f-display" style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{title}</span>
                  {badge && <span style={{ fontSize: 9.5, fontWeight: 800, color: deep, background: `color-mix(in srgb, ${color} 18%, #fff)`, padding: '2px 7px', borderRadius: 999 }}>{badge}</span>}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 700, marginBottom: 7 }}>{sub}</div>
                <Bar value={pct} color={color} h={6} />
              </div>
              <ChevRIcon size={18} style={{ color: 'var(--faint)' }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayIcon({ size = 20, style }: { size?: number; style?: React.CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}><path d="M5 3l14 9-14 9V3z" /></svg>;
}
