'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Btn } from '@/components/ui/Btn';
import { Confetti } from '@/components/ui/Confetti';
import { LevelBadge } from '@/components/ui/Badge';
import { BookIcon, PenIcon, SparkleIcon, SwordsIcon, ClockIcon, TrophyIcon, CheckIcon, XIcon, FireIcon } from '@/components/ui/Icons';

const QS = [
  { block: 'Core', type: 'reading', passage: { title: 'Remote Work', text: 'More companies now let employees work from home. Studies show that remote workers often feel more productive because they avoid long commutes. However, some people miss the social side of an office and find it harder to separate work from their personal life.' }, q: 'According to the text, why do remote workers often feel more productive?', options: ['They earn more money', 'They avoid long commutes', 'They work fewer hours', 'They have no meetings'], answer: 1, explain: 'Teks menyebut remote workers merasa lebih produktif karena terhindar dari perjalanan jauh (commutes).' },
  { block: 'Core', type: 'tfng', q: '"Everyone prefers working from home." — Apakah pernyataan ini benar menurut teks?', options: ['True', 'False', 'Not Given'], answer: 1, explain: 'Teks justru bilang sebagian orang merindukan sisi sosial kantor — jadi pernyataan ini False.' },
  { block: 'Grammar', type: 'fill', prompt: 'Lengkapi kalimat (Past Simple):', pre: 'Last week I ', blank: true, post: ' a great article about study abroad.', options: ['read', 'readed', 'have read', 'reading'], answer: 0, explain: '"Read" adalah bentuk past dari to read (tidak berubah ejaan). "Readed" tidak ada.' },
  { block: 'Grammar', type: 'error', prompt: 'Pilih kalimat yang benar:', options: ["She don't likes coffee.", "She doesn't like coffee.", 'She not like coffee.', "She doesn't likes coffee."], answer: 1, explain: "Setelah doesn't, kata kerja kembali ke bentuk dasar: \"doesn't like\"." },
] as const;

const BLOCKS = [
  { name: 'Warm-up', icon: SparkleIcon },
  { name: 'Core', icon: BookIcon },
  { name: 'Grammar', icon: PenIcon },
  { name: 'Duel', icon: SwordsIcon },
];

