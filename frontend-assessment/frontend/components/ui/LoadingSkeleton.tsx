type LoadingSkeletonProps = {
  variant?: "list" | "reports";
  count?: number;
};

export function LoadingSkeleton({ variant = "list", count = 3 }: LoadingSkeletonProps) {
  if (variant === "reports") {
    return (
      <div className="stack" aria-busy="true" aria-live="polite" aria-label="Loading reports">
        <div className="stats-grid">
          <div className="card panel skeleton-card">
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-stat" />
          </div>
          <div className="card panel skeleton-card">
            <div className="skeleton skeleton-label" />
            <div className="skeleton skeleton-stat" />
          </div>
        </div>
        <div className="card panel">
          <div className="skeleton skeleton-title" />
          <div className="skeleton-status-list">
            <div className="skeleton skeleton-row" />
            <div className="skeleton skeleton-row" />
            <div className="skeleton skeleton-row" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="plain-list" aria-busy="true" aria-live="polite" aria-label="Loading content">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="card list-item skeleton-card">
          <div className="skeleton-row-top">
            <div className="skeleton skeleton-line skeleton-line-lg" />
            <div className="skeleton skeleton-chip" />
          </div>
          <div className="skeleton skeleton-line skeleton-line-md" />
          <div className="skeleton skeleton-line skeleton-line-sm" />
        </li>
      ))}
    </ul>
  );
}
