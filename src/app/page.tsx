import Link from 'next/link';
import { BoltIcon, FireIcon, SwordsIcon, ChartIcon } from '@/components/ui/Icons';

export default function LandingPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(165deg, var(--sky-wash) 0%, var(--offwhite) 50%, var(--pink-wash) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'var(--font-body)' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
        <div style={{ width: 60, height: 60, borderRadius: 18, background: 'linear-gradient(140deg, var(--sky), var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)' }}>
          <BoltIcon size={32} style={{ color: '#fff' }} />
        </div>
        <div>
          <div className="f-display" style={{ fontSize: 34, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>EngPath</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--muted)' }}>Learn together. Compete better.</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', maxWidth: 440, marginBottom: 40 }}>
        <h1 className="f-display" style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', margin: '0 0 12px', lineHeight: 1.25 }}>
          Belajar bahasa Inggris lebih seru bareng pasangan belajarmu
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
          Kompetisi, saling review, dan track progress berdua — setiap hari 30 menit.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40 }}>
        {[
          { icon: <FireIcon size={16} />, label: 'Streak harian bersama', color: 'var(--coral)', soft: 'var(--coral-soft)' },
          { icon: <SwordsIcon size={16} />, label: 'Daily duel 5 menit', color: 'var(--pink)', soft: 'var(--pink-wash)' },
          { icon: <ChartIcon size={16} />, label: 'Skill radar progress', color: 'var(--sky)', soft: 'var(--sky-wash)' },
        ].map(({ icon, label, color, soft }) => (
          <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 'var(--r-pill)', background: soft, color, fontWeight: 800, fontSize: 13, boxShadow: 'var(--sh-xs)' }}>
            {icon}{label}
          </span>
        ))}
      </div>

      <Link href="/login" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
        height: 56, width: '100%', maxWidth: 340, borderRadius: 'var(--r-pill)',
        background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))',
        color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-display)',
        fontSize: 18, fontWeight: 600, boxShadow: 'var(--sh-blue)',
      }}>
        <BoltIcon size={22} style={{ color: 'var(--sunny)' }} />
        Mulai Belajar Sekarang
      </Link>
      <p style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)', fontWeight: 700 }}>Login via magic link — tanpa password</p>
    </main>
  );
}
