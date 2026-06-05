'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Btn } from '@/components/ui/Btn';
import { Confetti } from '@/components/ui/Confetti';
import { LevelBadge } from '@/components/ui/Badge';
import { BookIcon, CheckIcon, XIcon, TrophyIcon, BoltIcon, ChevLIcon } from '@/components/ui/Icons';
import { markReadingComplete } from '../actions';

interface Article {
  id: string;
  slug: string;
  title: string;
  level: string;
  content: string;
  word_count: number;
  questions: { q: string; options: string[]; answer: number; explain: string }[];
  vocab_help: { word: string; def: string }[];
}

type Phase = 'read' | 'quiz' | 'done';

export function ReadingClient({ article }: { article: Article }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('read');
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [tappedWord, setTappedWord] = useState<string | null>(null);

  const q = article.questions[qIdx];
  const vocabMap = Object.fromEntries((article.vocab_help || []).map((v) => [v.word.toLowerCase(), v.def]));

  const check = () => {
    if (picked == null) return;
    setChecked(true);
    if (picked === q.answer) setCorrectCount((c) => c + 1);
  };

  const next = async () => {
    if (qIdx + 1 >= article.questions.length) {
      const xp = correctCount * 5 + 10;
      await markReadingComplete(article.id, correctCount, xp);
      setPhase('done');
      return;
    }
    setQIdx((i) => i + 1);
    setPicked(null);
    setChecked(false);
  };

  if (phase === 'done') {
    const xp = correctCount * 5 + 10;
    const passed = correctCount >= Math.ceil(article.questions.length * 0.6);
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, var(--mint-soft), var(--offwhite))', position: 'relative' }}>
        {passed && <Confetti run />}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 26px 0', textAlign: 'center' }}>
          <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(140deg, var(--mint), #3FB7A2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-green)', animation: 'pop-in .5s forwards' }}>
            <TrophyIcon size={56} style={{ color: '#fff' }} />
          </div>
          <h2 className="f-display" style={{ fontSize: 26, fontWeight: 700, margin: '20px 0 4px', color: 'var(--ink)' }}>Selesai!</h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontWeight: 700, fontSize: 14.5 }}>{correctCount}/{article.questions.length} benar</p>
          <div className="f-display" style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--mint)', color: '#fff', padding: '10px 20px', borderRadius: 999, fontWeight: 600, boxShadow: 'var(--sh-green)', fontSize: 18 }}>
            <BoltIcon size={20} style={{ color: 'var(--sunny)' }} /> +{xp} XP
          </div>
        </div>
        <div style={{ padding: '16px 22px 34px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn icon={<BookIcon size={22} />} color="var(--mint)" deep="#3FB7A2" shadow="var(--sh-green)" onClick={() => router.push('/learn/reading')}>Artikel lain</Btn>
          <Btn size="md" color="#fff" deep="#fff" shadow="none" style={{ color: 'var(--ink-2)', border: '1.5px solid rgba(26,43,60,0.1)' }} onClick={() => router.push('/dashboard')}>Kembali</Btn>
        </div>
      </div>
    );
  }

  if (phase === 'read') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)' }}>
        <div style={{ padding: '52px 18px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.push('/learn/reading')} style={{ border: 'none', background: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--sh-xs)', color: 'var(--muted)' }}>
            <ChevLIcon size={20} />
          </button>
          <div className="f-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>Baca dulu</div>
          <LevelBadge level={article.level.toUpperCase()} size="sm" />
        </div>

        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 110px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--mint-soft)', color: '#1A8870', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
            <BookIcon size={14} /> Reading · {article.word_count} kata
          </div>
          <h1 className="f-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', margin: '0 0 16px', lineHeight: 1.2 }}>{article.title}</h1>

          <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: 18, boxShadow: 'var(--sh-sm)', border: '1px solid rgba(26,43,60,0.04)' }}>
            <div style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--ink-2)', whiteSpace: 'pre-line', fontWeight: 500 }}>
              {article.content.split(/(\s+)/).map((token, i) => {
                const cleanWord = token.replace(/[.,!?;:]/g, '').toLowerCase();
                if (vocabMap[cleanWord]) {
                  return (
                    <span
                      key={i}
                      onClick={() => setTappedWord(tappedWord === cleanWord ? null : cleanWord)}
                      style={{
                        background: 'var(--sky-wash)',
                        color: 'var(--sky-ink)',
                        padding: '0 4px',
                        borderRadius: 4,
                        fontWeight: 700,
                        cursor: 'pointer',
                        borderBottom: '2px dashed var(--sky)',
                      }}
                    >
                      {token}
                    </span>
                  );
                }
                return <span key={i}>{token}</span>;
              })}
            </div>

            {tappedWord && (
              <div style={{ marginTop: 12, padding: 12, background: 'var(--sky-wash)', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--baby)' }}>
                <div className="f-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--sky-ink)' }}>{tappedWord}</div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 600, marginTop: 2 }}>{vocabMap[tappedWord]}</div>
              </div>
            )}
          </div>

          {article.vocab_help && article.vocab_help.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>📚 Vocab Bantuan</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {article.vocab_help.map((v, i) => (
                  <div key={i} style={{ background: '#fff', padding: '10px 14px', borderRadius: 'var(--r-sm)', border: '1px solid rgba(26,43,60,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="f-display" style={{ fontSize: 14, fontWeight: 700, color: 'var(--sky-ink)', minWidth: 90 }}>{v.word}</span>
                    <span style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600 }}>{v.def}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '12px 20px 30px', background: 'linear-gradient(180deg, rgba(247,251,255,0), var(--offwhite) 30%)' }}>
          <Btn color="var(--mint)" deep="#3FB7A2" shadow="var(--sh-green)" onClick={() => setPhase('quiz')}>Sudah Baca, Quiz! →</Btn>
        </div>
      </div>
    );
  }

  // quiz phase
  const isCorrect = picked === q.answer;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)' }}>
      <div style={{ padding: '52px 18px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button onClick={() => setPhase('read')} style={{ border: 'none', background: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--sh-xs)', color: 'var(--muted)' }}>
            <ChevLIcon size={18} />
          </button>
          <div className="f-display" style={{ fontSize: 14, fontWeight: 700, color: 'var(--muted)' }}>Quiz · {article.title}</div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {article.questions.map((_, k) => (
            <div key={k} style={{ flex: 1, height: 5, borderRadius: 999, background: k < qIdx ? 'var(--green)' : k === qIdx ? 'var(--mint)' : 'rgba(26,43,60,0.08)' }} />
          ))}
        </div>
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 16px' }} key={qIdx}>
        <div className="f-display" style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Soal {qIdx + 1} dari {article.questions.length}</div>
        <div className="f-display" style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35, animation: 'rise-in .4s forwards' }}>{q.q}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          {q.options.map((opt, oi) => {
            let bg = '#fff', bd = 'rgba(26,43,60,0.1)', col = 'var(--ink)';
            let ic: 'check' | 'x' | null = null;
            if (checked) {
              if (oi === q.answer) { bg = 'var(--green-soft)'; bd = 'var(--green)'; col = 'var(--green)'; ic = 'check'; }
              else if (oi === picked) { bg = 'var(--red-soft)'; bd = 'var(--red)'; col = 'var(--red)'; ic = 'x'; }
              else { col = 'var(--muted)'; }
            } else if (oi === picked) { bg = 'var(--mint-soft)'; bd = 'var(--mint)'; col = '#1A8870'; }
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
          <Btn disabled={picked == null} color="var(--mint)" deep="#3FB7A2" shadow="var(--sh-green)" onClick={check}>Cek Jawaban</Btn>
        </div>
      ) : (
        <div style={{ padding: '18px 20px 30px', borderRadius: '24px 24px 0 0', background: isCorrect ? 'var(--green-soft)' : 'var(--red-soft)', boxShadow: '0 -8px 24px rgba(26,43,60,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: isCorrect ? 'var(--green)' : 'var(--red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isCorrect ? <CheckIcon size={24} /> : <XIcon size={24} />}
            </div>
            <div className="f-display" style={{ fontSize: 19, fontWeight: 700, color: isCorrect ? 'var(--green)' : 'var(--red)' }}>{isCorrect ? 'Tepat!' : 'Belum tepat'}</div>
          </div>
          {!isCorrect && <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>Jawaban: <span style={{ color: 'var(--green)' }}>{q.options[q.answer]}</span></div>}
          <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.5, color: 'var(--ink-2)', fontWeight: 600 }}>{q.explain}</p>
          <Btn color={isCorrect ? 'var(--green)' : 'var(--red)'} deep={isCorrect ? '#3C9C76' : '#E04848'} shadow="none" onClick={next}>{qIdx + 1 >= article.questions.length ? 'Selesai' : 'Lanjut'}</Btn>
        </div>
      )}
    </div>
  );
}
