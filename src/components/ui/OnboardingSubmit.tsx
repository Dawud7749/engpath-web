'use client';
import { useFormStatus } from 'react-dom';

export function OnboardingSubmit({ label = 'Lanjut →', pendingLabel = 'Menyimpan…' }: { label?: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="f-display onboard-submit"
      style={{
        width: '100%', height: 56, borderRadius: 'var(--r-pill)', border: 'none',
        background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))',
        color: '#fff', fontSize: 17, fontWeight: 600,
        cursor: pending ? 'wait' : 'pointer',
        boxShadow: pending ? '0 4px 12px rgba(96,195,245,0.30)' : 'var(--sh-blue)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        opacity: pending ? 0.92 : 1,
        transform: pending ? 'scale(0.985)' : 'scale(1)',
        transition: 'transform .12s ease, box-shadow .2s ease, opacity .15s ease',
      }}
    >
      {pending && (
        <span
          aria-hidden="true"
          style={{
            width: 18, height: 18, borderRadius: '50%',
            border: '2.5px solid rgba(255,255,255,0.35)',
            borderTopColor: '#fff',
            animation: 'onboard-spin 0.7s linear infinite',
          }}
        />
      )}
      {pending ? pendingLabel : label}
    </button>
  );
}
