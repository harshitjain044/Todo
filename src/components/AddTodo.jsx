import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { ArrowUpRight, Plus } from "lucide-react";
import { addTodo } from "../features/todoSlice";
import ProgressChart from "./ProgressChart";

const priorities = [
  { value: "low", label: "Low", hint: "background" },
  { value: "medium", label: "Medium", hint: "standard" },
  { value: "high", label: "High", hint: "urgent" },
];

export default function AddTodo({ completedCount, totalCount, progressValue }) {
  const [title, setTitle] = useState("");
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedValue = input.trim();

    if (!trimmedTitle) {
      toast.error("Add a heading for the task.");
      return;
    }

    if (!trimmedValue) {
      toast.error("Write a task before adding it.");
      return;
    }

    dispatch(addTodo({ title: trimmedTitle, text: trimmedValue, priority }));
    setTitle("");
    setInput("");
    setPriority("medium");
    toast.success("Task added to the board.");
  };

  return (
    <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
      <section className="dashboard-card p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <p className="theme-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
              <ArrowUpRight className="h-3.5 w-3.5" />
              New Task
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="theme-subpanel rounded-[24px] p-3.5 sm:p-4"
          >
            <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr_auto] lg:items-end">
              <label className="grid gap-2">
                <span className="theme-label text-[10px] font-semibold uppercase tracking-[0.22em]">
                  Heading
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Heading"
                  className="theme-input rounded-[18px] px-4 py-3 text-sm outline-none transition"
                />
              </label>

              <label className="grid gap-2">
                <span className="theme-label text-[10px] font-semibold uppercase tracking-[0.22em]">
                  Details
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Details"
                  className="theme-input rounded-[18px] px-4 py-3 text-sm outline-none transition"
                />
              </label>

              <button
                type="submit"
                className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[18px] bg-[#dcb386] px-5 text-sm font-semibold text-[#241711] transition hover:-translate-y-0.5 hover:bg-[#e9c096]"
              >
                <Plus className="h-4 w-4" />
                Add task
              </button>
            </div>

            <div className="mt-3 grid gap-2">
              <span className="theme-label text-[10px] font-semibold uppercase tracking-[0.22em]">
                Priority
              </span>
              <div className="grid gap-2 sm:grid-cols-3">
                {priorities.map((item) => {
                  const isActive = item.value === priority;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setPriority(item.value)}
                      className={`theme-priority-option rounded-[18px] px-3 py-2.5 text-left transition ${
                        isActive ? "theme-priority-active" : ""
                      }`}
                    >
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="theme-label mt-0.5 text-[10px] uppercase tracking-[0.18em]">
                        {item.hint}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="dashboard-card p-4 sm:p-5">
        <h2 className="theme-text-primary mb-4 text-lg font-semibold tracking-tight">Progress</h2>
        <ProgressChart
          completedCount={completedCount}
          totalCount={totalCount}
          progressValue={progressValue}
          compact
        />
      </section>
    </section>
  );
}
