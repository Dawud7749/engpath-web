'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BoltIcon } from '@/components/ui/Icons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setSent(true);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(165deg, var(--sky-wash), var(--offwhite))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36, justifyContent: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(140deg, var(--sky), var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)' }}>
            <BoltIcon size={26} style={{ color: '#fff' }} />
          </div>
          <div className="f-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)' }}>EngPath</div>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 'var(--r-xl)', padding: 28, boxShadow: 'var(--sh-md)' }}>
          {!sent ? (
            <>
              <h2 className="f-display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px', color: 'var(--ink)' }}>Masuk ke EngPath</h2>
              <p style={{ fontSize: 13.5, color: 'var(--muted)', fontWeight: 700, margin: '0 0 24px' }}>Kami kirim magic link ke emailmu — tanpa password.</p>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Email</label>
                  <input
                    type="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="kamu@email.com"
                    style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 'var(--r-md)', border: '2px solid rgba(26,43,60,0.1)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--ink)', background: 'var(--offwhite)' }}
                  />
                </div>
                {error && <p style={{ fontSize: 13, color: 'var(--red)', fontWeight: 700, margin: 0 }}>{error}</p>}
                <button type="submit" disabled={loading} className="f-display" style={{ height: 52, borderRadius: 'var(--r-pill)', border: 'none', background: loading ? 'var(--faint)' : 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 17, fontWeight: 600, cursor: loading ? 'default' : 'pointer', boxShadow: loading ? 'none' : 'var(--sh-blue)' }}>
                  {loading ? 'Mengirim...' : 'Kirim Magic Link'}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📬</div>
              <h2 className="f-display" style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: 'var(--ink)' }}>Cek emailmu!</h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 700, lineHeight: 1.5, margin: '0 0 20px' }}>
                Magic link dikirim ke <strong style={{ color: 'var(--ink)' }}>{email}</strong>.<br />Klik link di email untuk masuk.
              </p>
              <button onClick={() => setSent(false)} style={{ fontSize: 13, color: 'var(--sky-ink)', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer' }}>
                Kirim ulang atau ganti email
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
