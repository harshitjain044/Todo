import { CheckCircle2, CircleDashed, TimerReset, Trophy } from "lucide-react";

const detailCards = (completedCount, totalCount, remainingCount, progressValue) => [
  {
    label: `${completedCount}/${totalCount} Completed`,
    value: completedCount,
    icon: Trophy,
    tone: "text-[#9de2b2]",
  },
  {
    label: "Completed",
    value: completedCount,
    icon: CheckCircle2,
    tone: "text-[#9de2b2]",
  },
  {
    label: "Open",
    value: remainingCount,
    icon: CircleDashed,
    tone: "text-[#dfc28c]",
  },
  {
    label: "Rate",
    value: `${progressValue}%`,
    icon: TimerReset,
    tone: "text-[#95d4d0]",
  },
];

export default function ProgressChart({ completedCount, totalCount, progressValue, compact = false }) {
  const remainingCount = totalCount - completedCount;

  if (compact) {
    return (
      <div className="grid min-h-[15rem] grid-cols-2 gap-3 overflow-hidden">
        {detailCards(completedCount, totalCount, remainingCount, progressValue).map(
          ({ label, value, tone }) => (
            <article
              key={label}
              className="theme-stat-card flex min-h-[7rem] min-w-0 flex-col justify-between overflow-hidden rounded-[22px] px-3 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="theme-label min-w-0 text-[9px] font-semibold uppercase leading-4 tracking-[0.14em] break-words">
                  {label}
                </p>
                <div className={`theme-icon-chip shrink-0 rounded-xl px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${tone}`}>
                  {value}
                </div>
              </div>
              <p className="theme-text-primary text-xl font-semibold tracking-tight">{value}</p>
            </article>
          )
        )}
      </div>
    );
  }

  const dashOffset = 339.292 - (339.292 * progressValue) / 100;

  return (
    <section className="dashboard-card p-5">
      <h2 className="theme-text-primary text-xl font-semibold tracking-tight">Progress</h2>

      <div className="theme-subpanel mt-6 flex flex-col items-center gap-5 rounded-[28px] px-5 py-6">
        <div className="relative grid h-44 w-44 place-items-center">
          <svg className="h-44 w-44 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="theme-progress-track" cx="60" cy="60" r="54" fill="none" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              className="theme-progress-ring"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="339.292"
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute text-center">
            <p className="theme-text-primary text-5xl font-semibold tracking-tight">{progressValue}</p>
            <p className="theme-label mt-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
              percent done
            </p>
          </div>
        </div>
        <p className="theme-text-muted text-sm">{completedCount} / {totalCount} completed</p>
      </div>

      <div className="mt-5 grid gap-3">
        {detailCards(completedCount, totalCount, remainingCount, progressValue).map(
          ({ label, value, tone }) => (
            <article
              key={label}
              className="theme-stat-card flex items-center justify-between rounded-[22px] px-4 py-4"
            >
              <div>
                <p className="theme-label text-[11px] font-semibold uppercase tracking-[0.24em]">
                  {label}
                </p>
                <p className="theme-text-primary mt-2 text-2xl font-semibold tracking-tight">{value}</p>
              </div>
              <div className={`theme-icon-chip rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${tone}`}>
                {value}
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}
