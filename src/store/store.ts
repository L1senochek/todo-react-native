import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import ITask from '../model/Task';

interface TodoState {
  tasks: ITask[];
  addTask: (task: Omit<ITask, 'id'>) => void;
  updateTask: (id: number, updatedTask: Partial<Omit<ITask, 'id'>>) => void;
  deleteTask: (id: number) => void;
  toggleTaskStatus: (id: number) => void;
}

export const store = create<TodoState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => {
          const newId = state.tasks.length
            ? Math.max(...state.tasks.map((t) => t.id)) + 1
            : 1;
          return { tasks: [...state.tasks, { ...task, id: newId }] };
        }),
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTaskStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
    }),
    { name: 'todo-storage' }
  )
);
