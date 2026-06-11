'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { BoltIcon } from '@/components/ui/Icons';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Email wajib diisi'); return; }
    setLoading(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    setLoading(false);
    if (resetError) { setError(resetError.message); return; }
    setSent(true);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(120% 80% at 50% 0%, var(--baby) 0%, var(--sky-wash) 50%, var(--offwhite) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: 'linear-gradient(140deg, var(--sky), var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)', margin: '0 auto 14px' }}>
            <BoltIcon size={30} style={{ color: '#fff' }} />
          </div>
          <div className="f-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>Reset Password</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 'var(--r-xl)', padding: '28px 24px', boxShadow: '0 4px 32px rgba(26,43,60,0.09), 0 0 0 1px rgba(26,43,60,0.05)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📬</div>
              <div className="f-display" style={{ fontSize: 19, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Cek emailmu</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 700, marginBottom: 20 }}>Link reset password dikirim ke <strong style={{ color: 'var(--ink)' }}>{email}</strong>.</div>
              <Link href="/login" className="f-display" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 48, padding: '0 24px', borderRadius: 'var(--r-pill)', background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Kembali ke Login</Link>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>Email terdaftar</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="kamu@email.com"
                  style={{ width: '100%', height: 52, padding: '0 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(26,43,60,0.13)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--ink)', background: '#fff', boxSizing: 'border-box' }}
                />
              </div>
              {error && <div style={{ background: 'rgba(242,91,91,0.08)', border: '1.5px solid rgba(242,91,91,0.25)', borderRadius: 'var(--r-md)', padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: '#C93535' }}>{error}</div>}
              <button type="submit" disabled={loading} className="f-display" style={{ height: 52, borderRadius: 'var(--r-pill)', border: 'none', background: loading ? 'var(--faint)' : 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 17, fontWeight: 600, cursor: loading ? 'default' : 'pointer', boxShadow: loading ? 'none' : 'var(--sh-blue)' }}>{loading ? 'Mengirim…' : 'Kirim Link Reset'}</button>
            </form>
          )}
        </div>

        {!sent && (
          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--muted)', fontWeight: 700 }}>
            <Link href="/login" style={{ fontWeight: 800, color: 'var(--sky-ink)', textDecoration: 'none' }}>← Kembali ke Login</Link>
          </div>
        )}
      </div>
    </main>
  );
}
