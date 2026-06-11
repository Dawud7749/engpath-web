'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Avatar, ME } from '@/components/ui/Avatar';
import { PhaseChip, ShieldBadge } from '@/components/ui/Badge';
import { Card, SectionLabel } from '@/components/ui/Card';
import { Bar, VersusBar } from '@/components/ui/Bar';
import {
  BoltIcon, SwordsIcon, SparkleIcon, TargetIcon, BookIcon, PenIcon,
  BellIcon, CheckIcon, ChevRIcon, ArrowUpIcon, ArrowRightIcon, CrownIcon, FireIcon, PlayIcon, MicIcon,
} from '@/components/ui/Icons';

type Props = {
  displayName: string;
  initials: string;
  phase: number;
  week: number;
  streak: number;
  totalXp: number;
  duelWins: number;
  activeVocab: number;
  level: string;
  hasPartner: boolean;
  partnerName: string | null;
  partnerXp: number;
  doneKeys: string[];
};

function StatCard({ icon, label, value, sub, color, deep, soft }: { icon: React.ReactNode; label: string; value: string; sub?: React.ReactNode; color: string; deep: string; soft: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: 14, boxShadow: 'var(--sh-sm)', border: '1px solid rgba(26,43,60,0.04)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -14, right: -14, width: 56, height: 56, borderRadius: '50%', background: soft }} />
      <div style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(140deg, ${color}, ${deep})`, color: '#fff', position: 'relative', boxShadow: `0 5px 12px ${color}` }}>
        {icon}
      </div>
      <div className="f-display tabular" style={{ fontSize: 26, fontWeight: 700, marginTop: 10, lineHeight: 1, color: 'var(--ink)' }}>{value}</div>
      <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 600, marginTop: 3 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: deep, fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>{sub}</div>}
    </div>
  );
}

function TaskRow({ icon, title, meta, done, active, color, href }: { icon: React.ReactNode; title: string; meta: string; done: boolean; active: boolean; color: string; href: string }) {
  return (
    <Link href={href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 'var(--r-md)', border: active ? `2px solid ${color}` : '2px solid transparent', background: active ? 'color-mix(in srgb, var(--sky-wash) 70%, #fff)' : done ? 'var(--green-soft)' : 'var(--offwhite)', textDecoration: 'none', transition: 'transform .12s' }}>
      <div style={{ width: 38, height: 38, borderRadius: 'var(--r-sm)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? 'var(--green)' : `color-mix(in srgb, ${color} 22%, #fff)`, color: done ? '#fff' : color }}>
        {done ? <CheckIcon size={20} /> : icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: done ? 'var(--green)' : 'var(--ink)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{meta}</div>
      </div>
      {done
        ? <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--green)' }}>Selesai</span>
        : <ChevRIcon size={18} style={{ color: active ? color : 'var(--faint)' }} />}
    </Link>
  );
}

export default function DashboardClient({
  displayName, initials, phase, week, streak, totalXp, duelWins, activeVocab, level,
  hasPartner, partnerName, partnerXp, doneKeys,
}: Props) {
  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    const r = () => setIsWide(window.innerWidth >= 900);
    r(); window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  const isDone = (k: string) => doneKeys.includes(k);
  const allKeys = ['warmup', 'core', 'grammar', 'duel'];
  const firstUndoneIdx = allKeys.findIndex(k => !isDone(k));
  const tasks = [
    { key: 'warmup',  icon: <SparkleIcon size={20} />, title: 'Warm-up · Vocab',   meta: '5 kata lama + 5 baru',   color: 'var(--sky)',  href: '/learn/session' },
    { key: 'core',    icon: <BookIcon size={20} />,    title: 'Core · Reading',     meta: '1 teks B1 · 10 menit',   color: 'var(--sky)',  href: '/learn/session' },
    { key: 'grammar', icon: <PenIcon size={20} />,     title: 'Grammar in Context', meta: 'Past tense · 8 soal',    color: 'var(--mint)', href: '/learn/session' },
    { key: 'duel',    icon: <SwordsIcon size={20} />,  title: 'Daily Duel',         meta: 'Vocab challenge · 5 mnt',color: 'var(--pink)', href: '/duel' },
  ].map((t, i) => ({ ...t, done: isDone(t.key), active: i === firstUndoneIdx }));
  const doneCount = tasks.filter(t => t.done).length;

  /* ---- Hero ---- */
  const Hero = (
    <div style={{
      background: 'linear-gradient(165deg, var(--baby) 0%, var(--sky-wash) 55%, var(--offwhite) 100%)',
      padding: isWide ? '36px 32px 24px' : '58px 18px 16px',
      borderRadius: isWide ? '0 0 24px 24px' : '0 0 28px 28px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 1100, margin: '0 auto' }}>
        <Avatar {...ME} initials={initials} size={isWide ? 54 : 48} ring glow />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 700 }}>Halo,</div>
          <div className="f-display" style={{ fontSize: isWide ? 24 : 21, fontWeight: 700, lineHeight: 1.05, color: 'var(--ink)' }}>{displayName}</div>
        </div>
        <PhaseChip phase={phase} week={week} />
        <div style={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', background: '#fff', boxShadow: 'var(--sh-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}>
          <BellIcon size={20} />
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: `${isWide ? 18 : 16}px auto 0`, display: 'grid', gridTemplateColumns: isWide ? '1.3fr 1fr' : '1fr', gap: 14 }}>
        <div style={{
          borderRadius: 'var(--r-xl)', padding: isWide ? 22 : 16, position: 'relative', overflow: 'hidden',
          background: streak > 0 ? 'linear-gradient(125deg, var(--sunny), var(--coral) 88%)' : 'linear-gradient(125deg, var(--faint), var(--muted))',
          boxShadow: streak > 0 ? '0 14px 30px rgba(255,158,125,0.42)' : 'var(--sh-md)',
        }}>
          <div style={{ position: 'absolute', right: -10, top: -18, opacity: 0.25, color: '#fff' }}>
            <FireIcon size={140} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, color: '#fff' }}>
              <FireIcon size={isWide ? 52 : 42} style={{ animation: streak > 0 ? 'flame 1.3s ease-in-out infinite' : 'none', transformOrigin: 'bottom center' }} />
              <span className="f-display tabular" style={{ fontSize: isWide ? 64 : 52, fontWeight: 700, lineHeight: 0.9 }}>{streak}</span>
            </div>
            <div style={{ color: '#fff' }}>
              <div className="f-display" style={{ fontSize: isWide ? 20 : 18, fontWeight: 600, lineHeight: 1 }}>hari streak</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.92, marginTop: 3 }}>
                {streak === 0 ? 'Mulai sesi pertamamu!' : hasPartner ? `Jaga terus bareng ${partnerName || 'partner'}` : 'Undang partner untuk mulai'}
              </div>
            </div>
            {streak > 0 && <div style={{ marginLeft: 'auto' }}><ShieldBadge /></div>}
          </div>
        </div>

        {isWide && (
          <Link href="/learn/session" style={{
            textDecoration: 'none', borderRadius: 'var(--r-xl)', padding: 22, position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(125deg, var(--sky), var(--sky-deep))',
            boxShadow: '0 14px 30px rgba(96,195,245,0.42)',
            display: 'flex', alignItems: 'center', gap: 14, color: '#fff',
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <PlayIcon size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="f-display" style={{ fontSize: 17, fontWeight: 700 }}>Lanjut Sesi</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.92, marginTop: 3 }}>{doneCount}/4 selesai · ±{Math.max(0, (4 - doneCount) * 8)} mnt lagi</div>
            </div>
            <ArrowRightIcon size={24} />
          </Link>
        )}
      </div>
    </div>
  );

  /* ---- Stats ---- */
  const Stats = (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isWide ? 'repeat(4, 1fr)' : '1fr 1fr',
      gap: isWide ? 14 : 11,
    }}>
      <StatCard icon={<BoltIcon size={20} />}    label="Total XP"     value={totalXp.toLocaleString('id-ID')} sub={totalXp > 0 ? <><ArrowUpIcon size={11} />terus tingkatkan</> : <>mulai sesi!</>}            color="var(--sky)"   deep="var(--sky-deep)"  soft="var(--sky-wash)" />
      <StatCard icon={<SwordsIcon size={20} />}  label="Duel menang"  value={String(duelWins)}                sub={duelWins > 0 ? <>terus tantang!</> : <>belum ada duel</>}                                     color="var(--pink)"  deep="var(--pink-deep)" soft="var(--pink-wash)" />
      <StatCard icon={<SparkleIcon size={20} />} label="Vocab aktif"  value={String(activeVocab)}             sub={activeVocab > 0 ? <><ArrowUpIcon size={11} />keep going</> : <>belajar kata baru</>}            color="var(--mint)"  deep="#3FB7A2"          soft="var(--mint-soft)" />
      <StatCard icon={<TargetIcon size={20} />}  label="Level skill"  value={level}                           sub={<>fase {phase}</>}                                                                            color="var(--sunny)" deep="#F2B43C"          soft="var(--sunny-soft)" />
    </div>
  );

  /* ---- Sesi ---- */
  const Sesi = (
    <div>
      <SectionLabel action={<span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--sky-ink)' }}>{doneCount}/4 selesai</span>}>Sesi hari ini</SectionLabel>
      <Card pad={14}>
        <div style={{ height: 6, borderRadius: 999, background: 'rgba(26,43,60,0.07)', overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ width: `${(doneCount / 4) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--sky), var(--mint))', borderRadius: 999, transition: 'width .7s' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {tasks.map(({ key, ...rest }) => <TaskRow key={key} {...rest} />)}
        </div>
      </Card>
      {!isWide && (
        <div style={{ marginTop: 14 }}>
          <Link href="/learn/session" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, height: 56, borderRadius: 'var(--r-pill)', background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, boxShadow: 'var(--sh-blue)' }}>
            <PlayIcon size={22} />Mulai Sesi Hari Ini
          </Link>
        </div>
      )}
    </div>
  );

  /* ---- Side ---- */
  const Side = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isWide ? 16 : 0, marginTop: isWide ? 0 : 20 }}>
      {hasPartner ? (
        <div>
          <SectionLabel>Head-to-head</SectionLabel>
          <Link href="/progress" style={{ textDecoration: 'none' }}>
            <Card pad={16}>
              <VersusBar a={totalXp} b={partnerXp} nameA={displayName} nameB={partnerName || 'Partner'} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, fontSize: 12.5, fontWeight: 700, color: 'var(--sky-ink)', textAlign: 'center' }}>
                <CrownIcon size={15} style={{ color: 'var(--sunny)' }} />
                {totalXp > partnerXp ? 'Kamu unggul!' : totalXp === partnerXp ? 'Imbang' : 'Kejar ketinggalan!'}
              </div>
            </Card>
          </Link>
        </div>
      ) : (
        <Card pad={16} style={{ textAlign: 'center', background: 'var(--pink-wash)', border: '1.5px solid var(--lpink)' }}>
          <div className="f-display" style={{ fontSize: 16, fontWeight: 600, color: 'var(--pink-ink)' }}>Belum punya partner</div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600, marginTop: 4 }}>Undang teman untuk mulai kompetisi!</div>
        </Card>
      )}

      {isWide && (
        <div>
          <SectionLabel>Modul belajar</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { icon: <SparkleIcon size={18} />, label: 'Vocabulary', pct: 72, color: 'var(--sky)',   deep: 'var(--sky-deep)',  href: '/learn/vocab' },
              { icon: <MicIcon size={18} />,     label: 'Speaking',   pct: 64, color: 'var(--pink)',  deep: 'var(--pink-deep)', href: '/learn' },
              { icon: <BookIcon size={18} />,    label: 'Reading',    pct: 58, color: 'var(--mint)',  deep: '#3FB7A2',          href: '/learn/reading' },
              { icon: <PenIcon size={18} />,     label: 'Grammar',    pct: 48, color: 'var(--sunny)', deep: '#F2B43C',          href: '/learn/grammar' },
            ].map((m, i) => (
              <Link key={i} href={m.href} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 'var(--r-md)', padding: 12, border: '1px solid rgba(26,43,60,0.06)', boxShadow: 'var(--sh-xs)', textDecoration: 'none' }}>
                <div style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: `linear-gradient(140deg, ${m.color}, ${m.deep})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {m.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{m.label}</div>
                  <Bar value={m.pct} color={m.color} h={5} />
                </div>
                <div className="f-display tabular" style={{ fontSize: 12, fontWeight: 700, color: m.deep, flexShrink: 0 }}>{m.pct}%</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ background: 'var(--offwhite)', minHeight: '100%' }}>
      {Hero}
      <div style={{ padding: isWide ? '20px 32px 32px' : '4px 18px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginTop: isWide ? 0 : 14 }}>{Stats}</div>
        <div style={{
          marginTop: isWide ? 22 : 20,
          display: 'grid',
          gridTemplateColumns: isWide ? '1.4fr 1fr' : '1fr',
          gap: isWide ? 22 : 0,
          alignItems: 'start',
        }}>
          {Sesi}
          {Side}
        </div>
      </div>
    </div>
  );
}
