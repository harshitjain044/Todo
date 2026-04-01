import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { ArrowRight, Check, GripVertical, PencilLine, Trash2, X } from "lucide-react";
import { removeTodo, updateStatus, updateTodo } from "../features/todoSlice";

const priorityConfig = {
  low: {
    label: "Low",
    chip: "theme-chip-low",
  },
  medium: {
    label: "Medium",
    chip: "theme-chip-medium",
  },
  high: {
    label: "High",
    chip: "theme-chip-high",
  },
};

const statusFlow = {
  backlog: "todo",
  todo: "in-progress",
  "in-progress": "done",
  done: "backlog",
};

export default function TodoItem({ todo, index, onDragStart, onDragEnd }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title ?? "");
  const [newText, setNewText] = useState(todo.text);
  const [priority, setPriority] = useState(todo.priority);

  const createdDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
      }).format(new Date(todo.createdAt)),
    [todo.createdAt]
  );

  const handleSave = () => {
    const trimmedTitle = newTitle.trim();
    const trimmedValue = newText.trim();

    if (!trimmedTitle) {
      toast.error("Task heading cannot be empty.");
      return;
    }

    if (!trimmedValue) {
      toast.error("Task text cannot be empty.");
      return;
    }

    dispatch(
      updateTodo({ id: todo.id, newTitle: trimmedTitle, newText: trimmedValue, priority })
    );
    setNewTitle(trimmedTitle);
    setNewText(trimmedValue);
    setIsEditing(false);
    toast.success("Task updated.");
  };

  const handleCancel = () => {
    setNewTitle(todo.title ?? "");
    setNewText(todo.text);
    setPriority(todo.priority);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm("Delete this task from the board?");
    if (!shouldDelete) {
      return;
    }

    dispatch(removeTodo(todo.id));
    toast.success("Task deleted.");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSave();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      handleCancel();
    }
  };

  const advanceStatus = () => {
    dispatch(updateStatus({ id: todo.id, status: statusFlow[todo.status] }));
    toast.success("Task moved.");
  };

  const priorityStyle = priorityConfig[todo.priority] ?? priorityConfig.medium;

  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="card-surface p-3.5"
    >
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="theme-icon-chip rounded-2xl p-1.5">
            <GripVertical className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="theme-text-primary text-sm font-semibold tracking-tight">
              {todo.title ?? `Card ${index + 1}`}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${priorityStyle.chip}`}
        >
          {priorityStyle.label}
        </span>
      </div>

      {isEditing ? (
        <div className="grid gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onKeyDown={handleKeyDown}
            className="theme-input rounded-[18px] px-4 py-2.5 text-sm font-medium outline-none transition"
          />
          <textarea
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            autoFocus
            className="theme-input rounded-[20px] px-4 py-2.5 text-sm leading-6 outline-none transition"
          />
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="theme-input rounded-[18px] px-4 py-2.5 text-sm outline-none transition"
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>
        </div>
      ) : (
        <p className="theme-text-secondary line-clamp-2 text-sm leading-6">{todo.text}</p>
      )}

      <div className="theme-label mt-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em]">
        <span>Saved {createdDate}</span>
        <span>{todo.status.replace("-", " ")}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="action-btn action-btn-primary"
              aria-label="Save task"
              title="Save"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="action-btn action-btn-muted"
              aria-label="Cancel editing"
              title="Cancel"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="action-btn action-btn-muted"
              aria-label="Edit task"
              title="Edit"
            >
              <PencilLine className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={advanceStatus}
              className="action-btn action-btn-accent"
              aria-label="Move task to next status"
              title="Move"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="action-btn action-btn-danger"
              aria-label="Delete task"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </article>
  );
}
