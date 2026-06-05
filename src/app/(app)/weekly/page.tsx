'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, SectionLabel } from '@/components/ui/Card';
import { Radar } from '@/components/ui/Radar';
import { Btn } from '@/components/ui/Btn';
import { BoltIcon, SwordsIcon, SparkleIcon, TargetIcon, FireIcon, ChevLIcon, ShareIcon } from '@/components/ui/Icons';

const thisWeek = [78, 82, 60, 64, 55, 70];
const lastWeek = [70, 74, 54, 58, 50, 66];
const axes     = ['Speak', 'Read', 'Vocab', 'Gram', 'Write', 'Listen'];

function Stat({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ width: 42, height: 42, borderRadius: 'var(--r-md)', margin: '0 auto', background: `color-mix(in srgb, ${color} 20%, #fff)`, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div className="f-display tabular" style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginTop: 7 }}>{value}</div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', lineHeight: 1.2, marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function WeeklyPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'app' | 'story'>('app');

  if (mode === 'story') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--ink)', position: 'relative' }}>
        <div style={{ padding: '50px 18px 10px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button onClick={() => setMode('app')} style={{ border: 'none', background: 'rgba(255,255,255,0.15)', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
            <ChevLIcon size={20} />
          </button>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>Pratinjau Story · 9:16</div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px 20px' }}>
          <div style={{ width: '100%', aspectRatio: '9/16', borderRadius: 'var(--r-2xl)', overflow: 'hidden', position: 'relative', background: 'linear-gradient(165deg, var(--sky) 0%, var(--baby) 45%, var(--pink) 100%)', boxShadow: '0 24px 50px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', padding: '26px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BoltIcon size={17} style={{ color: 'var(--sky-deep)' }} />
              </div>
              <span className="f-display" style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>EngPath</span>
              <span style={{ marginLeft: 'auto', color: '#fff', fontSize: 12, fontWeight: 800, opacity: 0.9 }}>Minggu 3 · Juni</span>
            </div>
            <div style={{ marginTop: 'auto', textAlign: 'center', color: '#fff' }}>
              <FireIcon size={52} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.2))' }} />
              <div className="f-display tabular" style={{ fontSize: 80, fontWeight: 700, lineHeight: 0.9 }}>15</div>
              <div className="f-display" style={{ fontSize: 19, fontWeight: 600, opacity: 0.95 }}>hari streak bareng Jea</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 26, marginBottom: 'auto' }}>
              {[['+285', 'XP'], ['4–1', 'Duel'], ['+10', 'Vocab']].map(([v, l]) => (
                <div key={l} style={{ flex: 1, background: 'rgba(255,255,255,0.22)', borderRadius: 'var(--r-md)', padding: '12px 6px', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
                  <div className="f-display tabular" style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{v}</div>
                  <div style={{ color: '#fff', fontSize: 11, fontWeight: 800, opacity: 0.9 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', color: '#fff', fontWeight: 800, fontSize: 13, opacity: 0.92 }}>Learn together. Compete better.</div>
          </div>
        </div>
        <div style={{ padding: '0 24px 30px', flexShrink: 0 }}>
          <Btn icon={<ShareIcon size={20} />} color="#fff" deep="#fff" shadow="none" style={{ color: 'var(--sky-ink)' }}>Bagikan ke Story</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)' }}>
      <div style={{ padding: '52px 18px 8px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={() => router.back()} style={{ border: 'none', background: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--sh-xs)', color: 'var(--muted)' }}>
          <ChevLIcon size={20} />
        </button>
        <div>
          <div className="f-display" style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>Laporan Mingguan</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700, marginTop: 3 }}>Minggu 3 · 1–7 Juni 2026</div>
        </div>
      </div>

      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '10px 18px 24px' }}>
        {/* Streak hero */}
        <div style={{ borderRadius: 'var(--r-xl)', padding: 20, textAlign: 'center', background: 'linear-gradient(150deg, var(--sunny), var(--coral))', boxShadow: '0 14px 30px rgba(255,158,125,0.42)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <FireIcon size={40} style={{ animation: 'flame 1.3s ease-in-out infinite', transformOrigin: 'bottom center' }} />
          <div className="f-display tabular" style={{ fontSize: 56, fontWeight: 700, lineHeight: 0.9, marginTop: 4 }}>15</div>
          <div className="f-display" style={{ fontSize: 16, fontWeight: 600 }}>hari streak — rekor baru!</div>
        </div>

        {/* 3 stats */}
        <Card pad={16} style={{ marginTop: 14, display: 'flex', gap: 6 }}>
          <Stat icon={<BoltIcon size={22} />}   value="+285" label="XP minggu ini" color="var(--sky)" />
          <div style={{ width: 1, background: 'rgba(26,43,60,0.08)' }} />
          <Stat icon={<SwordsIcon size={22} />} value="4–1"  label="Duel menang"   color="var(--pink)" />
          <div style={{ width: 1, background: 'rgba(26,43,60,0.08)' }} />
          <Stat icon={<SparkleIcon size={22} />}value="+10"  label="Vocab baru"     color="var(--mint)" />
        </Card>

        {/* Radar */}
        <Card pad={16} style={{ marginTop: 14 }}>
          <SectionLabel>Skill kamu: minggu ini vs lalu</SectionLabel>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Radar size={220} max={100} axes={axes}
              series={[
                { values: lastWeek, stroke: 'var(--faint)', fill: 'var(--faint)' },
                { values: thisWeek, stroke: 'var(--pink)',  fill: 'var(--pink)' },
              ]} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 4 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: 'var(--muted)' }}><span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--faint)' }} /> Minggu lalu</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: 'var(--pink-ink)' }}><span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--pink)' }} /> Minggu ini</span>
          </div>
        </Card>

        {/* Focus tip */}
        <div style={{ marginTop: 14, borderRadius: 'var(--r-lg)', padding: 16, background: 'var(--sky-wash)', border: '1.5px solid var(--baby)', display: 'flex', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 'var(--r-sm)', background: 'linear-gradient(140deg,var(--sky),var(--sky-deep))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--sh-blue)' }}>
            <TargetIcon size={20} />
          </div>
          <div>
            <div className="f-display" style={{ fontSize: 14, fontWeight: 600, color: 'var(--sky-ink)' }}>Fokus minggu depan</div>
            <p style={{ margin: '4px 0 0', fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)', fontWeight: 600 }}>
              Vocabulary jadi titik lemahmu (60%). Coba tambah 2 sesi flashcard ringan tiap pagi — Jea sudah di 85%, kamu pasti bisa kejar!
            </p>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <Btn icon={<ShareIcon size={20} />} onClick={() => setMode('story')}>Bagikan Progress</Btn>
        </div>
      </div>
    </div>
  );
}
