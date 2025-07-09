import { create } from 'zustand';
import { useEffect } from 'react';

export type Task = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

interface TaskStore {
  tasks: Task[];
  isSyncing: boolean;
  syncError: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
}

const API_URL = 'http://localhost:3001/api/tasks';
const CACHE_KEY = 'focusflow_tasks_cache';
const RETRY_LIMIT = 3;
const RETRY_DELAY = 1000; // ms

function saveCache(tasks: Task[]) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(tasks));
}
function loadCache(): Task[] {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function withRetry<T>(fn: () => Promise<T>, limit = RETRY_LIMIT): Promise<T> {
  let lastError;
  for (let i = 0; i < limit; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      await new Promise(res => setTimeout(res, RETRY_DELAY));
    }
  }
  throw lastError;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: loadCache(),
  isSyncing: false,
  syncError: null,

  fetchTasks: async () => {
    set({ isSyncing: true, syncError: null });
    try {
      const res = await withRetry(() => fetch(`${API_URL}`));
      const data = await res.json();
      set({ tasks: data.tasks || data, isSyncing: false });
      saveCache(data.tasks || data);
    } catch (err: any) {
      set({ isSyncing: false, syncError: err.message || 'Erreur réseau' });
    }
  },

  addTask: async (title) => {
    set({ isSyncing: true, syncError: null });
    // Optimistic update
    const tempId = Date.now();
    const optimisticTask: Task = {
      id: tempId,
      title,
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set(state => {
      const tasks = [optimisticTask, ...state.tasks];
      saveCache(tasks);
      return { tasks };
    });
    try {
      const res = await withRetry(() => fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      }));
      const newTask = await res.json();
      // Remplacer le task temporaire par le vrai
      set(state => {
        const tasks = state.tasks.map(t => t.id === tempId ? newTask : t);
        saveCache(tasks);
        return { tasks, isSyncing: false };
      });
    } catch (err: any) {
      // Rollback
      set(state => {
        const tasks = state.tasks.filter(t => t.id !== tempId);
        saveCache(tasks);
        return { tasks, isSyncing: false, syncError: err.message || 'Erreur réseau' };
      });
    }
  },

  toggleTask: async (id) => {
    set({ isSyncing: true, syncError: null });
    const task = get().tasks.find(t => t.id === id);
    if (!task) return;
    // Optimistic update
    set(state => {
      const tasks = state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
      saveCache(tasks);
      return { tasks };
    });
    try {
      await withRetry(() => fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !task.done }),
      }));
      set({ isSyncing: false });
    } catch (err: any) {
      // Rollback
      set(state => {
        const tasks = state.tasks.map(t => t.id === id ? { ...t, done: task.done } : t);
        saveCache(tasks);
        return { tasks, isSyncing: false, syncError: err.message || 'Erreur réseau' };
      });
    }
  },

  removeTask: async (id) => {
    set({ isSyncing: true, syncError: null });
    const prevTasks = get().tasks;
    // Optimistic update
    set(state => {
      const tasks = state.tasks.filter(t => t.id !== id);
      saveCache(tasks);
      return { tasks };
    });
    try {
      await withRetry(() => fetch(`${API_URL}/${id}`, { method: 'DELETE' }));
      set({ isSyncing: false });
    } catch (err: any) {
      // Rollback
      set({ tasks: prevTasks, isSyncing: false, syncError: err.message || 'Erreur réseau' });
      saveCache(prevTasks);
    }
  },
}));

export function useFetchTasksOnMount() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
} 