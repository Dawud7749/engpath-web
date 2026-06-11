'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Btn } from '@/components/ui/Btn';
import { Confetti } from '@/components/ui/Confetti';
import { LevelBadge } from '@/components/ui/Badge';
import {
  BookIcon, PenIcon, SparkleIcon, SwordsIcon, ClockIcon,
  TrophyIcon, CheckIcon, XIcon, FireIcon, BoltIcon, ArrowRightIcon,
} from '@/components/ui/Icons';
import { markBlockComplete } from './actions';

type LessonPoint = { word: string; mean: string; ex?: string };
type Lesson = { title: string; subtitle: string; intro: string; points: LessonPoint[]; tip?: string };
type Question = {
  type: 'vocab' | 'reading' | 'tfng' | 'fill' | 'error';
  passage?: { title: string; text: string };
  q?: string;
  prompt?: string;
  pre?: string; post?: string; blank?: boolean;
  options: readonly string[];
  answer: number;
  optionExplain: string[];
  explain: string;
};
type Block = {
  key: string; name: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color: string; deep: string;
  lesson: Lesson;
  questions: Question[];
};

const BLOCKS: Block[] = [
  {
    key: 'warmup', name: 'Warm-up', Icon: SparkleIcon, color: 'var(--sunny)', deep: '#F2B43C',
    lesson: {
      title: 'Warm-up Vocabulary',
      subtitle: 'Pemanasan dengan kosakata kerja kantor',
      intro: 'Sebelum masuk soal, kita kenalan dulu dengan kosakata penting yang sering muncul di konteks pekerjaan modern (remote work, productivity, commute). Pahami artinya supaya bisa jawab dengan cepat.',
      points: [
        { word: 'commute (n/v)',    mean: 'perjalanan rutin dari rumah ke kantor', ex: '"My commute takes 1 hour."' },
        { word: 'productive (adj)', mean: 'menghasilkan banyak / efektif',          ex: '"I feel more productive at home."' },
        { word: 'remote (adj)',     mean: 'jarak jauh / tidak di kantor',           ex: '"Remote work is flexible."' },
        { word: 'employee (n)',     mean: 'karyawan / pegawai',                     ex: '"The company has 200 employees."' },
      ],
      tip: 'Tip: Catat kata baru di modul Vocabulary supaya muncul di sesi review besok.',
    },
    questions: [
      {
        type: 'vocab',
        q: 'Pilih sinonim paling tepat untuk kata "productive":',
        options: ['lazy', 'efficient', 'absent', 'tired'],
        answer: 1,
        optionExplain: [
          'Salah. "lazy" = malas, kebalikan dari produktif.',
          'Benar. "efficient" = efisien/menghasilkan banyak, sinonim terdekat untuk productive.',
          'Salah. "absent" = tidak hadir, tidak terkait produktivitas.',
          'Salah. "tired" = lelah, lebih ke kondisi fisik bukan output kerja.',
        ],
        explain: 'Productive = menghasilkan banyak output. Sinonim paling dekat: efficient.',
      },
    ],
  },
  {
    key: 'core', name: 'Core', Icon: BookIcon, color: 'var(--sky)', deep: 'var(--sky-deep)',
    lesson: {
      title: 'Reading Comprehension',
      subtitle: 'Memahami inti & detail bacaan B1',
      intro: 'Reading comprehension melatih kamu menemukan informasi dari teks. Ada 3 tipe pertanyaan utama:',
      points: [
        { word: 'Main idea', mean: 'ide utama paragraf — biasanya di kalimat pertama atau terakhir' },
        { word: 'Detail',    mean: 'informasi spesifik (angka, nama, alasan) — scan teks dengan kata kunci dari pertanyaan' },
        { word: 'Inference', mean: 'kesimpulan yang TIDAK ditulis langsung tapi bisa disimpulkan dari konteks' },
        { word: 'T / F / NG', mean: 'True = sesuai teks, False = bertentangan, Not Given = tidak disebut sama sekali' },
      ],
      tip: 'Strategi: baca pertanyaan dulu sebelum baca teks panjang.',
    },
    questions: [
      {
        type: 'reading',
        passage: {
          title: 'Remote Work',
          text: 'More companies now let employees work from home. Studies show that remote workers often feel more productive because they avoid long commutes. However, some people miss the social side of an office and find it harder to separate work from their personal life.',
        },
        q: 'According to the text, why do remote workers often feel more productive?',
        options: ['They earn more money', 'They avoid long commutes', 'They work fewer hours', 'They have no meetings'],
        answer: 1,
        optionExplain: [
          'Salah. Teks tidak menyebut soal uang.',
          'Benar. Teks bilang: "...because they avoid long commutes."',
          'Salah. Teks tidak membahas jumlah jam kerja.',
          'Salah. Teks tidak menyebut soal meeting.',
        ],
        explain: 'Pertanyaan tipe detail. Cari kata kunci "productive" di teks — kalimat berikutnya menjawab langsung.',
      },
      {
        type: 'tfng',
        q: '"Everyone prefers working from home." — Apakah pernyataan ini benar menurut teks?',
        options: ['True', 'False', 'Not Given'],
        answer: 1,
        optionExplain: [
          'Salah. Teks tidak bilang semua orang lebih suka kerja dari rumah.',
          'Benar. Teks menyebut "some people miss the social side of an office" — bertentangan dengan "everyone prefers".',
          'Salah. Topik disebut, jadi bukan Not Given.',
        ],
        explain: 'Kata "everyone" itu kunci. Begitu teks menyebut ada yang TIDAK setuju, pernyataan absolut "everyone" otomatis False.',
      },
    ],
  },
  {
    key: 'grammar', name: 'Grammar', Icon: PenIcon, color: 'var(--mint)', deep: '#3FB7A2',
    lesson: {
      title: 'Past Simple & Present Negation',
      subtitle: 'Bentuk lampau & kalimat negatif',
      intro: 'Dua aturan grammar yang sering jadi jebakan: bentuk past tense + cara membuat negatif dengan don\'t/doesn\'t.',
      points: [
        { word: 'Past Simple regular',   mean: 'V + -ed → "walk" jadi "walked", "play" jadi "played"' },
        { word: 'Past Simple irregular', mean: '"read" tetap "read" (cara baca beda), "go" jadi "went", "eat" jadi "ate"' },
        { word: "don't / doesn't",       mean: 'I/you/we/they → "don\'t" + V dasar.  he/she/it → "doesn\'t" + V dasar.' },
        { word: 'Aturan emas',           mean: 'Setelah don\'t / doesn\'t / didn\'t, verb KEMBALI ke bentuk dasar.' },
      ],
      tip: 'Hafalkan: "She doesn\'t LIKE" (benar) — bukan "doesn\'t likes". Aux sudah membawa info subjek.',
    },
    questions: [
      {
        type: 'fill',
        prompt: 'Lengkapi kalimat (Past Simple):',
        pre: 'Last week I ', blank: true, post: ' a great article about study abroad.',
        options: ['read', 'readed', 'have read', 'reading'],
        answer: 0,
        optionExplain: [
          'Benar. "read" adalah past tense dari "to read" (irregular — tulisan sama, dibaca "red").',
          'Salah. "readed" tidak ada dalam bahasa Inggris.',
          'Salah. "have read" = Present Perfect, tapi "Last week" memaksa Past Simple.',
          'Salah. "reading" continuous, butuh aux "was/were".',
        ],
        explain: 'Penanda waktu "Last week" → Past Simple. Verb "read" irregular: tulisan tidak berubah.',
      },
      {
        type: 'error',
        prompt: 'Pilih kalimat yang benar:',
        options: ["She don't likes coffee.", "She doesn't like coffee.", 'She not like coffee.', "She doesn't likes coffee."],
        answer: 1,
        optionExplain: [
          'Salah. Subjek "She" → "doesn\'t", bukan "don\'t". Verb setelah aux harus bentuk dasar.',
          'Benar. "She doesn\'t like" → aux + verb dasar. Sempurna.',
          'Salah. Bahasa Inggris butuh aux "do/does" untuk negasi present simple.',
          'Salah. Aux benar, tapi verb tetap "likes" → harus turun jadi "like".',
        ],
        explain: 'Aturan emas: aux do/does/did sudah membawa info subjek & tense, verb setelahnya selalu BENTUK DASAR.',
      },
    ],
  },
];

