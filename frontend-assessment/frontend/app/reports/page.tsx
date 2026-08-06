import Link from "next/link";
import { ReportsDashboard } from "@/components/reports/ReportsDashboard";

export default function ReportsPage() {
  return (
    <main className="stack">
      <nav className="page-nav" aria-label="Page">
        <Link href="/" className="button">
          Home
        </Link>
        <Link href="/tasks" className="button">
          Tasks
        </Link>
        <Link href="/activity" className="button">
          Activity
        </Link>
      </nav>
      <ReportsDashboard />
    </main>
  );
}
