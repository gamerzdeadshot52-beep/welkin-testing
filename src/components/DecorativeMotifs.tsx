import React from 'react';

export const HeroGeometricBackdrop: React.FC = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
    viewBox="0 0 1200 420"
    preserveAspectRatio="xMaxYMid slice"
    fill="none"
  >
    <g stroke="#D6C7AE" strokeWidth="1">
      <circle cx="960" cy="180" r="190" />
      <circle cx="960" cy="180" r="135" strokeDasharray="4 6" />
      <circle cx="960" cy="180" r="75" />
      <line x1="720" y1="180" x2="1190" y2="180" />
      <line x1="960" y1="-20" x2="960" y2="390" />
      <polygon points="960,45 1077,248 843,248" />
      <rect x="858" y="78" width="204" height="204" transform="rotate(45 960 180)" />
    </g>
    <g stroke="#8CA8BE" strokeWidth="0.75" opacity="0.7">
      <line x1="0" y1="360" x2="1200" y2="360" />
      <circle cx="140" cy="360" r="4" fill="#D6C7AE" />
      <circle cx="600" cy="360" r="4" fill="#D6C7AE" />
    </g>
  </svg>
);

export const SectionFlourishDivider: React.FC<{ label?: string }> = ({ label }) => (
  <div className="my-10 flex items-center gap-4" aria-hidden={!label}>
    <div className="h-px flex-1 bg-[#DED8CA]" />
    <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-[#7A6B57]">
      <svg className="h-3.5 w-3.5 text-[#8A6843]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1L15 8L8 15L1 8L8 1Z" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
      {label && <span>{label}</span>}
    </div>
    <div className="h-px flex-1 bg-[#DED8CA]" />
  </div>
);

export const ClassGeometricEmblem: React.FC<{ classNumber: number }> = ({ classNumber }) => {
  if (classNumber === 6) {
    return (
      <svg className="h-9 w-9 text-[#355978]" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="16" stroke="#DCD5C7" strokeWidth="1" fill="#F8F6F0" />
        <polygon points="18,9 26,24 10,24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="18" cy="19" r="2" fill="#8A6843" />
      </svg>
    );
  }
  if (classNumber === 7) {
    return (
      <svg className="h-9 w-9 text-[#2A6651]" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="16" stroke="#DCD5C7" strokeWidth="1" fill="#F8F6F0" />
        <rect x="11" y="11" width="14" height="14" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="13" width="10" height="10" stroke="#8A6843" strokeWidth="1" transform="rotate(45 18 18)" />
      </svg>
    );
  }
  if (classNumber === 8) {
    return (
      <svg className="h-9 w-9 text-[#5B527A]" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="16" stroke="#DCD5C7" strokeWidth="1" fill="#F8F6F0" />
        <polygon points="18,8 26.5,13 26.5,23 18,28 9.5,23 9.5,13" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="3" stroke="#8A6843" strokeWidth="1.2" />
      </svg>
    );
  }
  if (classNumber === 10) {
    return (
      <svg className="h-9 w-9 text-[#8A4A35]" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="16" stroke="#DCD5C7" strokeWidth="1" fill="#F8F6F0" />
        <polygon points="18,7 21,15 29,18 21,21 18,29 15,21 7,18 15,15" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="2.2" fill="#1E2A36" />
      </svg>
    );
  }
  return (
    <svg className="h-9 w-9 text-[#1E2A36]" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="16" stroke="#DCD5C7" strokeWidth="1" fill="#F8F6F0" />
      <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="18" cy="18" rx="11" ry="4.5" stroke="#8A6843" strokeWidth="1.1" transform="rotate(-25 18 18)" />
      <circle cx="18" cy="18" r="2" fill="currentColor" />
    </svg>
  );
};
