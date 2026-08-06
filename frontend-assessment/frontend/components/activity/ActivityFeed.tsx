"use client";

import { useActivity } from "@/hooks/useActivity";
import { ActivityList } from "@/components/activity/ActivityList";
import { ActivitySearch } from "@/components/activity/ActivitySearch";

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
        <p className="muted zero-margin meta-line">
          Total: {activity.length} | Visible: {filteredActivity.length}
        </p>
      </section>

      {loading ? (
        <section className="card panel">
          <p className="zero-margin">Loading activity...</p>
        </section>
      ) : null}

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
