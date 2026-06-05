'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, ME, PARTNER } from '@/components/ui/Avatar';
import { LevelBadge, PhaseChip } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { CalIcon, TrophyIcon, ShieldCheckIcon, BellIcon, SettingsIcon, ChevRIcon, FireIcon, MicIcon, BookIcon, BoltIcon } from '@/components/ui/Icons';
import { createClient } from '@/lib/supabase/client';

const badges = [
  { icon: FireIcon,  label: '14 hari',  color: 'var(--coral)' },
  { icon: MicIcon,   label: 'Speaker',  color: 'var(--pink)' },
  { icon: BookIcon,  label: 'Reader B1', color: 'var(--sky)' },
  { icon: BoltIcon,  label: '2.5K XP',  color: 'var(--sunny)' },
];

const menu = [
  { icon: CalIcon,          label: 'Laporan Mingguan', detail: 'Minggu 3', color: 'var(--sky)', href: '/weekly' },
  { icon: TrophyIcon,       label: 'Leaderboard',      detail: '5 domain', color: 'var(--sunny)', href: '/leaderboard' },
  { icon: ShieldCheckIcon,  label: 'Streak Shield',    detail: '1 tersisa', color: 'var(--mint)', href: null },
  { icon: BellIcon,         label: 'Reminder harian',  detail: '19:00',    color: 'var(--coral)', href: null },
];

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div style={{ background: 'var(--offwhite)', minHeight: '100%' }}>
      <div style={{ background: 'linear-gradient(165deg, var(--lpink) 0%, var(--pink-wash) 50%, var(--offwhite) 100%)', padding: '58px 18px 18px', borderRadius: '0 0 28px 28px', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Avatar {...ME} size={84} ring glow />
          <div style={{ position: 'absolute', bottom: -2, right: -4, background: '#fff', borderRadius: 999, padding: 2, boxShadow: 'var(--sh-xs)' }}>
            <LevelBadge level="B1+" size="sm" />
          </div>
        </div>
        <div className="f-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 10, color: 'var(--ink)' }}>Dawud</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 6 }}>
          <PhaseChip phase={1} week={3} />
          <span style={{ display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 12px', borderRadius: 999, background: '#fff', fontSize: 12.5, fontWeight: 800, color: 'var(--muted)', boxShadow: 'var(--sh-xs)' }}>Fokus: Speaking</span>
        </div>
      </div>

      <div style={{ padding: '16px 18px 24px' }}>
        {/* Partner */}
        <Card pad={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar {...PARTNER} size={44} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.3 }}>Partner belajar</div>
            <div className="f-display" style={{ fontSize: 16, fontWeight: 600, color: 'var(--sky-ink)' }}>Jea</div>
          </div>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)' }} />online
          </span>
        </Card>

        {/* Badges */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '2px 2px 10px' }}>
            <h3 className="f-display" style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>Badge</h3>
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)' }}>12 total</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {badges.map(({ icon: Icon, label, color }, bi) => (
              <div key={bi} style={{ background: '#fff', borderRadius: 'var(--r-md)', padding: '12px 4px', textAlign: 'center', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', margin: '0 auto', background: `linear-gradient(140deg, ${color}, color-mix(in srgb, ${color} 88%, #000))`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 10px ${color}` }}>
                  <Icon size={20} />
                </div>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--ink-2)', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <Card pad={16} style={{ marginTop: 18 }}>
          {menu.map(({ icon: Icon, label, detail, color, href }, mi) => (
            <div key={mi}>
              {href ? (
                <Link href={href} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 4px', textDecoration: 'none', borderBottom: mi < menu.length - 1 ? '1px solid rgba(26,43,60,0.06)' : 'none' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: `color-mix(in srgb, ${color} 18%, #fff)`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={19} /></div>
                  <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
                  {detail && <span style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 700 }}>{detail}</span>}
                  <ChevRIcon size={17} style={{ color: 'var(--faint)' }} />
                </Link>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 4px', borderBottom: mi < menu.length - 1 ? '1px solid rgba(26,43,60,0.06)' : 'none' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: `color-mix(in srgb, ${color} 18%, #fff)`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={19} /></div>
                  <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
                  {detail && <span style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 700 }}>{detail}</span>}
                </div>
              )}
            </div>
          ))}
          <button style={{ display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '13px 4px', cursor: 'pointer' }}>
            <div style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: 'var(--offwhite)', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SettingsIcon size={19} /></div>
            <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>Pengaturan</span>
            <ChevRIcon size={17} style={{ color: 'var(--faint)' }} />
          </button>
        </Card>

        {/* Logout */}
        <button onClick={handleLogout} style={{ width: '100%', marginTop: 16, padding: '14px 0', borderRadius: 'var(--r-pill)', border: '1.5px solid var(--red-soft)', background: 'var(--red-soft)', color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
          Keluar
        </button>
      </div>
    </div>
  );
}
