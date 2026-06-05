'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, ME, PARTNER } from '@/components/ui/Avatar';
import { Btn } from '@/components/ui/Btn';
import { Confetti } from '@/components/ui/Confetti';
import { BoltIcon, CrownIcon, SwordsIcon, RefreshIcon, CheckCircleIcon, XCircleIcon } from '@/components/ui/Icons';

const QS = [
  { w: 'reliable',    opts: ['dapat diandalkan', 'terlambat', 'mahal', 'sulit'], a: 0 },
  { w: 'improve',     opts: ['menghapus', 'meningkatkan', 'membeli', 'berhenti'], a: 1 },
  { w: 'commute',     opts: ['memasak', 'tidur', 'pergi-pulang kerja', 'menulis'], a: 2 },
  { w: 'deadline',    opts: ['batas waktu', 'liburan', 'gaji', 'rapat'], a: 0 },
  { w: 'opportunity', opts: ['masalah', 'kesempatan', 'kebiasaan', 'alat'], a: 1 },
];
const PARTNER_RIGHT = [true, true, false, true, true];

type Phase = 'answer' | 'waiting' | 'reveal';

export default function DuelActivePage() {
  const router = useRouter();
  const [qi, setQi]       = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [phase, setPhase]  = useState<Phase>('answer');
  const [me, setMe]        = useState(0);
  const [pa, setPa]        = useState(0);
  const [paAns, setPaAns]  = useState(false);
  const [time, setTime]    = useState(20);
  const [finished, setFinished] = useState(false);
  const q = QS[qi];

  useEffect(() => {
    if (phase !== 'answer' || finished) return;
    if (time <= 0) { choose(null); return; }
    const t = setTimeout(() => setTime(s => s - 1), 1000);
    return () => clearTimeout(t);
  });

  const choose = (idx: number | null) => {
    setPicked(idx);
    setPhase('waiting');
    setTimeout(() => {
      const right = idx === q.a;
      if (right) setMe(m => m + 1);
      const pr = PARTNER_RIGHT[qi];
      setPaAns(pr);
      if (pr) setPa(p => p + 1);
      setPhase('reveal');
      setTimeout(() => {
        if (qi + 1 >= QS.length) { setFinished(true); return; }
        setQi(n => n + 1); setPicked(null); setPhase('answer'); setTime(20);
      }, 1600);
    }, 900);
  };

  if (finished) {
    const win = me > pa, tie = me === pa;
    const xp = win ? 5 : 2;
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: win ? 'linear-gradient(180deg,var(--pink-wash),var(--offwhite))' : 'linear-gradient(180deg,var(--sky-wash),var(--offwhite))', position: 'relative' }}>
        {win && <Confetti run />}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 26px 0', textAlign: 'center' }}>
          <div style={{ animation: 'pop-in .5s forwards', position: 'relative' }}>
            <Avatar {...(win ? ME : PARTNER)} size={104} glow ring />
            <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%) rotate(-8deg)', color: 'var(--sunny)', filter: 'drop-shadow(0 4px 8px rgba(245,166,35,.4))' }}>
              <CrownIcon size={42} />
            </div>
          </div>
          <h2 className="f-display" style={{ fontSize: 27, fontWeight: 700, margin: '20px 0 2px', color: 'var(--ink)' }}>
            {tie ? 'Seri!' : win ? 'Kamu Menang!' : 'Jea Menang'}
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontWeight: 700 }}>
            {tie ? 'Sama kuat, lanjut besok!' : win ? 'Mantap, pertahankan win streak!' : 'Tantang balik besok ya'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 26, background: '#fff', borderRadius: 'var(--r-xl)', padding: '18px 24px', boxShadow: 'var(--sh-md)' }}>
            <div style={{ textAlign: 'center' }}>
              <Avatar {...ME} size={36} style={{ margin: '0 auto' }} />
              <div className="f-display tabular" style={{ fontSize: 34, fontWeight: 700, color: 'var(--pink-ink)', marginTop: 6 }}>{me}</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)' }}>Dawud</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--faint)' }}>—</div>
            <div style={{ textAlign: 'center' }}>
              <Avatar {...PARTNER} size={36} style={{ margin: '0 auto' }} />
              <div className="f-display tabular" style={{ fontSize: 34, fontWeight: 700, color: 'var(--sky-ink)', marginTop: 6 }}>{pa}</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)' }}>Jea</div>
            </div>
          </div>
          <div className="f-display" style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--sky)', color: '#fff', padding: '8px 16px', borderRadius: 999, fontWeight: 600, boxShadow: 'var(--sh-blue)' }}>
            <BoltIcon size={16} style={{ color: 'var(--sunny)' }} /> +{xp} XP
          </div>
        </div>
        <div style={{ padding: '14px 22px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn icon={<RefreshIcon size={22} />} color="var(--pink)" deep="var(--pink-deep)" shadow="var(--sh-pink)" onClick={() => { setQi(0); setPicked(null); setPhase('answer'); setMe(0); setPa(0); setTime(20); setFinished(false); }}>Rematch</Btn>
          <Btn size="md" color="#fff" deep="#fff" shadow="none" style={{ color: 'var(--ink-2)', border: '1.5px solid rgba(26,43,60,0.1)' }} onClick={() => router.push('/dashboard')}>Selesai</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #fff, var(--offwhite))' }}>
      {/* VS header */}
      <div style={{ padding: '52px 18px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
            <Avatar {...ME} size={40} ring />
            <div>
              <div className="f-display tabular" style={{ fontSize: 22, fontWeight: 700, color: 'var(--pink-ink)', lineHeight: 1 }}>{me}</div>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--muted)' }}>Dawud</div>
            </div>
          </div>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#fff', boxShadow: 'var(--sh-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: time <= 5 ? '2.5px solid var(--red)' : '2.5px solid var(--sky)' }}>
            <span className="f-display tabular" style={{ fontSize: 22, fontWeight: 700, color: time <= 5 ? 'var(--red)' : 'var(--ink)', lineHeight: 1 }}>{time}</span>
            <span style={{ fontSize: 8.5, fontWeight: 800, color: 'var(--muted)' }}>detik</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
            <div style={{ textAlign: 'right' }}>
              <div className="f-display tabular" style={{ fontSize: 22, fontWeight: 700, color: 'var(--sky-ink)', lineHeight: 1 }}>{pa}</div>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--muted)' }}>Jea</div>
            </div>
            <Avatar {...PARTNER} size={40} ring />
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 5 }}>
          {QS.map((_, k) => (
            <div key={k} style={{ flex: 1, height: 5, borderRadius: 999, background: k < qi ? 'var(--sky)' : k === qi ? 'var(--baby)' : 'rgba(26,43,60,0.08)' }} />
          ))}
        </div>
      </div>

      {/* Question */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px' }} key={qi}>
        <div style={{ textAlign: 'center', animation: 'rise-in .3s forwards' }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Apa arti kata ini?</div>
          <div className="f-display" style={{ fontSize: 40, fontWeight: 700, color: 'var(--ink)', margin: '6px 0 4px' }}>{q.w}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
          {q.opts.map((opt, i) => {
            let bg = '#fff', bd = 'rgba(26,43,60,0.1)', col = 'var(--ink)';
            if (phase === 'reveal') {
              if (i === q.a) { bg = 'var(--green-soft)'; bd = 'var(--green)'; col = 'var(--green)'; }
              else if (i === picked) { bg = 'var(--red-soft)'; bd = 'var(--red)'; col = 'var(--red)'; }
              else col = 'var(--muted)';
            } else if (i === picked) { bg = 'var(--pink-wash)'; bd = 'var(--pink)'; col = 'var(--pink-ink)'; }
            return (
              <button key={i} disabled={phase !== 'answer'} onClick={() => choose(i)} style={{ padding: '15px 18px', borderRadius: 'var(--r-pill)', border: `2px solid ${bd}`, background: bg, color: col, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, cursor: phase === 'answer' ? 'pointer' : 'default', textAlign: 'center', transition: 'all .15s' }}>
                {opt}
              </button>
            );
          })}
        </div>
        <div style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 }}>
          {phase === 'waiting' && (
            <><span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--sky-ink)' }}>Jea sedang menjawab</span>
              <TypingDots /></>
          )}
          {phase === 'reveal' && (
            <span style={{ fontSize: 12.5, fontWeight: 800, color: paAns ? 'var(--green)' : 'var(--red)', display: 'flex', alignItems: 'center', gap: 5 }}>
              {paAns ? <CheckCircleIcon size={16} /> : <XCircleIcon size={16} />}
              Jea {paAns ? 'benar' : 'salah'}
            </span>
          )}
        </div>
      </div>
      <div style={{ height: 30 }} />
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sky)', animation: `dot-bounce 1s ${i * 0.15}s infinite` }} />
      ))}
    </div>
  );
}
