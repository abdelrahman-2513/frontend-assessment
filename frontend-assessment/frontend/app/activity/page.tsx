import Link from "next/link";
import { ActivityFeed } from "@/components/activity/ActivityFeed";

export default function ActivityPage() {
  return (
    <main className="stack">
      <nav className="page-nav" aria-label="Page">
        <Link href="/" className="button">
          Home
        </Link>
        <Link href="/tasks" className="button">
          Tasks
        </Link>
        <Link href="/reports" className="button">
          Reports
        </Link>
      </nav>
      <ActivityFeed />
    </main>
  );
}
