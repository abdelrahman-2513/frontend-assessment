import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <header className="home-header">
        <h1>VeeLion Task System</h1>
        <p className="muted zero-margin">
          Manage tasks, review activity, and check summary reports.
        </p>
      </header>

      <section className="home-grid" aria-label="Modules">
        <Link href="/tasks" className="card home-card home-card-tasks">
          <span className="home-card-kicker">Tasks</span>
          <h2>Task Dashboard</h2>
          <p>View and update task completion status.</p>
        </Link>

        <Link href="/activity" className="card home-card home-card-activity">
          <span className="home-card-kicker">Activity</span>
          <h2>Activity Feed</h2>
          <p>Search recent actions across the system.</p>
        </Link>

        <Link href="/reports" className="card home-card home-card-reports">
          <span className="home-card-kicker">Insights</span>
          <h2>Reports</h2>
          <p>Totals, status breakdown, and recent activity count.</p>
        </Link>
      </section>
    </main>
  );
}
