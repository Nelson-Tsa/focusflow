import React, { useRef, useState } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { useFetchTasksOnMount, useTaskStore } from '../utils/useTaskStore';
import TaskCalendar from './TaskCalendar';

const menu = [
  { label: 'My Tasks', value: 'tasks', icon: '📝' },
  { label: 'Calendar', value: 'calendar', icon: '📅' },
  // Ajoute d'autres items ici si besoin
];

const tabs = [
  { label: 'All Tasks', value: 'all' },
  { label: 'In Progress', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

const TaskPage: React.FC = () => {
  useFetchTasksOnMount();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [activePage, setActivePage] = useState<'tasks' | 'calendar'>('tasks');
  const inputRef = useRef<HTMLInputElement>(null);
  const tasks = useTaskStore((state) => state.tasks);

  // Filtrage des tâches selon l'onglet
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return !task.done;
    if (activeTab === 'completed') return task.done;
    return true;
  });

  // Fonction pour focus sur l'input
  const handleNewTask = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="min-h-screen flex bg-[#122117]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#264533] flex flex-col py-8 px-4 text-white rounded-tr-3xl rounded-br-3xl shadow-lg">
        <div className="mb-10 text-2xl font-bold tracking-wide text-green-300">FocusFlow</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {menu.map((item) => (
              <li key={item.value}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
                    activePage === item.value ? 'bg-green-500/80 text-white' : 'hover:bg-green-500/20 text-white'
                  }`}
                  onClick={() => setActivePage(item.value as 'tasks' | 'calendar')}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="mt-10 bg-green-500 text-white py-3 rounded-xl font-semibold shadow hover:bg-green-600 transition"
          onClick={handleNewTask}
        >
          + New Task
        </button>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        {activePage === 'tasks' && (
          <>
            <header className="w-full max-w-2xl mb-8">
              <h1 className="text-3xl font-bold text-gray-100 mb-2">My Tasks</h1>
              <p className="text-green-300">Manage your tasks efficiently and stay on top of your schedule.</p>
            </header>
            {/* Tabs */}
            <div className="w-full max-w-2xl flex gap-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  className={`px-4 py-2 rounded-full font-semibold shadow transition ${
                    activeTab === tab.value
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                  }`}
                  onClick={() => setActiveTab(tab.value as any)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Task input & list */}
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
              <TaskInput inputRef={inputRef} />
              <TaskList tasks={filteredTasks} />
            </div>
          </>
        )}
        {activePage === 'calendar' && (
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
            <TaskCalendar />
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskPage; 