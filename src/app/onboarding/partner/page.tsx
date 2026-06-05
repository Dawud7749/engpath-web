import { OnboardingShell } from '@/components/ui/OnboardingShell';
import { saveOnboardingStep } from '../actions';

export default function PartnerPage() {
  return (
    <OnboardingShell step={5} total={5} title="Belajar sendiri atau bareng?" subtitle="Bisa diubah kapan saja nanti.">
      <form action={saveOnboardingStep} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <input type="hidden" name="step" value="partner" />
        <input type="hidden" name="next" value="/dashboard" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 16px', background: 'linear-gradient(135deg, var(--sky-wash), #fff)', borderRadius: 'var(--r-md)', border: '2px solid var(--baby)', cursor: 'pointer', position: 'relative' }}>
            <input type="radio" name="mode" value="solo" required defaultChecked style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            <span style={{ fontSize: 42 }}>🚀</span>
            <div style={{ flex: 1 }}>
              <div className="f-display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--sky-ink)' }}>Sendiri dulu (Solo)</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginTop: 2 }}>Langsung mulai belajar. Bisa undang partner kapan saja.</div>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 16px', background: '#fff', borderRadius: 'var(--r-md)', border: '2px solid rgba(26,43,60,0.08)', cursor: 'pointer', position: 'relative' }}>
            <input type="radio" name="mode" value="partner" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            <span style={{ fontSize: 42 }}>👥</span>
            <div style={{ flex: 1 }}>
              <div className="f-display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>Bareng partner</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginTop: 2 }}>Saling duel & track progress. Akan diminta undang email partner setelah ini.</div>
            </div>
          </label>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 32 }}>
          <button type="submit" className="f-display" style={{ width: '100%', height: 56, borderRadius: 'var(--r-pill)', border: 'none', background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 17, fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--sh-blue)' }}>
            Mulai Belajar! 🎉
          </button>
        </div>
      </form>
    </OnboardingShell>
  );
}
