import { OnboardingShell } from '@/components/ui/OnboardingShell';
import { saveOnboardingStep } from '../actions';

const levels = [
  { id: 'a1', label: 'Pemula', desc: 'Bisa kata sederhana: hello, thank you, my name is...', emoji: '🌱' },
  { id: 'a2', label: 'Dasar', desc: 'Bisa kalimat pendek tentang diri & sehari-hari', emoji: '🌿' },
  { id: 'b1', label: 'Menengah', desc: 'Bisa cerita pengalaman, opini sederhana', emoji: '🌳' },
  { id: 'b2', label: 'Atas', desc: 'Bisa debat, baca artikel berita lancar', emoji: '🎓' },
];

export default function LevelPage() {
  return (
    <OnboardingShell step={2} total={5} title="Level kamu sekarang?" subtitle="Jujur aja, ini buat sesuaikan materi yang pas.">
      <form action={saveOnboardingStep} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <input type="hidden" name="step" value="level" />
        <input type="hidden" name="next" value="/onboarding/goal" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {levels.map((lv, i) => (
            <label key={lv.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: '#fff', borderRadius: 'var(--r-md)', border: '2px solid rgba(26,43,60,0.08)', cursor: 'pointer', position: 'relative' }}>
              <input type="radio" name="level" value={lv.id} required defaultChecked={i === 1} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
              <span style={{ fontSize: 32 }}>{lv.emoji}</span>
              <div style={{ flex: 1 }}>
                <div className="f-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{lv.label} <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)', background: 'var(--sky-wash)', padding: '2px 8px', borderRadius: 6, marginLeft: 6 }}>{lv.id.toUpperCase()}</span></div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginTop: 2 }}>{lv.desc}</div>
              </div>
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
