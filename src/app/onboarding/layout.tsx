export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)', maxWidth: 480, margin: '0 auto', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto' }} className="no-scrollbar">
        {children}
      </div>
    </div>
  );
}
