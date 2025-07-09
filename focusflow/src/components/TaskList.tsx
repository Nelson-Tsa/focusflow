import React from 'react';
import { useTaskStore, Task } from '../utils/useTaskStore';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks?: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const storeTasks = useTaskStore((state) => state.tasks);
  const displayTasks = tasks ?? storeTasks;

  if (displayTasks.length === 0) {
    return <div className="text-gray-400 text-center mt-8">No tasks yet.</div>;
  }

  return (
    <div className="mt-4">
      {displayTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList; 