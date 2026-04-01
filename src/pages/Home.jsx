import { useSelector } from "react-redux";
import { Activity, Flag, KanbanSquare, Sparkles, Trophy } from "lucide-react";
import AddTodo from "../components/AddTodo";
import Header from "../components/Header";
import TodoList from "../components/TodoList";

export default function Home({ theme, onToggleTheme }) {
  const todos = useSelector((state) => state.todos.todos);

  const completedCount = todos.filter((task) => task.status === "done").length;
  const activeCount = todos.length - completedCount;
  const inProgressCount = todos.filter((task) => task.status === "in-progress").length;
  const highPriorityCount = todos.filter((task) => task.priority === "high").length;
  const progressValue = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  const stats = [
    {
      label: "Tasks left",
      value: `${activeCount}`,
      icon: Activity,
      tone: "text-[#8fd2ca]",
    },
    {
      label: "In progress",
      value: `${inProgressCount}`,
      icon: KanbanSquare,
      tone: "text-[#d7b98b]",
    },
    {
      label: "High priority",
      value: `${highPriorityCount}`,
      icon: Flag,
      tone: "text-[#ef9a9a]",
    },
    {
      label: "Completed",
      value: `${completedCount}`,
      icon: Trophy,
      tone: "text-[#9de2b2]",
    },
  ];

  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header
          activeCount={activeCount}
          totalCount={todos.length}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
        <AddTodo
          completedCount={completedCount}
          totalCount={todos.length}
          progressValue={progressValue}
        />

        <section className="dashboard-card overflow-hidden p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="theme-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em]">
              <Sparkles className="h-3 w-3" />
              Workspace summary
            </div>
            <div className="grid gap-2 sm:grid-cols-4">
              {stats.map(({ label, value, tone }) => (
                <article
                  key={label}
                  className="theme-stat-card flex items-center gap-3 rounded-[18px] px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                  <div className={`theme-icon-chip rounded-xl px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${tone}`}>
                    {value}
                  </div>
                  <div>
                    <p className="theme-label text-[10px] font-semibold uppercase tracking-[0.18em]">
                      {label}
                    </p>
                    <p className="theme-text-primary mt-1 text-lg font-semibold tracking-tight">
                      {value}
                    </p>
                  </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <TodoList />
        </section>
      </div>
    </main>
  );
}
