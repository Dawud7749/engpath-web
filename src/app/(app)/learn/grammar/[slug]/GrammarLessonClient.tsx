'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Btn } from '@/components/ui/Btn';
import { Confetti } from '@/components/ui/Confetti';
import { LevelBadge } from '@/components/ui/Badge';
import { PenIcon, CheckIcon, XIcon, BookIcon, TrophyIcon, BoltIcon, ChevLIcon } from '@/components/ui/Icons';
import { markGrammarComplete } from '../actions';

interface Lesson {
  id: string;
  slug: string;
  title: string;
  level: string;
  explanation: string;
  examples: { en: string; id: string; highlight?: string }[];
  exercises: { q: string; options: string[]; answer: number; explain: string }[];
}

type Phase = 'learn' | 'practice' | 'done';

export function GrammarLessonClient({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('learn');
  const [exIdx, setExIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const ex = lesson.exercises[exIdx];

  const check = () => {
    if (picked == null) return;
    setChecked(true);
    if (picked === ex.answer) setCorrectCount((c) => c + 1);
  };

  const next = async () => {
    if (exIdx + 1 >= lesson.exercises.length) {
      const xp = correctCount * 5 + 10;
      await markGrammarComplete(lesson.id, correctCount, xp);
      setPhase('done');
      return;
    }
    setExIdx((i) => i + 1);
    setPicked(null);
    setChecked(false);
  };

  if (phase === 'done') {
    const xp = correctCount * 5 + 10;
    const passed = correctCount >= Math.ceil(lesson.exercises.length * 0.6);
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, var(--sky-wash), var(--offwhite))', position: 'relative' }}>
        {passed && <Confetti run />}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 26px 0', textAlign: 'center' }}>
          <div style={{ width: 110, height: 110, borderRadius: '50%', background: passed ? 'linear-gradient(140deg, var(--sky), var(--sky-deep))' : 'linear-gradient(140deg, var(--amber), #D89020)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: passed ? 'var(--sh-blue)' : '0 10px 22px rgba(245,166,35,0.4)', animation: 'pop-in .5s forwards' }}>
            <TrophyIcon size={56} style={{ color: '#fff' }} />
          </div>
          <h2 className="f-display" style={{ fontSize: 26, fontWeight: 700, margin: '20px 0 4px', color: 'var(--ink)' }}>
            {passed ? 'Pelajaran Tuntas!' : 'Lumayan!'}
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontWeight: 700, fontSize: 14.5 }}>
            {correctCount} dari {lesson.exercises.length} jawaban benar
          </p>
          <div className="f-display" style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--sky)', color: '#fff', padding: '10px 20px', borderRadius: 999, fontWeight: 600, boxShadow: 'var(--sh-blue)', fontSize: 18 }}>
            <BoltIcon size={20} style={{ color: 'var(--sunny)' }} /> +{xp} XP
          </div>
        </div>
        <div style={{ padding: '16px 22px 34px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn icon={<BookIcon size={22} />} onClick={() => router.push('/learn/grammar')}>Pelajaran lain</Btn>
          <Btn size="md" color="#fff" deep="#fff" shadow="none" style={{ color: 'var(--ink-2)', border: '1.5px solid rgba(26,43,60,0.1)' }} onClick={() => router.push('/dashboard')}>Kembali ke Home</Btn>
        </div>
      </div>
    );
  }

  if (phase === 'learn') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)' }}>
        <div style={{ padding: '52px 18px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.push('/learn/grammar')} style={{ border: 'none', background: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--sh-xs)', color: 'var(--muted)' }}>
            <ChevLIcon size={20} />
          </button>
          <div className="f-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>Pelajari Dulu</div>
          <LevelBadge level={lesson.level.toUpperCase()} size="sm" />
        </div>

        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 100px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--sunny-soft)', color: '#B8800F', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
            <PenIcon size={14} /> Grammar
          </div>
          <h1 className="f-display" style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', margin: '0 0 16px', lineHeight: 1.2 }}>{lesson.title}</h1>

          {/* Explanation */}
          <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: 18, boxShadow: 'var(--sh-sm)', border: '1px solid rgba(26,43,60,0.04)' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>📚 Aturan</div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', fontWeight: 600, whiteSpace: 'pre-line' }}>{lesson.explanation}</p>
          </div>

          {/* Examples */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>💡 Contoh Kalimat</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {lesson.examples.map((ex, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-md)', padding: 14, boxShadow: 'var(--sh-xs)', border: '1px solid rgba(26,43,60,0.04)' }}>
                  <div className="f-display" style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>
                    {ex.highlight
                      ? ex.en.split(ex.highlight).map((part, j, arr) => (
                          <span key={j}>
                            {part}
                            {j < arr.length - 1 && (
                              <span style={{ background: 'var(--sky-wash)', color: 'var(--sky-ink)', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>{ex.highlight}</span>
                            )}
                          </span>
                        ))
                      : ex.en}
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--muted)', fontWeight: 600, marginTop: 4, fontStyle: 'italic' }}>{ex.id}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 20px 30px', flexShrink: 0, background: 'linear-gradient(180deg, rgba(247,251,255,0), var(--offwhite) 30%)' }}>
          <Btn onClick={() => setPhase('practice')}>Saya Sudah Paham, Latihan! →</Btn>
        </div>
      </div>
    );
  }

  // practice phase
  const isCorrect = picked === ex.answer;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)' }}>
      <div style={{ padding: '52px 18px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button onClick={() => setPhase('learn')} style={{ border: 'none', background: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--sh-xs)', color: 'var(--muted)', fontSize: 14, fontWeight: 800 }}>
            <ChevLIcon size={18} />
          </button>
          <div className="f-display" style={{ fontSize: 14, fontWeight: 700, color: 'var(--muted)' }}>Latihan · {lesson.title}</div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {lesson.exercises.map((_, k) => (
            <div key={k} style={{ flex: 1, height: 5, borderRadius: 999, background: k < exIdx ? 'var(--green)' : k === exIdx ? 'var(--sky)' : 'rgba(26,43,60,0.08)' }} />
          ))}
        </div>
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 16px' }} key={exIdx}>
        <div className="f-display" style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Soal {exIdx + 1} dari {lesson.exercises.length}</div>
        <div className="f-display" style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35, animation: 'rise-in .4s forwards' }}>{ex.q}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          {ex.options.map((opt, oi) => {
            let bg = '#fff', bd = 'rgba(26,43,60,0.1)', col = 'var(--ink)';
            let ic: 'check' | 'x' | null = null;
            if (checked) {
              if (oi === ex.answer) { bg = 'var(--green-soft)'; bd = 'var(--green)'; col = 'var(--green)'; ic = 'check'; }
              else if (oi === picked) { bg = 'var(--red-soft)'; bd = 'var(--red)'; col = 'var(--red)'; ic = 'x'; }
              else { col = 'var(--muted)'; }
            } else if (oi === picked) { bg = 'var(--sky-wash)'; bd = 'var(--sky)'; col = 'var(--sky-ink)'; }
            return (
              <button key={oi} disabled={checked} onClick={() => setPicked(oi)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--r-md)', border: `2px solid ${bd}`, background: bg, color: col, cursor: checked ? 'default' : 'pointer', fontSize: 15.5, fontWeight: 700, textAlign: 'left' }}>
                <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--offwhite)', fontSize: 13, fontWeight: 800, color: 'var(--muted)' }}>
                  {ic === 'check' ? <CheckIcon size={20} /> : ic === 'x' ? <XIcon size={20} /> : String.fromCharCode(65 + oi)}
                </span>
                <span style={{ flex: 1 }}>{opt}</span>
              </button>
            );
          })}
        </div>
        <div style={{ height: 100 }} />
      </div>

      {!checked ? (
        <div style={{ padding: '12px 20px 30px' }}>
          <Btn disabled={picked == null} onClick={check}>Cek Jawaban</Btn>
        </div>
      ) : (
        <div style={{ padding: '18px 20px 30px', borderRadius: '24px 24px 0 0', background: isCorrect ? 'var(--green-soft)' : 'var(--red-soft)', animation: 'rise-in .3s forwards', boxShadow: '0 -8px 24px rgba(26,43,60,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: isCorrect ? 'var(--green)' : 'var(--red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop-in .35s forwards' }}>
              {isCorrect ? <CheckIcon size={24} /> : <XIcon size={24} />}
            </div>
            <div className="f-display" style={{ fontSize: 19, fontWeight: 700, color: isCorrect ? 'var(--green)' : 'var(--red)' }}>{isCorrect ? 'Tepat!' : 'Belum tepat'}</div>
          </div>
          {!isCorrect && <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>Jawaban: <span style={{ color: 'var(--green)' }}>{ex.options[ex.answer]}</span></div>}
          <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-2)', fontWeight: 600 }}>{ex.explain}</p>
          <Btn color={isCorrect ? 'var(--green)' : 'var(--red)'} deep={isCorrect ? '#3C9C76' : '#E04848'} shadow="none" onClick={next}>{exIdx + 1 >= lesson.exercises.length ? 'Selesai' : 'Lanjut'}</Btn>
        </div>
      )}
    </div>
  );
}
