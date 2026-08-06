import Link from "next/link";
import { TaskDashboard } from "@/components/tasks/TaskDashboard";

export default function TasksPage() {
  return (
    <main className="stack">
      <nav className="page-nav" aria-label="Page">
        <Link href="/" className="button">
          Home
        </Link>
        <Link href="/activity" className="button">
          Activity
        </Link>
        <Link href="/reports" className="button">
          Reports
        </Link>
      </nav>
      <TaskDashboard />
    </main>
  );
}
