import Link from 'next/link';
import {
  BoltIcon, FireIcon, SwordsIcon, ChartIcon, BookIcon, PenIcon,
  SparkleIcon, ArrowRightIcon, CheckIcon,
} from '@/components/ui/Icons';

export default function LandingPage() {
  return (
    <main style={{ height: '100%', width: '100%', overflowY: 'auto', overflowX: 'hidden', background: 'linear-gradient(165deg, var(--sky-wash) 0%, var(--offwhite) 50%, var(--pink-wash) 100%)', fontFamily: 'var(--font-body)' }}>
      {/* Top bar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: 'linear-gradient(140deg, var(--sky), var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)' }}>
            <BoltIcon size={22} style={{ color: '#fff' }} />
          </div>
          <div className="f-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>EngPath</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/login" style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink-2)', textDecoration: 'none', padding: '8px 14px' }}>Masuk</Link>
          <Link href="/register" style={{ fontSize: 14, fontWeight: 700, color: '#fff', textDecoration: 'none', padding: '10px 18px', borderRadius: 'var(--r-pill)', background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))', boxShadow: 'var(--sh-blue)' }}>Daftar Gratis</Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 28px 60px', display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 'var(--r-pill)', background: '#fff', color: 'var(--sky-ink)', fontWeight: 800, fontSize: 13, boxShadow: 'var(--sh-xs)', marginBottom: 18 }}>
            <SparkleIcon size={15} style={{ color: 'var(--sunny)' }} /> Bilingual EN ↔ ID · CEFR A2–B2
          </div>
          <h1 className="f-display" style={{ fontSize: 42, fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px', lineHeight: 1.15, letterSpacing: -0.5 }}>
            Belajar bahasa Inggris lebih seru bareng pasangan belajarmu
          </h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.6, margin: '0 0 28px', fontWeight: 600 }}>
            Materi singkat → latihan → pembahasan rinci. Kompetisi, saling review, dan track progress berdua — cuma 30 menit per hari.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
              height: 56, padding: '0 28px', borderRadius: 'var(--r-pill)',
              background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))',
              color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-display)',
              fontSize: 17, fontWeight: 600, boxShadow: 'var(--sh-blue)',
            }}>
              Mulai Gratis <ArrowRightIcon size={20} />
            </Link>
            <Link href="/login" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
              height: 56, padding: '0 28px', borderRadius: 'var(--r-pill)',
              background: '#fff', color: 'var(--ink)', textDecoration: 'none',
              fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600,
              border: '1.5px solid rgba(26,43,60,0.12)',
            }}>
              Sudah punya akun? Masuk
            </Link>
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
            <CheckIcon size={14} style={{ color: 'var(--green)' }} /> Daftar pakai email + password · Tanpa kartu kredit
          </div>
        </div>

        {/* Highlight pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {[
            { icon: <FireIcon size={16} />,   label: 'Streak harian bersama',  color: 'var(--coral)', soft: 'var(--coral-soft)' },
            { icon: <SwordsIcon size={16} />, label: 'Daily duel 5 menit',      color: 'var(--pink)',  soft: 'var(--pink-wash)' },
            { icon: <ChartIcon size={16} />,  label: 'Skill radar progress',    color: 'var(--sky)',   soft: 'var(--sky-wash)' },
            { icon: <BookIcon size={16} />,   label: 'Materi + pembahasan',     color: 'var(--mint)',  soft: 'var(--mint-soft)' },
          ].map(({ icon, label, color, soft }) => (
            <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 'var(--r-pill)', background: soft, color, fontWeight: 800, fontSize: 13, boxShadow: 'var(--sh-xs)' }}>
              {icon}{label}
            </span>
          ))}
        </div>
      </section>

      {/* Feature trio */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {[
            {
              icon: <BookIcon size={22} />, color: 'var(--sky)', deep: 'var(--sky-deep)',
              title: 'Materi dulu, baru soal',
              desc: 'Setiap blok diawali penjelasan singkat dengan poin kunci + contoh. Bukan langsung kosong-asal-jawab.',
            },
            {
              icon: <PenIcon size={22} />, color: 'var(--mint)', deep: '#3FB7A2',
              title: 'Pembahasan per opsi',
              desc: 'Setiap jawaban A/B/C/D dijelaskan kenapa benar / salah — biar paham, bukan cuma tahu kuncinya.',
            },
            {
              icon: <SwordsIcon size={22} />, color: 'var(--pink)', deep: 'var(--pink-deep)',
              title: 'Belajar bareng partner',
              desc: 'Streak berdua, head-to-head bulanan, duel vocab 5 menit. Saling tarik biar konsisten.',
            },
          ].map((f, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-xl)', padding: 22, boxShadow: 'var(--sh-sm)', border: '1px solid rgba(26,43,60,0.05)' }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(140deg, ${f.color}, ${f.deep})`, color: '#fff', boxShadow: `0 8px 18px ${f.color}`, marginBottom: 14 }}>
                {f.icon}
              </div>
              <div className="f-display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', fontWeight: 600 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ maxWidth: 840, margin: '0 auto', padding: '0 28px 80px', textAlign: 'center' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))', borderRadius: 'var(--r-2xl)', padding: '36px 28px', boxShadow: '0 18px 44px rgba(96,195,245,0.40)', color: '#fff' }}>
          <h2 className="f-display" style={{ fontSize: 26, fontWeight: 700, margin: '0 0 8px', lineHeight: 1.2 }}>Siap mulai bareng partnermu?</h2>
          <p style={{ margin: '0 0 22px', fontSize: 15, opacity: 0.95, fontWeight: 600 }}>Gratis selamanya. Buat akun dalam 30 detik.</p>
          <Link href="/register" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
            height: 54, padding: '0 30px', borderRadius: 'var(--r-pill)',
            background: '#fff', color: 'var(--sky-ink)', textDecoration: 'none',
            fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700,
            boxShadow: '0 8px 22px rgba(0,0,0,0.18)',
          }}>
            Buat Akun Gratis <ArrowRightIcon size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
