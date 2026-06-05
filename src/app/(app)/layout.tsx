import { BottomNav } from '@/components/layout/BottomNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--offwhite)', maxWidth: 480, margin: '0 auto', position: 'relative' }}>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }} className="no-scrollbar">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
