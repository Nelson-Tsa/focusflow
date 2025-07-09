import React, { useRef } from 'react';
import { useTaskStore } from '../utils/useTaskStore';

interface TaskInputProps {
  inputRef?: React.RefObject<HTMLInputElement>;
}

const TaskInput: React.FC<TaskInputProps> = ({ inputRef }) => {
  const [value, setValue] = React.useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleAdd = async () => {
    if (value.trim()) {
      await addTask(value.trim());
      setValue('');
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        ref={inputRef}
        type="text"
        className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-900"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput; 