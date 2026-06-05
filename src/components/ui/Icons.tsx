'use client';
import React from 'react';

type IconProps = { size?: number; style?: React.CSSProperties; className?: string };

const ic = (d: string, opts?: { fill?: boolean }) =>
  function Icon({ size = 20, style, className }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={opts?.fill ? 'currentColor' : 'none'}
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        style={style} className={className}>
        <path d={d} />
      </svg>
    );
  };

export const BoltIcon        = ic('M13 2L3 14h9l-1 8 10-12h-9l1-8z');
export const FireIcon        = ic('M12 22c5.523 0 10-4.477 10-10 0-3-1-5.5-3-7.5-1 2-2.5 3-4 3-2 0-3.5-1.5-3.5-3.5S10 2 8 2C5 4.5 2 8 2 12c0 5.523 4.477 10 10 10z');
export const ShieldCheckIcon = ic('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4');
export const HomeIcon        = ic('M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10');
export const BookIcon        = ic('M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z');
export const SwordsIcon      = ic('M14.5 17.5L3 6V3h3l11.5 11.5M13 19l3.5 3.5 2-2L15 17M5 19l-3.5 3.5L0 21l11.5-11.5M3 21l3.5-3.5M21 3l-3.5 3.5');
export const ChartIcon       = ic('M18 20V10 M12 20V4 M6 20v-6');
export const UserIcon        = ic('M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z');
export const CheckIcon       = ic('M20 6L9 17l-5-5');
export const XIcon           = ic('M18 6L6 18 M6 6l12 12');
export const ChevRIcon       = ic('M9 18l6-6-6-6');
export const ChevLIcon       = ic('M15 18l-6-6 6-6');
export const PlayIcon        = ic('M5 3l14 9-14 9V3z', { fill: true });
export const MicIcon         = ic('M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 01-14 0v-2 M12 19v4 M8 23h8');
export const PenIcon         = ic('M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z');
export const SparkleIcon     = ic('M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z');
export const TargetIcon      = ic('M12 22a10 10 0 100-20 10 10 0 000 20z M12 18a6 6 0 100-12 6 6 0 000 12z M12 14a2 2 0 100-4 2 2 0 000 4z');
export const TrophyIcon      = ic('M6 9H2V4h4m12 5h4V4h-4M6 9a6 6 0 0012 0M6 9H2m16 0h4M8 21h8M12 17v4');
export const BellIcon        = ic('M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0');
export const CrownIcon       = ic('M2 20h20 M5 20L3 8l4.5 4L12 4l4.5 8L21 8l-2 12');
export const RefreshIcon     = ic('M1 4v6h6 M23 20v-6h-6 M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15');
export const ShareIcon       = ic('M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8 M16 6l-4-4-4 4 M12 2v13');
export const ClockIcon       = ic('M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2');
export const EyeIcon         = ic('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z');
export const SoundIcon       = ic('M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 010 14.14 M15.54 8.46a5 5 0 010 7.07');
export const CalIcon         = ic('M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18');
export const SettingsIcon    = ic('M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z');
export const HeadphoneIcon   = ic('M3 18v-6a9 9 0 0118 0v6 M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z');
export const CheckCircleIcon = ic('M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3');
export const XCircleIcon     = ic('M12 22a10 10 0 100-20 10 10 0 000 20z M15 9l-6 6 M9 9l6 6');
export const ArrowUpIcon     = ic('M12 19V5 M5 12l7-7 7 7');
