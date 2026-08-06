import type { Task } from "@/types/api";

type TaskItemProps = {
  task: Task;
  busy: boolean;
  onToggle: (task: Task) => void;
};

export function TaskItem({ task, busy, onToggle }: TaskItemProps) {
  return (
    <li className={`card list-item${task.completed ? " task-item-done" : ""}`}>
      <div className="task-item-header">
        <p className="zero-margin list-item-title">{task.title}</p>
        <span className={task.completed ? "badge badge-done" : "badge badge-pending"}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <small className="muted">Updated: {new Date(task.updatedAt).toLocaleString()}</small>

      <div>
        <button
          type="button"
          className={task.completed ? "button" : "button primary"}
          onClick={() => onToggle(task)}
          disabled={busy}
          aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        >
          {busy ? "Saving..." : task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>
      </div>
    </li>
  );
}
