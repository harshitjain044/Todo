import { CheckCheck, Moon, Sun } from "lucide-react";

export default function Header({ activeCount, totalCount, theme, onToggleTheme }) {
  return (
    <header className="hero-shell relative overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
      
      {/* background glow */}
      <div className="theme-hero-glow absolute inset-0 opacity-80" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Side */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <img src="/favicon.ico" alt="Todo Manager" className="h-6 w-6 rounded-md" />
            <h1 className="theme-text-primary text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
              Task Board
            </h1>
          </div>

          <p className="theme-text-muted mt-1 text-sm">
            Manage your workflow and keep track of tasks efficiently.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all hover:scale-[1.02]"
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3">

            {/* Open Tasks */}
            <div className="metric-tile min-w-[120px]">
              <div className="theme-accent-teal flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
                <img src="/favicon.ico" alt="" className="h-3.5 w-3.5 rounded-sm" />
                Open Tasks
              </div>

              <p className="theme-text-primary mt-1 text-2xl font-semibold">
                {activeCount}
              </p>

              <p className="theme-text-muted text-xs">
                {activeCount === 1 ? "1 task remaining" : `${activeCount} tasks remaining`}
              </p>
            </div>

            {/* Total Tasks */}
            <div className="metric-tile min-w-[120px]">
              <div className="theme-accent-lime flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
                <CheckCheck size={14} />
                Total Tasks
              </div>

              <p className="theme-text-primary mt-1 text-2xl font-semibold">
                {totalCount}
              </p>

              <p className="theme-text-muted text-xs">
                All tasks in workspace
              </p>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
