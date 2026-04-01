import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2, Circle, RotateCw } from "lucide-react";
import { reorderTodos } from "../features/todoSlice";
import EmptyState from "./EmptyState";
import TodoItem from "./TodoItem";

const columns = [
  {
    key: "backlog",
    title: "Backlog",
    icon: Circle,
    tone: "border-[#315159] bg-[#0d1b23]",
  },
  {
    key: "todo",
    title: "Todo",
    icon: Circle,
    tone: "border-[#315159] bg-[#0d1b23]",
  },
  {
    key: "in-progress",
    title: "In Progress",
    icon: RotateCw,
    tone: "border-[#6f5536] bg-[#1b140f]",
  },
  {
    key: "done",
    title: "Done",
    icon: CheckCircle2,
    tone: "border-[#355c42] bg-[#101811]",
  },
];

export default function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [draggedTask, setDraggedTask] = useState(null);

  const groupedTodos = useMemo(
    () =>
      columns.reduce((accumulator, column) => {
        accumulator[column.key] = todos.filter((task) => task.status === column.key);
        return accumulator;
      }, {}),
    [todos]
  );

  const handleDrop = (event, destinationStatus, destinationIndex) => {
    event.preventDefault();

    if (!draggedTask) {
      return;
    }

    dispatch(
      reorderTodos({
        taskId: draggedTask.id,
        sourceStatus: draggedTask.status,
        destinationStatus,
        sourceIndex: draggedTask.index,
        destinationIndex,
      })
    );

    setDraggedTask(null);
  };

  return (
    <section className="dashboard-card p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="theme-text-primary text-xl font-semibold tracking-tight">Board</h2>
      </div>

      {todos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((column) => {
            const Icon = column.icon;
            const items = groupedTodos[column.key];

            return (
              <article
                key={column.key}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, column.key, items.length)}
                className={`theme-lane flex min-h-[38rem] flex-col rounded-[28px] ${column.tone} p-4`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="theme-lane-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]">
                      <Icon className="h-3.5 w-3.5" />
                      {column.title}
                    </div>
                  </div>
                  <span className="theme-lane-count rounded-full px-3 py-1 text-sm font-semibold">
                    {items.length}
                  </span>
                </div>

                <div className="flex max-h-[32.5rem] flex-1 flex-col gap-3 overflow-y-auto pr-1">
                  {items.length === 0 ? (
                    <div className="theme-empty-lane rounded-[22px] px-4 py-8 text-center text-sm">
                      No tasks
                    </div>
                  ) : (
                    items.map((todo, index) => (
                      <div
                        key={todo.id}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => handleDrop(event, column.key, index)}
                      >
                        <TodoItem
                          todo={todo}
                          index={index}
                          onDragStart={() =>
                            setDraggedTask({ id: todo.id, status: todo.status, index })
                          }
                          onDragEnd={() => setDraggedTask(null)}
                        />
                      </div>
                    ))
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
