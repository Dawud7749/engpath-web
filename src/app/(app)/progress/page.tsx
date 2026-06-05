'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, SectionLabel } from '@/components/ui/Card';
import { Bar } from '@/components/ui/Bar';
import { Radar } from '@/components/ui/Radar';
import { TrophyIcon, CrownIcon, MicIcon, BookIcon, SparkleIcon, PenIcon, HeadphoneIcon } from '@/components/ui/Icons';

const SKILLS = [
  { key: 'Speaking',  me: 78, pa: 64, icon: MicIcon },
  { key: 'Reading',   me: 82, pa: 66, icon: BookIcon },
  { key: 'Vocab',     me: 60, pa: 85, icon: SparkleIcon },
  { key: 'Grammar',   me: 64, pa: 72, icon: PenIcon },
  { key: 'Writing',   me: 55, pa: 84, icon: PenIcon },
  { key: 'Listening', me: 70, pa: 62, icon: HeadphoneIcon },
];

function SkillCard({ s }: { s: typeof SKILLS[0] }) {
  const meWin = s.me >= s.pa;
  const Icon = s.icon;
  return (
    <Card pad={13}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--offwhite)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}><Icon size={15} /></div>
        <span className="f-display" style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{s.key}</span>
        <CrownIcon size={14} style={{ color: meWin ? 'var(--pink)' : 'var(--sky)', marginLeft: 'auto' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
        <span className="f-display tabular" style={{ fontSize: 12, fontWeight: 700, color: 'var(--pink-ink)', width: 26 }}>{s.me}</span>
        <div style={{ flex: 1 }}><Bar value={s.me} color="var(--pink)" h={7} /></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span className="f-display tabular" style={{ fontSize: 12, fontWeight: 700, color: 'var(--sky-ink)', width: 26 }}>{s.pa}</span>
        <div style={{ flex: 1 }}><Bar value={s.pa} color="var(--sky)" h={7} /></div>
      </div>
    </Card>
  );
}

export default function ProgressPage() {
  const [tab, setTab] = useState<'month' | 'all'>('month');
  const offset = tab === 'all' ? 6 : 0;
  return (
    <div style={{ background: 'var(--offwhite)', minHeight: '100%' }}>
      <div style={{ background: 'linear-gradient(165deg, var(--sky-wash), var(--offwhite))', padding: '58px 18px 14px', borderRadius: '0 0 28px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="f-display" style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)' }}>Progress</div>
          <Link href="/leaderboard" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 13px', borderRadius: 999, boxShadow: 'var(--sh-xs)', color: 'var(--ink-2)', fontWeight: 800, fontSize: 12.5, background: '#fff', textDecoration: 'none' }}>
            <TrophyIcon size={16} style={{ color: 'var(--sunny)' }} /> Leaderboard
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, background: 'rgba(255,255,255,0.7)', padding: 4, borderRadius: 999 }}>
          {(['month', 'all'] as const).map((k, ki) => (
            <button key={k} onClick={() => setTab(k)} className="f-display" style={{ flex: 1, border: 'none', cursor: 'pointer', padding: '9px 0', borderRadius: 999, fontSize: 13.5, fontWeight: 600, background: tab === k ? 'linear-gradient(135deg,var(--sky),var(--sky-deep))' : 'transparent', color: tab === k ? '#fff' : 'var(--muted)', boxShadow: tab === k ? 'var(--sh-blue)' : 'none' }}>
              {['Bulan Ini', 'Sepanjang Waktu'][ki]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 18px 24px' }}>
        <Card pad={16}>
          <SectionLabel>Skill Radar</SectionLabel>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Radar size={250} max={100} axes={SKILLS.map(s => s.key)}
              series={[
                { values: SKILLS.map(s => Math.max(0, s.me - offset)), stroke: 'var(--pink)', fill: 'var(--pink)' },
                { values: SKILLS.map(s => Math.max(0, s.pa - offset)), stroke: 'var(--sky)', fill: 'var(--sky)' },
              ]} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 6 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 800, color: 'var(--pink-ink)' }}><span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--pink)' }} /> Dawud</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 800, color: 'var(--sky-ink)' }}><span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--sky)' }} /> Jea</span>
          </div>
        </Card>

        <div style={{ marginTop: 18 }}>
          <SectionLabel>Per skill</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
            {SKILLS.map(s => <SkillCard key={s.key} s={s} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
