import { ArrowDownRight, Circle } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="theme-empty-lane rounded-[28px] px-5 py-10 text-center">
      <div className="theme-empty-illustration mx-auto grid h-28 w-28 place-items-center rounded-full">
        <div className="relative h-14 w-14">
          <Circle className="absolute inset-0 h-14 w-14 opacity-25" />
          <ArrowDownRight className="absolute left-4 top-4 h-6 w-6" />
        </div>
      </div>
      <h3 className="theme-text-primary mt-6 text-2xl font-semibold tracking-tight">
        No tasks yet
      </h3>
    </div>
  );
}
