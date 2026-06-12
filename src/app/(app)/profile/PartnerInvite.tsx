'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { pairPartnerByEmail, unpairPartner } from './actions';

type Props = {
  partner: null | { display_name: string | null; email: string | null };
  myEmail: string;
};

export function PartnerInvite({ partner, myEmail }: Props) {
  const router = useRouter();
  const [open, setOpen]   = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const [pending, start] = useTransition();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setOkMsg('');
    const fd = new FormData(); fd.set('partner_email', email);
    start(async () => {
      const res = await pairPartnerByEmail(fd);
      if (!res.ok) { setError(res.error || 'Gagal.'); return; }
      setOkMsg('Tersambung! Mengarahkan…');
      setTimeout(() => { setOpen(false); router.refresh(); }, 800);
    });
  };

  const unpair = () => {
    if (!confirm('Putus pasangan belajar?')) return;
    start(async () => {
      const res = await unpairPartner();
      if (res.ok) router.refresh();
    });
  };

  if (partner) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#fff', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh-sm)', border: '1px solid rgba(26,43,60,0.04)' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(150deg, var(--sky), var(--sky-deep))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>
          {(partner.display_name || partner.email || 'P').charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.3 }}>Partner belajar</div>
          <div className="f-display" style={{ fontSize: 16, fontWeight: 600, color: 'var(--sky-ink)' }}>{partner.display_name || partner.email}</div>
        </div>
        <button onClick={unpair} disabled={pending} style={{ height: 32, padding: '0 12px', border: 'none', borderRadius: 'var(--r-pill)', background: 'var(--red-soft)', color: 'var(--red)', fontSize: 12, fontWeight: 800, cursor: pending ? 'wait' : 'pointer' }}>
          {pending ? '…' : 'Putus'}
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'linear-gradient(135deg, var(--pink-wash), #fff)', border: '1.5px dashed var(--lpink)', borderRadius: 'var(--r-lg)', cursor: 'pointer', textAlign: 'left' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--lpink)', color: 'var(--pink-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>+</div>
        <div style={{ flex: 1 }}>
          <div className="f-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--pink-ink)' }}>Undang partner belajar</div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--muted)', marginTop: 2 }}>Belajar bareng, duel, & saling tarik streak</div>
        </div>
      </button>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: 18, boxShadow: 'var(--sh-sm)', border: '1px solid rgba(26,43,60,0.06)' }}>
      <div className="f-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>Sambungkan partner</div>
      <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 700, marginBottom: 14 }}>
        Masukkan email partner yang sudah punya akun EngPath. Setelah tersambung, kalian saling lihat progress + bisa duel.
      </div>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          type="email" required value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="partner@email.com"
          style={{ height: 48, padding: '0 16px', borderRadius: 'var(--r-md)', border: '1.5px solid rgba(26,43,60,0.13)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', background: '#fff' }}
        />
        {error && <div style={{ background: 'rgba(242,91,91,0.08)', borderRadius: 'var(--r-md)', padding: '8px 12px', fontSize: 13, fontWeight: 700, color: '#C93535' }}>{error}</div>}
        {okMsg && <div style={{ background: 'var(--green-soft)', borderRadius: 'var(--r-md)', padding: '8px 12px', fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>{okMsg}</div>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => { setOpen(false); setError(''); }} disabled={pending} style={{ flex: 1, height: 44, borderRadius: 'var(--r-pill)', border: '1.5px solid rgba(26,43,60,0.12)', background: '#fff', color: 'var(--ink-2)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Batal</button>
          <button type="submit" disabled={pending} className="f-display" style={{ flex: 2, height: 44, borderRadius: 'var(--r-pill)', border: 'none', background: pending ? 'var(--faint)' : 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', fontSize: 15, fontWeight: 600, cursor: pending ? 'wait' : 'pointer', boxShadow: pending ? 'none' : 'var(--sh-blue)' }}>
            {pending ? 'Menghubungkan…' : 'Sambungkan'}
          </button>
        </div>
        <div style={{ marginTop: 4, padding: '8px 12px', background: 'var(--sky-wash)', borderRadius: 'var(--r-sm)', fontSize: 12, fontWeight: 700, color: 'var(--sky-ink)', lineHeight: 1.5 }}>
          <strong>Tips:</strong> kasih email kamu (<code style={{ background: '#fff', padding: '1px 5px', borderRadius: 4 }}>{myEmail}</code>) ke partner kalau dia mau yang nyambungin.
        </div>
      </form>
    </div>
  );
}
