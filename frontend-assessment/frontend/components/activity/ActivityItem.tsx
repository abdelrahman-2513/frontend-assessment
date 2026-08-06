import type { ActivityLog } from "@/types/api";

type ActivityItemProps = {
  item: ActivityLog;
};

function formatTime(value: string): string {
  return new Date(value).toLocaleString();
}

export function ActivityItem({ item }: ActivityItemProps) {
  return (
    <li className="card list-item">
      <div className="list-item-title">{item.action || "(no action)"}</div>
      <div className="list-item-body">{item.info || "(no info)"}</div>
      <time className="muted" dateTime={item.when}>
        {formatTime(item.when)}
      </time>
    </li>
  );
}
