import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { STORAGE_KEY } from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    const { todos } = store.getState().todos;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  });
}
