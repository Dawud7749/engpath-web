'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, ME, PARTNER } from '@/components/ui/Avatar';
import { Card, SectionLabel } from '@/components/ui/Card';
import { Btn } from '@/components/ui/Btn';
import { TrophyIcon, CrownIcon, SwordsIcon, ChevLIcon } from '@/components/ui/Icons';

const DOMAINS = [
  { key: 'Speaking', leader: ME,      margin: 14, icon: '🎤' },
  { key: 'Reading',  leader: ME,      margin: 16, icon: '📖' },
  { key: 'Vocab',    leader: PARTNER, margin: 25, icon: '✨' },
  { key: 'Grammar',  leader: PARTNER, margin: 8,  icon: '✏️' },
  { key: 'Writing',  leader: PARTNER, margin: 29, icon: '📝' },
];

const HIST: Record<string, string[]> = {
  Speaking: ['d','d','j','d','d','d','j','d','d','d','d','d'],
  Reading:  ['d','d','d','d','j','d','d','d','d','d','j','d'],
  Vocab:    ['j','j','d','j','j','j','j','d','j','j','j','j'],
  Grammar:  ['j','d','j','j','d','j','d','j','j','d','j','j'],
  Writing:  ['j','j','j','j','j','d','j','j','j','j','j','j'],
};

export default function LeaderboardPage() {
  const router = useRouter();
  const [t, setT] = useState(0);
  const d = DOMAINS[t];
  const meLeads = d.leader.initials === 'D';
  const hist = HIST[d.key];

  return (
    <div style={{ background: 'var(--offwhite)', minHeight: '100%' }}>
      <div style={{ background: 'linear-gradient(165deg, var(--sunny-soft), var(--offwhite))', padding: '52px 18px 14px', borderRadius: '0 0 28px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => router.back()} style={{ border: 'none', background: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--sh-xs)', color: 'var(--muted)' }}>
            <ChevLIcon size={20} />
          </button>
          <div className="f-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>Leaderboard</div>
          <TrophyIcon size={22} style={{ color: 'var(--sunny)', marginLeft: 'auto' }} />
        </div>
        <div className="no-scrollbar" style={{ display: 'flex', gap: 7, marginTop: 14, overflowX: 'auto', paddingBottom: 2 }}>
          {DOMAINS.map((dm, i) => (
            <button key={dm.key} onClick={() => setT(i)} className="f-display" style={{ flexShrink: 0, border: 'none', cursor: 'pointer', padding: '8px 15px', borderRadius: 999, fontSize: 13, fontWeight: 600, background: t === i ? 'linear-gradient(135deg,var(--sky),var(--sky-deep))' : '#fff', color: t === i ? '#fff' : 'var(--muted)', boxShadow: t === i ? 'var(--sh-blue)' : 'var(--sh-xs)' }}>
              {dm.icon} {dm.key}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 18px 24px' }}>
        {/* Champion card */}
        <div style={{ borderRadius: 'var(--r-xl)', padding: 22, textAlign: 'center', background: meLeads ? 'linear-gradient(160deg,var(--pink-wash),#fff)' : 'linear-gradient(160deg,var(--sky-wash),#fff)', boxShadow: 'var(--sh-md)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{d.key} Champion</div>
          <div style={{ position: 'relative', display: 'inline-block', marginTop: 14 }}>
            <Avatar {...d.leader} size={84} glow ring />
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%) rotate(-6deg)', color: 'var(--sunny)', filter: 'drop-shadow(0 3px 6px rgba(245,166,35,.4))' }}>
              <CrownIcon size={36} />
            </div>
          </div>
          <div className="f-display" style={{ fontSize: 23, fontWeight: 700, marginTop: 10, color: meLeads ? 'var(--pink-ink)' : 'var(--sky-ink)' }}>{d.leader.name}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginTop: 2 }}>
            unggul <span style={{ color: meLeads ? 'var(--pink-ink)' : 'var(--sky-ink)', fontWeight: 800 }}>+{d.margin} poin</span>
          </div>
        </div>

        {!meLeads && (
          <div style={{ marginTop: 14 }}>
            <Btn icon={<SwordsIcon size={22} />} color="var(--pink)" deep="var(--pink-deep)" shadow="var(--sh-pink)" onClick={() => router.push('/duel')}>
              Tantang Balik di {d.key}
            </Btn>
          </div>
        )}

        {/* History */}
        <div style={{ marginTop: 20 }}>
          <SectionLabel action={<span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--muted)' }}>12 minggu terakhir</span>}>Siapa memimpin</SectionLabel>
          <Card pad={16}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
              {hist.map((wk, wi) => {
                const p = wk === 'd' ? ME : PARTNER;
                return (
                  <div key={wi} style={{ aspectRatio: '1', borderRadius: 9, background: `linear-gradient(150deg, ${p.color}, ${p.deep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, boxShadow: 'var(--sh-xs)' }}>
                    {wi + 1}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: 'var(--pink-ink)' }}><span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--pink)' }} /> Dawud lead</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)' }}><span style={{ width: 11, height: 11, borderRadius: 3, background: 'var(--sky)' }} /> Jea lead</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
