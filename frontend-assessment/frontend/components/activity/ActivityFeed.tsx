"use client";

import { useActivity } from "@/hooks/useActivity";
import { ActivityList } from "@/components/activity/ActivityList";
import { ActivitySearch } from "@/components/activity/ActivitySearch";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export function ActivityFeed() {
  const { activity, filteredActivity, query, setQuery, loading, error, fetchActivity } =
    useActivity();

  return (
    <section className="stack">
      <header className="card panel">
        <h1 className="page-title">Activity Feed</h1>
        <ActivitySearch value={query} onChange={setQuery} />
      </header>

      <section className="card panel">
        <p className="meta-pill zero-margin">
          Total: {loading ? "—" : activity.length}
          <span aria-hidden="true">·</span>
          Visible: {loading ? "—" : filteredActivity.length}
        </p>
      </section>

      {loading ? <LoadingSkeleton variant="list" count={4} /> : null}

      {error ? (
        <section className="card panel panel-error">
          <p className="error-text">{error}</p>
          <button type="button" className="button" onClick={fetchActivity}>
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? (
        <ActivityList items={filteredActivity} hasQuery={query.trim().length > 0} />
      ) : null}
    </section>
  );
}
