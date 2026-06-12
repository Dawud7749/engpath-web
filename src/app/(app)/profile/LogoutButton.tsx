'use client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const logout = () => {
    start(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
      router.refresh();
    });
  };
  return (
    <button onClick={logout} disabled={pending} style={{ width: '100%', marginTop: 16, padding: '14px 0', borderRadius: 'var(--r-pill)', border: '1.5px solid var(--red-soft)', background: 'var(--red-soft)', color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, cursor: pending ? 'wait' : 'pointer', opacity: pending ? 0.8 : 1 }}>
      {pending ? 'Keluar…' : 'Keluar'}
    </button>
  );
}
