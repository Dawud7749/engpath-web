import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { OnboardingShell } from '@/components/ui/OnboardingShell';
import { saveOnboardingStep } from '../actions';

export default async function WelcomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const defaultName = user.email?.split('@')[0] || '';

  return (
    <OnboardingShell step={1} total={5} title="Halo! 👋" subtitle="Mau dipanggil apa? Kami akan pakai nama ini di seluruh aplikasi.">
      <form action={saveOnboardingStep} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <input type="hidden" name="step" value="welcome" />
        <input type="hidden" name="next" value="/onboarding/level" />

        <label style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-2)', marginBottom: 6 }}>Nama panggilan</label>
        <input
          name="display_name"
          defaultValue={defaultName}
          required
          maxLength={30}
          placeholder="Contoh: Dawud"
          style={{ height: 52, padding: '0 18px', borderRadius: 'var(--r-md)', border: '2px solid rgba(26,43,60,0.1)', fontSize: 16, fontWeight: 600, color: 'var(--ink)', background: '#fff', outline: 'none', fontFamily: 'var(--font-body)' }}
        />

        <div style={{ marginTop: 'auto', paddingTop: 32 }}>
          <button type="submit" className="f-display" style={{ width: '100%', height: 56, borderRadius: 'var(--r-pill)', border: 'none', background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 17, fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--sh-blue)' }}>
            Lanjut →
          </button>
        </div>
      </form>
    </OnboardingShell>
  );
}
