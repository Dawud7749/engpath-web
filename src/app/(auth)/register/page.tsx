'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { BoltIcon } from '@/components/ui/Icons';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim())               { setError('Nama wajib diisi'); return; }
    if (!email.includes('@'))       { setError('Email tidak valid'); return; }
    if (password.length < 6)        { setError('Password minimal 6 karakter'); return; }
    if (password !== confirm)       { setError('Konfirmasi password tidak cocok'); return; }

    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name.trim() } },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message.includes('already') ? 'Email sudah terdaftar.' : signUpError.message);
      return;
    }

    // Try direct sign-in (if email confirmation disabled, user gets session immediately)
    if (data.session) {
      router.push('/onboarding');
      router.refresh();
      return;
    }
    // Email confirmation required
    setLoading(false);
    setError('Cek emailmu untuk konfirmasi akun, lalu login.');
  };

  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(120% 80% at 50% 0%, var(--baby) 0%, var(--sky-wash) 50%, var(--offwhite) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px 40px', fontFamily: 'var(--font-body)', overflowY: 'auto' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: 'linear-gradient(140deg, var(--sky), var(--sky-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--sh-blue)', margin: '0 auto 14px' }}>
            <BoltIcon size={30} style={{ color: '#fff' }} />
          </div>
          <div className="f-display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>Daftar Akun</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 700, marginTop: 4 }}>Mulai perjalanan belajarmu</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 'var(--r-xl)', padding: '28px 24px', boxShadow: '0 4px 32px rgba(26,43,60,0.09), 0 0 0 1px rgba(26,43,60,0.05)' }}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="Nama Lengkap" type="text" value={name} onChange={setName} placeholder="Dawud" />
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="kamu@email.com" />
            <Field label="Password" type={showPass ? 'text' : 'password'} value={password} onChange={setPassword} placeholder="Min. 6 karakter"
              suffix={<button type="button" onClick={() => setShowPass(p => !p)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)' }}>{showPass ? 'Sembunyi' : 'Lihat'}</button>}
            />
            <Field label="Konfirmasi Password" type={showPass ? 'text' : 'password'} value={confirm} onChange={setConfirm} placeholder="Ulangi password" />
            {error && (
              <div style={{ background: 'rgba(242,91,91,0.08)', border: '1.5px solid rgba(242,91,91,0.25)', borderRadius: 'var(--r-md)', padding: '10px 14px', fontSize: 13.5, fontWeight: 700, color: '#C93535' }}>{error}</div>
            )}
            <button type="submit" disabled={loading} className="f-display" style={{ height: 52, borderRadius: 'var(--r-pill)', border: 'none', background: loading ? 'var(--faint)' : 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 17, fontWeight: 600, cursor: loading ? 'default' : 'pointer', boxShadow: loading ? 'none' : 'var(--sh-blue)', marginTop: 6 }}>
              {loading ? 'Mendaftar…' : 'Daftar'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--muted)', fontWeight: 700 }}>
          Sudah punya akun?{' '}
          <Link href="/login" style={{ fontWeight: 800, color: 'var(--sky-ink)', textDecoration: 'none' }}>Masuk</Link>
        </div>
      </div>
    </main>
  );
}

function Field({ label, type, value, onChange, placeholder, suffix }: { label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string; suffix?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={type} required value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ width: '100%', height: 52, padding: suffix ? '0 80px 0 16px' : '0 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(26,43,60,0.13)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', color: 'var(--ink)', background: '#fff', boxSizing: 'border-box' }}
        />
        {suffix && <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>{suffix}</div>}
      </div>
    </div>
  );
}
