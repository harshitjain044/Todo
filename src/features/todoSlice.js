import { createSlice, nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "todo-manager.tasks";

const getFallbackTitle = (text = "") => {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return "Untitled task";
  }

  return trimmedText.split(" ").slice(0, 4).join(" ");
};

const createTask = ({
  id = nanoid(),
  title,
  text,
  priority = "medium",
  status = "todo",
  createdAt = new Date().toISOString(),
} = {}) => ({
  id,
  title: (title ?? getFallbackTitle(text)).trim(),
  text,
  priority,
  status,
  createdAt,
});

const sampleTasks = [
  createTask({
    id: "sample-1",
    title: "Plan the day",
    text: "Add your most important task and move it into progress when you start.",
    priority: "medium",
    status: "todo",
    createdAt: "2026-03-30T09:00:00.000Z",
  }),
  createTask({
    id: "sample-2",
    title: "Review completed work",
    text: "Use the board to track finished tasks and keep momentum visible.",
    priority: "low",
    status: "done",
    createdAt: "2026-03-31T15:45:00.000Z",
  }),
];

const loadTodos = () => {
  if (typeof window === "undefined") {
    return sampleTasks;
  }

  try {
    const rawTodos = window.localStorage.getItem(STORAGE_KEY);
    if (!rawTodos) {
      return sampleTasks;
    }

    const parsedTodos = JSON.parse(rawTodos);
    if (!Array.isArray(parsedTodos)) {
      return sampleTasks;
    }

    return parsedTodos.map((todo) =>
      createTask({
        id: todo.id,
        title: todo.title,
        text: todo.text ?? "",
        priority: todo.priority ?? "medium",
        status: todo.status ?? "backlog",
        createdAt: todo.createdAt,
      })
    );
  } catch {
    return sampleTasks;
  }
};

const initialState = {
  todos: loadTodos(),
};

const reorderWithinColumn = (tasks, sourceIndex, destinationIndex, status) => {
  const targetTasks = tasks.filter((task) => task.status === status);
  const movingTask = targetTasks[sourceIndex];

  if (!movingTask) {
    return tasks;
  }

  const nextColumnTasks = [...targetTasks];
  nextColumnTasks.splice(sourceIndex, 1);
  nextColumnTasks.splice(destinationIndex, 0, movingTask);

  const rebuiltTasks = [];
  let columnCursor = 0;

  tasks.forEach((task) => {
    if (task.status === status) {
      rebuiltTasks.push(nextColumnTasks[columnCursor]);
      columnCursor += 1;
      return;
    }

    rebuiltTasks.push(task);
  });

  return rebuiltTasks;
};

const moveAcrossColumns = (
  tasks,
  taskId,
  sourceStatus,
  destinationStatus,
  destinationIndex
) => {
  const taskToMove = tasks.find((task) => task.id === taskId);
  if (!taskToMove) {
    return tasks;
  }

  const remainingTasks = tasks.filter((task) => task.id !== taskId);
  const nextTask = { ...taskToMove, status: destinationStatus };
  const rebuiltTasks = [];
  let inserted = false;
  let destinationCursor = 0;

  remainingTasks.forEach((task) => {
    if (task.status === destinationStatus && destinationCursor === destinationIndex) {
      rebuiltTasks.push(nextTask);
      inserted = true;
    }

    rebuiltTasks.push(task);

    if (task.status === destinationStatus) {
      destinationCursor += 1;
    }
  });

  if (!inserted) {
    rebuiltTasks.push(nextTask);
  }

  return rebuiltTasks;
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.todos.unshift(action.payload);
      },
      prepare: ({ title, text, priority = "medium", status = "todo" }) => ({
        payload: createTask({
          title: title?.trim(),
          text: text.trim(),
          priority,
          status,
        }),
      }),
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newTitle, newText, priority } = action.payload;
      const todo = state.todos.find((task) => task.id === id);

      if (!todo) {
        return;
      }

      if (typeof newTitle === "string" && newTitle.trim()) {
        todo.title = newTitle.trim();
      }

      if (typeof newText === "string" && newText.trim()) {
        todo.text = newText.trim();
      }

      if (priority) {
        todo.priority = priority;
      }
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const todo = state.todos.find((task) => task.id === id);
      if (todo) {
        todo.status = status;
      }
    },
    reorderTodos: (state, action) => {
      const { taskId, sourceStatus, destinationStatus, sourceIndex, destinationIndex } =
        action.payload;

      if (sourceStatus === destinationStatus) {
        state.todos = reorderWithinColumn(
          state.todos,
          sourceIndex,
          destinationIndex,
          sourceStatus
        );
        return;
      }

      state.todos = moveAcrossColumns(
        state.todos,
        taskId,
        sourceStatus,
        destinationStatus,
        destinationIndex
      );
    },
    clearAllTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { addTodo, removeTodo, updateTodo, updateStatus, reorderTodos, clearAllTodos } =
  todoSlice.actions;

export { STORAGE_KEY };
export default todoSlice.reducer;
