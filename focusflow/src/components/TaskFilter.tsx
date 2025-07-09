import { useTaskStore } from '../utils/useTaskStore';

type Filter = 'all' | 'active' | 'completed';

interface TaskFilterProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export default function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  const tasks = useTaskStore(state => state.tasks);
  // Ajout de la méthode clearCompleted dans le store si besoin
  const clearCompleted = useTaskStore(state => state.clearCompleted || (() => {}));
  
  const activeCount = tasks.filter(task => !task.done).length;
  const completedCount = tasks.filter(task => task.done).length;

  return (
    <div className="flex items-center justify-between mt-6 p-4 bg-white rounded-lg border">
      <span className="text-sm text-gray-600">
        {activeCount} tâche{activeCount > 1 ? 's' : ''} active{activeCount > 1 ? 's' : ''}
      </span>
      
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as Filter[]).map(filter => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              currentFilter === filter
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filter === 'all' ? 'Toutes' : filter === 'active' ? 'Actives' : 'Terminées'}
          </button>
        ))}
      </div>
      
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          Effacer terminées
        </button>
      )}
    </div>
  );
} 