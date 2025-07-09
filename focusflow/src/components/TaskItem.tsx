import React from 'react';
import { Task, useTaskStore } from '../utils/useTaskStore';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  const handleToggle = async () => {
    await toggleTask(task.id);
  };

  const handleRemove = async () => {
    await removeTask(task.id);
  };

  return (
    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg mb-2 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300">
      <label className="flex items-center gap-2 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={task.done}
          onChange={handleToggle}
          className="accent-green-500 w-5 h-5"
        />
        <span
          data-testid={`task-title-${task.id}`}
          className={`text-base ${task.done ? 'line-through text-gray-400' : 'text-gray-900 font-medium'}`}
        >
          {task.title}
        </span>
      </label>
      <button
        className="ml-4 text-red-500 hover:text-red-700"
        onClick={handleRemove}
        aria-label="Delete task"
      >
        &times;
      </button>
    </div>
  );
};

export default TaskItem; 