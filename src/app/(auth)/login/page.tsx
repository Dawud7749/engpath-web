'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { BoltIcon } from '@/components/ui/Icons';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setLoading(false);
      setError(
        signInError.message.includes('Invalid login credentials')
          ? 'Email atau password salah.'
          : signInError.message
      );
      return;
    }
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(120% 80% at 50% 0%, var(--baby) 0%, var(--sky-wash) 50%, var(--offwhite) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: 'linear-gradient(140deg, var(--sky), var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)', margin: '0 auto 14px' }}>
            <BoltIcon size={30} style={{ color: '#fff' }} />
          </div>
          <div className="f-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>EngPath</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 700, marginTop: 4 }}>Learn together. Compete better.</div>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 'var(--r-xl)', padding: '28px 24px', boxShadow: '0 4px 32px rgba(26,43,60,0.09), 0 0 0 1px rgba(26,43,60,0.05)' }}>
          <div className="f-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>Masuk</div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>Email</label>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="kamu@email.com"
                style={{ width: '100%', height: 52, padding: '0 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(26,43,60,0.13)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--ink)', background: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'} required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', height: 52, padding: '0 60px 0 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(26,43,60,0.13)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--ink)', background: '#fff', boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)' }}>{showPass ? 'Sembunyi' : 'Lihat'}</button>
              </div>
            </div>
            {error && (
              <div style={{ background: 'rgba(242,91,91,0.08)', border: '1.5px solid rgba(242,91,91,0.25)', borderRadius: 'var(--r-md)', padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: '#C93535' }}>{error}</div>
            )}
            <Link href="/forgot-password" style={{ alignSelf: 'flex-end', fontSize: 13, fontWeight: 700, color: 'var(--sky-ink)', textDecoration: 'none' }}>Lupa password?</Link>
            <button type="submit" disabled={loading} className="f-display" style={{ height: 52, borderRadius: 'var(--r-pill)', border: 'none', background: loading ? 'var(--faint)' : 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 17, fontWeight: 600, cursor: loading ? 'default' : 'pointer', boxShadow: loading ? 'none' : 'var(--sh-blue)' }}>
              {loading ? 'Masuk…' : 'Masuk'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--muted)', fontWeight: 700 }}>
          Belum punya akun?{' '}
          <Link href="/register" style={{ fontWeight: 800, color: 'var(--sky-ink)', textDecoration: 'none' }}>Daftar</Link>
        </div>
      </div>
    </main>
  );
}
