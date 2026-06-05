'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Btn } from '@/components/ui/Btn';
import { SparkleIcon, BookIcon, EyeIcon, RefreshIcon, CheckIcon, ClockIcon, SoundIcon } from '@/components/ui/Icons';

const WORDS = [
  { word: 'commute',     pos: 'verb',      ipa: '/kəˈmjuːt/', id: 'pergi-pulang kerja secara rutin', ex: ['I ', 'commute', ' to the office for an hour every day.'] },
  { word: 'reliable',   pos: 'adjective', ipa: '/rɪˈlaɪəbl/', id: 'dapat diandalkan; bisa dipercaya', ex: ['She is the most ', 'reliable', ' member of our team.'] },
  { word: 'opportunity',pos: 'noun',      ipa: '/ˌɒpəˈtjuːnəti/', id: 'kesempatan atau peluang', ex: ['Studying abroad is a great ', 'opportunity', ' to grow.'] },
  { word: 'improve',    pos: 'verb',      ipa: '/ɪmˈpruːv/', id: 'meningkatkan; memperbaiki', ex: ['I want to ', 'improve', ' my speaking before the interview.'] },
  { word: 'deadline',   pos: 'noun',      ipa: '/ˈdedlaɪn/', id: 'batas waktu penyelesaian', ex: ['We finished the report before the ', 'deadline', '.'] },
];
const TOTAL = 10;

export default function VocabPage() {
  const router = useRouter();
  const [i, setI]           = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [done, setDone]     = useState(false);
  const w = WORDS[i % WORDS.length];

  const rate = (level: string) => {
    const next = [...results, level];
    setResults(next);
    if (i + 1 >= WORDS.length) { setDone(true); return; }
    setFlipped(false);
    setTimeout(() => setI(n => n + 1), 180);
  };

  if (done) {
    const hafal = results.filter(r => r === 'hafal').length;
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, var(--mint-soft), var(--offwhite))', alignItems: 'center', justifyContent: 'center', padding: 26, textAlign: 'center' }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(140deg, var(--mint), #3FB7A2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-green)', animation: 'pop-in .5s forwards' }}>
          <SparkleIcon size={52} style={{ color: '#fff' }} />
        </div>
        <h2 className="f-display" style={{ fontSize: 24, fontWeight: 700, margin: '18px 0 4px' }}>Warm-up beres!</h2>
        <p style={{ margin: 0, color: 'var(--muted)', fontWeight: 700 }}>{hafal}/{WORDS.length} kata kamu kuasai hari ini</p>
        <div style={{ marginTop: 26, width: '100%' }}>
          <Btn icon={<BookIcon size={22} />} onClick={() => router.push('/learn/session')}>Lanjut ke Core Skill</Btn>
          <div style={{ height: 10 }} />
          <Btn size="md" color="#fff" deep="#fff" shadow="none" style={{ color: 'var(--ink-2)', border: '1.5px solid rgba(26,43,60,0.1)' }} onClick={() => router.push('/dashboard')}>Kembali ke Home</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)' }}>
      {/* Header */}
      <div style={{ padding: '52px 18px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => router.back()} style={{ border: 'none', background: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--sh-xs)', color: 'var(--muted)' }}>✕</button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {WORDS.map((_, k) => (
              <div key={k} style={{ flex: 1, height: 6, borderRadius: 999, background: k < i ? 'var(--mint)' : k === i ? 'var(--sky)' : 'rgba(26,43,60,0.08)', transition: 'background .3s' }} />
            ))}
          </div>
        </div>
        <span className="f-display tabular" style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)' }}>{i + 1} / {TOTAL}</span>
      </div>

      {/* Card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 22px' }}>
        <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', height: 380, cursor: 'pointer', position: 'relative' }}>
          <div key={flipped ? 'b' : 'f'} style={{ position: 'absolute', inset: 0, borderRadius: 'var(--r-2xl)', boxShadow: 'var(--sh-md)', animation: 'pop-in .34s', overflow: 'hidden', background: flipped ? 'linear-gradient(165deg, var(--sky-wash), #fff)' : '#fff', border: flipped ? '1px solid rgba(96,195,245,0.25)' : '1px solid rgba(26,43,60,0.05)', display: 'flex', flexDirection: 'column', alignItems: flipped ? 'stretch' : 'center', justifyContent: 'center', padding: flipped ? 26 : 24 }}>
            {!flipped ? (
              <>
                <span style={{ position: 'absolute', top: 18, left: 20, fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)', background: 'var(--sky-wash)', padding: '4px 11px', borderRadius: 999 }}>{w.pos}</span>
                <button onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 16, right: 18, border: 'none', background: 'var(--sky-wash)', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sky-ink)', cursor: 'pointer' }}>
                  <SoundIcon size={20} />
                </button>
                <div className="f-display" style={{ fontSize: 42, fontWeight: 700, color: 'var(--ink)', textAlign: 'center', lineHeight: 1.05 }}>{w.word}</div>
                <div style={{ fontSize: 17, color: 'var(--muted)', fontWeight: 600, marginTop: 8 }}>{w.ipa}</div>
                <div style={{ position: 'absolute', bottom: 22, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--faint)', fontSize: 13, fontWeight: 700 }}>
                  <EyeIcon size={16} /> Ketuk untuk lihat arti
                </div>
              </>
            ) : (
              <>
                <span style={{ alignSelf: 'flex-start', fontSize: 11, fontWeight: 800, color: 'var(--sky-ink)', background: 'var(--sky-wash)', padding: '3px 10px', borderRadius: 999, marginBottom: 10 }}>{w.pos}</span>
                <div className="f-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)' }}>{w.word}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600, marginTop: 2 }}>{w.ipa}</div>
                <div style={{ height: 1, background: 'rgba(26,43,60,0.08)', margin: '14px 0' }} />
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)', letterSpacing: 0.4, textTransform: 'uppercase' }}>Arti</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginTop: 4, lineHeight: 1.35 }}>{w.id}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)', letterSpacing: 0.4, textTransform: 'uppercase', marginTop: 16 }}>Contoh</div>
                <div style={{ fontSize: 15.5, color: 'var(--ink-2)', marginTop: 4, lineHeight: 1.5, fontStyle: 'italic' }}>
                  &ldquo;{w.ex[0]}<span className="f-display" style={{ color: 'var(--sky-ink)', fontWeight: 700, fontStyle: 'normal' }}>{w.ex[1]}</span>{w.ex[2]}&rdquo;
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div style={{ padding: '8px 20px 32px', flexShrink: 0 }}>
        {flipped ? (
          <div style={{ display: 'flex', gap: 9, animation: 'rise-in .3s forwards' }}>
            {[
              { label: 'Belum hafal', c: 'var(--red)',   soft: 'var(--red-soft)',   lvl: 'belum',  ic: <RefreshIcon size={20} /> },
              { label: 'Hampir',      c: 'var(--amber)', soft: 'var(--amber-soft)', lvl: 'hampir', ic: <ClockIcon size={20} /> },
              { label: 'Hafal!',      c: 'var(--green)', soft: 'var(--green-soft)', lvl: 'hafal',  ic: <CheckIcon size={20} /> },
            ].map(b => (
              <button key={b.lvl} onClick={() => rate(b.lvl)} style={{ flex: 1, border: `2px solid ${b.c}`, background: b.soft, color: b.c, borderRadius: 'var(--r-md)', padding: '12px 6px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600 }}>
                {b.ic}{b.label}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13.5, fontWeight: 700, padding: '14px 0' }}>
            Coba ingat artinya dulu, lalu ketuk kartu
          </div>
        )}
      </div>
    </div>
  );
}
