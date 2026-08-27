type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className="brand-lockup" aria-hidden="true">
      <svg viewBox="0 0 46 46" width="40" height="40" role="img">
        <circle cx="23" cy="23" r="14" fill="none" stroke="currentColor" strokeWidth="5" />
        <path d="M23 6a17 17 0 0 1 17 17" fill="none" stroke="#1677ff" strokeWidth="6" strokeLinecap="round" />
        <circle cx="35" cy="11" r="4" fill="#1677ff" />
      </svg>
      {!compact && (
        <span>
          <strong>بوکان پایپ</strong>
          <small>BUKAN PIPE</small>
        </span>
      )}
    </span>
  );
}