export default function SessionPage() {
  const router = useRouter();
  const [blockIdx, setBlockIdx] = useState(0);
  const [phase, setPhase]       = useState<'lesson' | 'question'>('lesson');
  const [qIdx, setQIdx]         = useState(0);
  const [picked, setPicked]     = useState<number | null>(null);
  const [checked, setChecked]   = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [done, setDone]         = useState(false);
  const [secs, setSecs]         = useState(0);
  const [isWide, setIsWide]     = useState(false);

  useEffect(() => { const t = setInterval(() => setSecs(s => s + 1), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    const r = () => setIsWide(window.innerWidth >= 900);
    r(); window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  const mmss = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
  const totalQuestions = BLOCKS.reduce((a, b) => a + b.questions.length, 0);
  const block          = BLOCKS[blockIdx];
  const q              = block?.questions[qIdx];
  const isCorrect      = picked === q?.answer;

  useEffect(() => {
    if (done) {
      const xp = 10 + correctCount * 4;
      markBlockComplete('full_session', correctCount, xp).catch(() => {});
    }
  }, [done, correctCount]);

  const startQuestions = () => { setPhase('question'); setQIdx(0); setPicked(null); setChecked(false); };
  const check = () => {
    if (picked == null) return;
    setChecked(true);
    setTotalAnswered(n => n + 1);
    if (picked === q!.answer) setCorrectCount(c => c + 1);
  };
  const next = () => {
    if (qIdx + 1 < block.questions.length) {
      setQIdx(i => i + 1); setPicked(null); setChecked(false);
    } else if (blockIdx + 1 < BLOCKS.length) {
      markBlockComplete(block.key, correctCount, 5).catch(() => {});
      setBlockIdx(b => b + 1); setPhase('lesson'); setQIdx(0); setPicked(null); setChecked(false);
    } else {
      markBlockComplete(block.key, correctCount, 5).catch(() => {});
      setDone(true);
    }
  };

  /* ---------- DONE ---------- */
  if (done) {
    const xp = 10 + correctCount * 4;
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, var(--sky-wash), var(--offwhite))', position: 'relative', overflow: 'auto' }}>
        <Confetti run />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 26px 0', textAlign: 'center', maxWidth: 560, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(140deg, var(--sky), var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)', animation: 'pop-in .5s forwards' }}>
            <TrophyIcon size={56} style={{ color: '#fff' }} />
          </div>
          <h2 className="f-display" style={{ fontSize: 28, fontWeight: 700, margin: '20px 0 4px', color: 'var(--ink)' }}>Sesi selesai!</h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontWeight: 700, fontSize: 14.5 }}>{correctCount} dari {totalQuestions} jawaban benar · {mmss}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, width: '100%' }}>
            <div style={{ flex: 1, background: '#fff', borderRadius: 'var(--r-lg)', padding: 16, boxShadow: 'var(--sh-sm)' }}>
              <div className="f-display tabular" style={{ fontSize: 28, fontWeight: 700, color: 'var(--sky-ink)' }}>+{xp}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>XP didapat</div>
            </div>
            <div style={{ flex: 1, background: '#fff', borderRadius: 'var(--r-lg)', padding: 16, boxShadow: 'var(--sh-sm)' }}>
              <div className="f-display tabular" style={{ fontSize: 28, fontWeight: 700, color: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}><FireIcon size={24} />{correctCount > 0 ? 'OK' : '—'}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>Streak terjaga!</div>
            </div>
          </div>
        </div>
        <div style={{ padding: '16px 22px 34px', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 560, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <Btn icon={<SwordsIcon size={22} />} color="var(--pink)" deep="var(--pink-deep)" shadow="var(--sh-pink)" onClick={() => router.push('/duel')}>Lanjut ke Duel</Btn>
          <Btn size="md" color="#fff" deep="#fff" shadow="none" style={{ color: 'var(--ink-2)', border: '1.5px solid rgba(26,43,60,0.1)' }} onClick={() => router.push('/dashboard')}>Kembali ke Home</Btn>
        </div>
      </div>
    );
  }

  /* ---------- HEADER ---------- */
  const Header = (
    <div style={{ padding: '32px 24px 14px', flexShrink: 0, maxWidth: 1100, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => router.back()} style={{ border: 'none', background: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--sh-xs)', color: 'var(--muted)' }}><XIcon size={20} /></button>
        <div style={{ flex: 1, display: 'flex', gap: 8 }}>
          {BLOCKS.map((b, i) => {
            const state = i < blockIdx ? 'done' : i === blockIdx ? 'active' : 'todo';
            const innerPct = state === 'done' ? 100 : state === 'active'
              ? (phase === 'lesson' ? 6 : ((qIdx + (checked ? 1 : 0)) / b.questions.length) * 100)
              : 0;
            const BIcon = b.Icon;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                <div style={{ width: '100%', height: 6, borderRadius: 999, background: 'rgba(26,43,60,0.08)', overflow: 'hidden' }}>
                  <div style={{ width: `${innerPct}%`, height: '100%', background: state === 'done' ? 'var(--green)' : `linear-gradient(90deg, ${b.color}, ${b.deep})`, borderRadius: 999, transition: 'width .5s' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <BIcon size={13} style={{ color: state === 'todo' ? 'var(--faint)' : state === 'done' ? 'var(--green)' : b.deep }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: state === 'todo' ? 'var(--faint)' : state === 'done' ? 'var(--green)' : b.deep }}>{b.name}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--muted)', fontWeight: 800, fontSize: 13, background: '#fff', padding: '6px 12px', borderRadius: 999, boxShadow: 'var(--sh-xs)' }}>
          <ClockIcon size={14} /><span className="tabular">{mmss}</span>
        </div>
      </div>
    </div>
  );

  /* ---------- LESSON ---------- */
  if (phase === 'lesson') {
    const L = block.lesson;
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)' }}>
        {Header}
        <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 16px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `color-mix(in srgb, ${block.color} 25%, #fff)`, color: block.deep, padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 800, marginBottom: 14 }}>
              <BookIcon size={14} /> MATERI · {block.name.toUpperCase()}
            </div>
            <h1 className="f-display" style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px', lineHeight: 1.2 }}>{L.title}</h1>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--muted)', marginBottom: 18 }}>{L.subtitle}</div>

            <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: 22, boxShadow: 'var(--sh-sm)', borderLeft: `4px solid ${block.color}` }}>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)', fontWeight: 600 }}>{L.intro}</p>
            </div>

            <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
              {L.points.map((p, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-md)', padding: 16, boxShadow: 'var(--sh-xs)', borderTop: `3px solid ${block.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: block.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{i + 1}</div>
                    <div className="f-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{p.word}</div>
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)', fontWeight: 600 }}>{p.mean}</div>
                  {p.ex && <div style={{ marginTop: 8, fontSize: 12.5, color: 'var(--muted)', fontStyle: 'italic', fontWeight: 700, borderTop: '1px dashed rgba(26,43,60,0.1)', paddingTop: 7 }}>{p.ex}</div>}
                </div>
              ))}
            </div>

            {L.tip && (
              <div style={{ marginTop: 18, background: 'var(--sunny-soft)', border: '1.5px solid color-mix(in srgb, var(--sunny) 50%, #fff)', borderRadius: 'var(--r-md)', padding: '14px 16px', display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--sunny)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><BoltIcon size={16} /></div>
                <div style={{ flex: 1, fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink)', fontWeight: 700 }}>{L.tip}</div>
              </div>
            )}
            <div style={{ height: 90 }} />
          </div>
        </div>
        <div style={{ flexShrink: 0, padding: '14px 24px 28px', background: 'linear-gradient(180deg, rgba(247,251,255,0), var(--offwhite) 35%)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <Btn color={block.color} deep={block.deep} shadow={`0 10px 22px ${block.color}`} icon={<ArrowRightIcon size={22} />} onClick={startQuestions}>
              Mulai Latihan · {block.questions.length} soal
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- QUESTION ---------- */
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)' }}>
      {Header}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '6px 24px 16px' }} key={`${blockIdx}-${qIdx}`}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `color-mix(in srgb, ${block.color} 25%, #fff)`, color: block.deep, padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
              <block.Icon size={14} /> {block.name.toUpperCase()} · Soal {qIdx + 1}/{block.questions.length}
            </div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)' }}>Total benar: <span style={{ color: 'var(--green)' }}>{correctCount}</span>/{totalAnswered || '—'}</div>
          </div>

          {q!.passage && (
            <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: 18, boxShadow: 'var(--sh-sm)', marginBottom: 14 }}>
              <div className="f-display" style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink)' }}>
                <BookIcon size={17} style={{ color: 'var(--sky)' }} />{q!.passage.title} <LevelBadge level="B1" size="sm" />
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: 'var(--ink-2)' }}>{q!.passage.text}</p>
            </div>
          )}

          <div className="f-display" style={{ fontSize: q!.prompt ? 14.5 : 18, fontWeight: 600, color: q!.prompt ? 'var(--muted)' : 'var(--ink)', lineHeight: 1.4 }}>
            {q!.prompt || q!.q}
          </div>
          {q!.blank && (
            <div className="f-display" style={{ marginTop: 12, fontSize: 19, fontWeight: 600, lineHeight: 1.5, color: 'var(--ink)' }}>
              {q!.pre}<span style={{ display: 'inline-block', minWidth: 80, borderBottom: `3px solid ${checked ? (isCorrect ? 'var(--green)' : 'var(--red)') : block.color}`, textAlign: 'center', color: checked ? (isCorrect ? 'var(--green)' : 'var(--red)') : block.deep }}>{picked != null ? q!.options[picked] : '____'}</span>{q!.post}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
            {q!.options.map((opt, i) => {
              let bg = '#fff', bd = 'rgba(26,43,60,0.1)', col = 'var(--ink)';
              let ic: 'check' | 'x' | null = null;
              if (checked) {
                if (i === q!.answer)        { bg = 'var(--green-soft)'; bd = 'var(--green)'; col = 'var(--green)'; ic = 'check'; }
                else if (i === picked)      { bg = 'var(--red-soft)';   bd = 'var(--red)';   col = 'var(--red)';   ic = 'x'; }
                else                        { col = 'var(--muted)'; }
              } else if (i === picked)      { bg = `color-mix(in srgb, ${block.color} 20%, #fff)`; bd = block.color; col = block.deep; }
              return (
                <button key={i} disabled={checked} onClick={() => setPicked(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 'var(--r-md)',
                  border: `2px solid ${bd}`, background: bg, color: col, cursor: checked ? 'default' : 'pointer',
                  fontSize: 15.5, fontWeight: 700, textAlign: 'left', transition: 'all .15s',
                  boxShadow: i === picked && !checked ? `0 6px 14px ${block.color}` : 'none',
                }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i === picked || (checked && i === q!.answer) ? 'transparent' : 'var(--offwhite)', fontSize: 13, fontWeight: 800, color: i === picked ? col : 'var(--muted)' }}>
                    {ic === 'check' ? <CheckIcon size={24} /> : ic === 'x' ? <XIcon size={24} /> : String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ flex: 1 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {checked && (
            <div style={{ marginTop: 22, background: '#fff', borderRadius: 'var(--r-lg)', padding: 20, boxShadow: 'var(--sh-sm)', borderLeft: `4px solid ${isCorrect ? 'var(--green)' : 'var(--red)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: isCorrect ? 'var(--green)' : 'var(--red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isCorrect ? <CheckIcon size={22} /> : <XIcon size={22} />}
                </div>
                <div>
                  <div className="f-display" style={{ fontSize: 18, fontWeight: 700, color: isCorrect ? 'var(--green)' : 'var(--red)' }}>{isCorrect ? 'Tepat sekali!' : 'Belum tepat'}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--muted)' }}>Jawaban benar: <span style={{ color: 'var(--green)' }}>{String.fromCharCode(65 + q!.answer)}. {q!.options[q!.answer]}</span></div>
                </div>
              </div>

              <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8 }}>Pembahasan per opsi</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {q!.options.map((opt, i) => {
                  const isAns = i === q!.answer;
                  const isPicked = i === picked;
                  return (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', background: isAns ? 'var(--green-soft)' : isPicked ? 'var(--red-soft)' : 'var(--offwhite)', borderRadius: 'var(--r-sm)' }}>
                      <span style={{ width: 22, height: 22, borderRadius: 6, background: isAns ? 'var(--green)' : isPicked ? 'var(--red)' : '#fff', color: isAns || isPicked ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>
                      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)', fontWeight: 600 }}>
                        <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{opt}</span> — {q!.optionExplain[i]}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ background: 'var(--sky-wash)', borderRadius: 'var(--r-sm)', padding: '12px 14px', display: 'flex', gap: 10 }}>
                <SparkleIcon size={18} style={{ color: 'var(--sky-ink)', flexShrink: 0 }} />
                <div style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink)', fontWeight: 700 }}>
                  <span style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: 'var(--sky-ink)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>Inti penjelasan</span>
                  {q!.explain}
                </div>
              </div>
            </div>
          )}

          <div style={{ height: 90 }} />
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: '14px 24px 28px', background: 'linear-gradient(180deg, rgba(247,251,255,0), var(--offwhite) 35%)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          {!checked
            ? <Btn disabled={picked == null} onClick={check}>Cek Jawaban</Btn>
            : <Btn color={isCorrect ? 'var(--green)' : block.color} deep={isCorrect ? '#3C9C76' : block.deep} shadow="none" icon={<ArrowRightIcon size={22} />} onClick={next}>
                {(qIdx + 1 >= block.questions.length && blockIdx + 1 >= BLOCKS.length) ? 'Selesai sesi'
                  : (qIdx + 1 >= block.questions.length) ? `Lanjut ke ${BLOCKS[blockIdx + 1].name}`
                  : 'Lanjut soal'}
              </Btn>}
        </div>
      </div>
    </div>
  );
}