export default function SessionPage() {
  const router = useRouter();
  const [idx, setIdx]     = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone]   = useState(false);
  const [secs, setSecs]   = useState(0);

  useEffect(() => { const t = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(t); }, []);
  const mmss = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  const q = QS[idx];
  const isCorrect = picked === q.answer;
  const curBlock = BLOCKS.findIndex(b => b.name === q.block);

  const check = () => { if (picked == null) return; setChecked(true); if (picked === q.answer) setCorrectCount(c => c + 1); };
  const next = () => {
    if (idx + 1 >= QS.length) { setDone(true); return; }
    setIdx(i => i + 1); setPicked(null); setChecked(false);
  };

  if (done) {
    const xp = 10 + correctCount * 2;
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, var(--sky-wash), var(--offwhite))', position: 'relative' }}>
        <Confetti run />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 26px 0', textAlign: 'center' }}>
          <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(140deg, var(--sky), var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)', animation: 'pop-in .5s forwards' }}>
            <TrophyIcon size={56} style={{ color: '#fff' }} />
          </div>
          <h2 className="f-display" style={{ fontSize: 26, fontWeight: 700, margin: '20px 0 4px', color: 'var(--ink)' }}>Sesi selesai!</h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontWeight: 700, fontSize: 14.5 }}>{correctCount} dari {QS.length} jawaban benar · {mmss}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, width: '100%' }}>
            <div style={{ flex: 1, background: '#fff', borderRadius: 'var(--r-lg)', padding: 16, boxShadow: 'var(--sh-sm)' }}>
              <div className="f-display tabular" style={{ fontSize: 28, fontWeight: 700, color: 'var(--sky-ink)' }}>+{xp}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>XP didapat</div>
            </div>
            <div style={{ flex: 1, background: '#fff', borderRadius: 'var(--r-lg)', padding: 16, boxShadow: 'var(--sh-sm)' }}>
              <div className="f-display tabular" style={{ fontSize: 28, fontWeight: 700, color: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <FireIcon size={24} />15
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>hari streak!</div>
            </div>
          </div>
        </div>
        <div style={{ padding: '16px 22px 34px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn icon={<SwordsIcon size={22} />} color="var(--pink)" deep="var(--pink-deep)" shadow="var(--sh-pink)" onClick={() => router.push('/duel')}>Lanjut ke Duel vs Jea</Btn>
          <Btn size="md" color="#fff" deep="#fff" shadow="none" style={{ color: 'var(--ink-2)', border: '1.5px solid rgba(26,43,60,0.1)' }} onClick={() => router.push('/dashboard')}>Nanti dulu</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)', position: 'relative' }}>
      {/* Header */}
      <div style={{ padding: '52px 18px 10px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} style={{ border: 'none', background: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--sh-xs)', color: 'var(--muted)' }}>✕</button>
          <div style={{ flex: 1, display: 'flex', gap: 6 }}>
            {BLOCKS.map((b, bi) => {
              const state = bi < curBlock ? 'done' : bi === curBlock ? 'active' : 'todo';
              const fill = state === 'done' ? 100 : state === 'active' ? ((idx + 1) / QS.filter(x => x.block === b.name).length) * 100 : 0;
              const Icon = b.icon;
              return (
                <div key={bi} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                  <div style={{ width: '100%', height: 6, borderRadius: 999, background: 'rgba(26,43,60,0.08)', overflow: 'hidden' }}>
                    <div style={{ width: `${fill}%`, height: '100%', background: state === 'done' ? 'var(--green)' : 'linear-gradient(90deg,var(--sky),var(--mint))', borderRadius: 999, transition: 'width .5s' }} />
                  </div>
                  <Icon size={13} style={{ color: state === 'todo' ? 'var(--faint)' : state === 'done' ? 'var(--green)' : 'var(--sky-ink)' }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--muted)', fontWeight: 800, fontSize: 13, background: '#fff', padding: '5px 10px', borderRadius: 999, boxShadow: 'var(--sh-xs)' }}>
            <ClockIcon size={14} /><span className="tabular">{mmss}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '6px 18px 16px' }} key={idx}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--sky-wash)', color: 'var(--sky-ink)', padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800, animation: 'rise-in .3s forwards', whiteSpace: 'nowrap' }}>
          {q.block === 'Grammar' ? <PenIcon size={14} /> : <BookIcon size={14} />}
          {q.block === 'Grammar' ? 'Grammar in Context' : 'Reading Comprehension'}
        </div>

        {'passage' in q && q.passage && (
          <div style={{ marginTop: 12, background: '#fff', borderRadius: 'var(--r-lg)', padding: 16, boxShadow: 'var(--sh-sm)', animation: 'rise-in .35s forwards' }}>
            <div className="f-display" style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 7, color: 'var(--ink)' }}>
              <BookIcon size={17} style={{ color: 'var(--sky)' }} />{q.passage.title} <LevelBadge level="B1" size="sm" />
            </div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-2)' }}>{q.passage.text}</p>
          </div>
        )}

        {'prompt' in q && q.prompt && (
          <div className="f-display" style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.35 }}>{q.prompt}</div>
        )}
        <div className="f-display" style={{ marginTop: 16, fontSize: 17, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35, animation: 'rise-in .4s forwards' }}>
          {'prompt' in q && q.prompt ? null : q.q}
        </div>
        {'blank' in q && q.blank && (
          <div className="f-display" style={{ marginTop: 10, fontSize: 18, fontWeight: 600, lineHeight: 1.5, color: 'var(--ink)' }}>
            {'pre' in q && q.pre}
            <span style={{ display: 'inline-block', minWidth: 70, borderBottom: `3px solid ${checked ? (isCorrect ? 'var(--green)' : 'var(--red)') : 'var(--sky)'}`, textAlign: 'center', color: checked ? (isCorrect ? 'var(--green)' : 'var(--red)') : 'var(--sky-ink)' }}>
              {picked != null ? q.options[picked] : '____'}
            </span>
            {'post' in q && q.post}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          {q.options.map((opt, oi) => {
            let bg = '#fff', bd = 'rgba(26,43,60,0.1)', col = 'var(--ink)';
            let ic: 'check' | 'x' | null = null;
            if (checked) {
              if (oi === q.answer) { bg = 'var(--green-soft)'; bd = 'var(--green)'; col = 'var(--green)'; ic = 'check'; }
              else if (oi === picked) { bg = 'var(--red-soft)'; bd = 'var(--red)'; col = 'var(--red)'; ic = 'x'; }
              else { col = 'var(--muted)'; }
            } else if (oi === picked) { bg = 'var(--sky-wash)'; bd = 'var(--sky)'; col = 'var(--sky-ink)'; }
            return (
              <button key={oi} disabled={checked} onClick={() => setPicked(oi)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--r-md)', border: `2px solid ${bd}`, background: bg, color: col, cursor: checked ? 'default' : 'pointer', fontSize: 15.5, fontWeight: 700, textAlign: 'left', transition: 'all .15s' }}>
                <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: oi === picked || (checked && oi === q.answer) ? 'transparent' : 'var(--offwhite)', fontSize: 13, fontWeight: 800, color: 'var(--muted)' }}>
                  {ic === 'check' ? <CheckIcon size={24} /> : ic === 'x' ? <XIcon size={24} /> : String.fromCharCode(65 + oi)}
                </span>
                <span style={{ flex: 1 }}>{opt}</span>
              </button>
            );
          })}
        </div>
        <div style={{ height: 90 }} />
      </div>

      {/* Footer */}
      {!checked ? (
        <div style={{ padding: '12px 20px 30px', flexShrink: 0 }}>
          <Btn disabled={picked == null} onClick={check}>Cek Jawaban</Btn>
        </div>
      ) : (
        <div style={{ flexShrink: 0, padding: '18px 20px 30px', borderRadius: '24px 24px 0 0', background: isCorrect ? 'var(--green-soft)' : 'var(--red-soft)', animation: 'rise-in .3s forwards', boxShadow: '0 -8px 24px rgba(26,43,60,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: isCorrect ? 'var(--green)' : 'var(--red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop-in .35s forwards' }}>
              {isCorrect ? <CheckIcon size={24} /> : <XIcon size={24} />}
            </div>
            <div className="f-display" style={{ fontSize: 19, fontWeight: 700, color: isCorrect ? 'var(--green)' : 'var(--red)' }}>{isCorrect ? 'Tepat sekali!' : 'Belum tepat'}</div>
          </div>
          {!isCorrect && <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>Jawaban: <span style={{ color: 'var(--green)' }}>{q.options[q.answer]}</span></div>}
          <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-2)', fontWeight: 600 }}>{q.explain}</p>
          <Btn color={isCorrect ? 'var(--green)' : 'var(--red)'} deep={isCorrect ? '#3C9C76' : '#E04848'} shadow="none" onClick={next}>{idx + 1 >= QS.length ? 'Selesai' : 'Lanjut'}</Btn>
        </div>
      )}
    </div>
  );
}
