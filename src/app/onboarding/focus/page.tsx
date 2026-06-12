import { OnboardingShell } from '@/components/ui/OnboardingShell';
import { saveOnboardingStep } from '../actions';

const focuses = [
  { id: 'speaking', label: 'Speaking', emoji: '🎤', desc: 'Ngomong lancar, akurat' },
  { id: 'reading', label: 'Reading', emoji: '📖', desc: 'Baca artikel, paham cepat' },
  { id: 'writing', label: 'Writing', emoji: '✍️', desc: 'Email, essay, laporan' },
  { id: 'listening', label: 'Listening', emoji: '🎧', desc: 'Podcast, film, meeting' },
];

export default function FocusPage() {
  return (
    <OnboardingShell step={4} total={5} title="Mau fokus skill apa?" subtitle="Kamu tetap belajar semua, tapi yang ini dapat porsi lebih.">
      <form action={saveOnboardingStep} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <input type="hidden" name="step" value="focus" />
        <input type="hidden" name="next" value="/onboarding/partner" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {focuses.map((f, i) => (
            <label key={f.id} className="onboard-opt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', background: '#fff', borderRadius: 'var(--r-md)', border: '2px solid rgba(26,43,60,0.08)', cursor: 'pointer', position: 'relative', textAlign: 'center' }}>
              <input type="radio" name="focus" value={f.id} required defaultChecked={i === 0} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
              <span className="onboard-opt-check">✓</span>
              <span style={{ fontSize: 42 }}>{f.emoji}</span>
              <div className="f-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{f.label}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', lineHeight: 1.3 }}>{f.desc}</div>
            </label>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 24 }}>
          <button type="submit" className="f-display" style={{ width: '100%', height: 56, borderRadius: 'var(--r-pill)', border: 'none', background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 17, fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--sh-blue)' }}>
            Lanjut →
          </button>
        </div>
      </form>
    </OnboardingShell>
  );
}
