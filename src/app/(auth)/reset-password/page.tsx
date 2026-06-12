'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { BoltIcon } from '@/components/ui/Icons';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setHasSession(!!data.session));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6)     { setError('Password minimal 6 karakter'); return; }
    if (password !== confirm)    { setError('Konfirmasi password tidak cocok'); return; }
    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message.includes('session')
        ? 'Sesi reset password kedaluwarsa. Klik ulang link di email.'
        : updateError.message);
      return;
    }
    setDone(true);
    setTimeout(() => { router.push('/dashboard'); router.refresh(); }, 1200);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(120% 80% at 50% 0%, var(--baby) 0%, var(--sky-wash) 50%, var(--offwhite) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'var(--font-body)' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: 'linear-gradient(140deg, var(--sky), var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)', margin: '0 auto 14px' }}>
            <BoltIcon size={30} style={{ color: '#fff' }} />
          </div>
          <div className="f-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>Buat Password Baru</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 700, marginTop: 4 }}>Setel password baru untuk akunmu</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 'var(--r-xl)', padding: '28px 24px', boxShadow: '0 4px 32px rgba(26,43,60,0.09), 0 0 0 1px rgba(26,43,60,0.05)' }}>
          {hasSession === null ? (
            <div style={{ textAlign: 'center', padding: '12px 0', color: 'var(--muted)', fontWeight: 700 }}>Memuat…</div>
          ) : hasSession === false ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>⚠️</div>
              <div className="f-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Link tidak valid atau kedaluwarsa</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 700, marginBottom: 18 }}>Minta link reset password baru.</div>
              <Link href="/forgot-password" className="f-display" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 48, padding: '0 24px', borderRadius: 'var(--r-pill)', background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Minta Link Baru</Link>
            </div>
          ) : done ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div className="f-display" style={{ fontSize: 19, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Password berhasil diubah!</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 700 }}>Mengarahkan ke dashboard…</div>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>Password baru</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 karakter"
                    style={{ width: '100%', height: 52, padding: '0 70px 0 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(26,43,60,0.13)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--ink)', background: '#fff', boxSizing: 'border-box' }}
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)' }}>{showPass ? 'Sembunyi' : 'Lihat'}</button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>Konfirmasi password</label>
                <input type={showPass ? 'text' : 'password'} required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Ulangi password"
                  style={{ width: '100%', height: 52, padding: '0 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(26,43,60,0.13)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--ink)', background: '#fff', boxSizing: 'border-box' }}
                />
              </div>
              {error && <div style={{ background: 'rgba(242,91,91,0.08)', border: '1.5px solid rgba(242,91,91,0.25)', borderRadius: 'var(--r-md)', padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: '#C93535' }}>{error}</div>}
              <button type="submit" disabled={loading} className="f-display" style={{ height: 52, borderRadius: 'var(--r-pill)', border: 'none', background: loading ? 'var(--faint)' : 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 17, fontWeight: 600, cursor: loading ? 'default' : 'pointer', boxShadow: loading ? 'none' : 'var(--sh-blue)' }}>
                {loading ? 'Menyimpan…' : 'Simpan Password Baru'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
