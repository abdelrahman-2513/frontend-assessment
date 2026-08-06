import type { ActivityLog } from "@/types/api";
import { ActivityItem } from "@/components/activity/ActivityItem";

type ActivityListProps = {
  items: ActivityLog[];
  hasQuery: boolean;
};

export function ActivityList({ items, hasQuery }: ActivityListProps) {
  if (items.length === 0) {
    return (
      <section className="card panel">
        <p className="muted zero-margin">
          {hasQuery ? "No activity matches your search." : "No activity logs yet."}
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Activity list">
      <ul className="plain-list">
        {items.map((item) => (
          <ActivityItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
