# Todo Manager

A frontend-only task management app built with React, Redux Toolkit, Vite, and Tailwind CSS.

It includes a compact dashboard layout, light/dark theme toggle, drag-and-drop task flow, local persistence, and a kanban board with `Backlog`, `Todo`, `In Progress`, and `Done`.

## Features

- Add tasks with heading, details, and priority
- Edit, delete, and move tasks between board sections
- Drag-and-drop task reordering
- Local storage persistence
- Light/dark theme toggle
- Compact progress summary
- Custom favicon and dashboard branding
- Starter sample tasks for first-time users

## Board Flow

- `Backlog`
- `Todo`
- `In Progress`
- `Done`

Newly created tasks are added to `Todo` by default.

## Tech Stack

- React 19
- Redux Toolkit
- React Redux
- Tailwind CSS 4
- Vite
- Lucide React
- React Hot Toast

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Notes

- Theme preference is stored in `localStorage`
- Tasks are stored in `localStorage`
- Sample tasks appear only for a fresh user with no saved local data

## Project Structure

```text
src/
  components/
  features/
  pages/
  store/
  App.jsx
  main.jsx
```
