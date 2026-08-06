"use client";

import { useReports } from "@/hooks/useReports";

const STATUS_LABELS: Array<{ key: "todo" | "in-progress" | "done"; label: string }> = [
  { key: "todo", label: "To do" },
  { key: "in-progress", label: "In progress" },
  { key: "done", label: "Done" },
];

export function ReportsDashboard() {
  const { summary, loading, error, fetchSummary } = useReports();

  return (
    <section className="stack">
      <header className="card panel">
        <h1 className="page-title">Reports</h1>
        <p className="muted zero-margin">Task and activity summary from the Reports API.</p>
      </header>

      {loading ? (
        <section className="card panel">
          <p className="zero-margin">Loading reports...</p>
        </section>
      ) : null}

      {error ? (
        <section className="card panel panel-error">
          <p className="error-text">{error}</p>
          <button type="button" className="button" onClick={fetchSummary}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error && summary ? (
        <>
          <section className="stats-grid" aria-label="Summary metrics">
            <article className="card panel stat-card">
              <h2 className="stat-label">Total tasks</h2>
              <p className="stat-value">{summary.total}</p>
            </article>

            <article className="card panel stat-card">
              <h2 className="stat-label">Recent activity</h2>
              <p className="stat-value">{summary.recentActivityCount}</p>
            </article>
          </section>

          <section className="card panel" aria-label="Tasks by status">
            <h2 className="section-title">Tasks by status</h2>
            <ul className="status-breakdown">
              {STATUS_LABELS.map((status) => (
                <li key={status.key} className="status-row">
                  <span>{status.label}</span>
                  <strong>{summary.byStatus[status.key]}</strong>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
    </section>
  );
}
