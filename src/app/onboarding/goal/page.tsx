import { OnboardingShell } from '@/components/ui/OnboardingShell';
import { saveOnboardingStep } from '../actions';

const goals = [
  { id: 'career', label: 'Karir & Kerja', emoji: '💼', desc: 'Interview, email, meeting' },
  { id: 'toefl', label: 'TOEFL / IELTS', emoji: '🎯', desc: 'Persiapan tes resmi' },
  { id: 'study_abroad', label: 'Kuliah Abroad', emoji: '🎓', desc: 'S2, exchange, scholarship' },
  { id: 'travel', label: 'Travel', emoji: '✈️', desc: 'Komunikasi saat jalan-jalan' },
  { id: 'hobby', label: 'Hobi & Hiburan', emoji: '🎬', desc: 'Film, musik, baca buku' },
];

export default function GoalPage() {
  return (
    <OnboardingShell step={3} total={5} title="Apa tujuanmu?" subtitle="Kami sesuaikan topik & vocab biar relevan.">
      <form action={saveOnboardingStep} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <input type="hidden" name="step" value="goal" />
        <input type="hidden" name="next" value="/onboarding/focus" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {goals.map((g, i) => (
            <label key={g.id} className="onboard-opt" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: '#fff', borderRadius: 'var(--r-md)', border: '2px solid rgba(26,43,60,0.08)', cursor: 'pointer', position: 'relative' }}>
              <input type="radio" name="goal" value={g.id} required defaultChecked={i === 0} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
              <span style={{ fontSize: 30 }}>{g.emoji}</span>
              <div style={{ flex: 1, paddingRight: 32 }}>
                <div className="f-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{g.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{g.desc}</div>
              </div>
              <span className="onboard-opt-check">✓</span>
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
