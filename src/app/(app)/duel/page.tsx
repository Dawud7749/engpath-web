'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, ME, PARTNER } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Btn } from '@/components/ui/Btn';
import { SparkleIcon, SwordsIcon, FireIcon } from '@/components/ui/Icons';

export default function DuelPage() {
  const router = useRouter();
  return (
    <div style={{ background: 'var(--offwhite)', minHeight: '100%' }}>
      <div style={{ background: 'linear-gradient(165deg, var(--lpink) 0%, var(--pink-wash) 55%, var(--offwhite) 100%)', padding: '58px 18px 18px', borderRadius: '0 0 28px 28px' }}>
        <div className="f-display" style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)' }}>Daily Duel</div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 700, marginTop: 2 }}>Head-to-head 5 menit lawan partner-mu</div>

        {/* VS card */}
        <div style={{ marginTop: 16, background: '#fff', borderRadius: 'var(--r-xl)', padding: '20px 16px', boxShadow: 'var(--sh-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, width: 92 }}>
            <Avatar {...ME} size={62} glow />
            <div className="f-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--pink-ink)' }}>{ME.name}</div>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--muted)' }}>kamu</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div className="f-display" style={{ fontSize: 30, fontWeight: 700, background: 'linear-gradient(135deg,var(--pink),var(--sky))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VS</div>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--muted)', background: 'var(--offwhite)', padding: '3px 8px', borderRadius: 999 }}>23 menang</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, width: 92 }}>
            <Avatar {...PARTNER} size={62} glow />
            <div className="f-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--sky-ink)' }}>{PARTNER.name}</div>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)' }} />online
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 18px 24px' }}>
        <Card pad={16} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--r-md)', background: 'linear-gradient(140deg,var(--sky),var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: 'var(--sh-blue)' }}>
            <SparkleIcon size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.4 }}>Tantangan hari ini</div>
            <div className="f-display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>Vocab Challenge</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 700 }}>5 soal · siapa cepat & tepat menang</div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginTop: 12 }}>
          <Card pad={14}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Minggu ini</div>
            <div className="f-display tabular" style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
              <span style={{ color: 'var(--green)' }}>4</span>
              <span style={{ color: 'var(--faint)' }}>—</span>
              <span style={{ color: 'var(--red)' }}>1</span>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--muted)' }}>menang — kalah</div>
          </Card>
          <Card pad={14}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Win streak</div>
            <div className="f-display tabular" style={{ fontSize: 24, fontWeight: 700, marginTop: 4, color: 'var(--coral)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <FireIcon size={22} />3
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--muted)' }}>duel beruntun</div>
          </Card>
        </div>

        <div style={{ marginTop: 18 }}>
          <Btn icon={<SwordsIcon size={22} />} color="var(--pink)" deep="var(--pink-deep)" shadow="var(--sh-pink)" onClick={() => router.push('/duel/active')}>
            Mulai Duel
          </Btn>
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontWeight: 700, marginTop: 12 }}>
          Jea sedang online — langsung tantang sekarang!
        </p>
      </div>
    </div>
  );
}
