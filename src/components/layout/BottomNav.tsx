'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, BookIcon, SwordsIcon, ChartIcon, UserIcon } from '@/components/ui/Icons';

const items = [
  { href: '/dashboard', icon: HomeIcon, label: 'Home' },
  { href: '/learn',     icon: BookIcon,  label: 'Belajar' },
  { href: '/duel',      icon: SwordsIcon, label: 'Duel', center: true },
  { href: '/progress',  icon: ChartIcon,  label: 'Progress' },
  { href: '/profile',   icon: UserIcon,   label: 'Profil' },
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav style={{
      flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
      padding: '10px 12px 26px', background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(26,43,60,0.06)', position: 'relative', zIndex: 30,
    }}>
      {items.map(({ href, icon: Icon, label, center }) => {
        const active = path.startsWith(href);
        if (center) {
          return (
            <Link key={href} href={href} style={{ border: 'none', cursor: 'pointer', background: 'transparent', transform: 'translateY(-14px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
              <div style={{ width: 58, height: 58, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(140deg, var(--pink), var(--pink-deep))', color: '#fff', boxShadow: 'var(--sh-pink)', border: '4px solid #fff' }}>
                <Icon size={26} />
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 800, color: active ? 'var(--pink-ink)' : 'var(--muted)' }}>{label}</span>
            </Link>
          );
        }
        return (
          <Link key={href} href={href} style={{ border: 'none', cursor: 'pointer', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 56, color: active ? 'var(--sky-ink)' : 'var(--faint)', textDecoration: 'none' }}>
            <Icon size={24} style={{ opacity: active ? 1 : 0.8 }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, color: active ? 'var(--sky-ink)' : 'var(--muted)' }}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
