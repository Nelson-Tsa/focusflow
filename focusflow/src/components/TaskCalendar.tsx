import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TaskCalendar.css';
import { useTaskStore, Task } from '../utils/useTaskStore';

function sameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const TaskCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const tasks = useTaskStore((state) => state.tasks);

  // Filtrer les tâches du jour sélectionné
  const tasksForSelectedDate = selectedDate
    ? tasks.filter(task => sameDay(new Date(task.createdAt), selectedDate))
    : [];

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        onChange={date => setSelectedDate(date as Date)}
        value={selectedDate}
        className="rounded-lg shadow"
        tileClassName={({ date, view }) => {
          // Surligner les jours avec tâches
          if (tasks.some(task => sameDay(new Date(task.createdAt), date))) {
            return 'bg-green-200';
          }
          return '';
        }}
      />
      <div className="w-full mt-2">
        <h3 className="text-lg font-semibold mb-2 text-center">
          {selectedDate ? `Tâches du ${selectedDate.toLocaleDateString()}` : 'Sélectionne une date'}
        </h3>
        {tasksForSelectedDate.length === 0 ? (
          <div className="text-gray-400 text-center">Aucune tâche ce jour-là.</div>
        ) : (
          <ul className="space-y-2">
            {tasksForSelectedDate.map(task => (
              <li key={task.id} className="bg-white rounded p-2 shadow flex items-center gap-2">
                <span className={task.done ? 'line-through text-gray-400' : 'text-gray-900'}>
                  {task.title}
                </span>
                {task.done && <span className="ml-2 text-green-500">✔</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskCalendar; 