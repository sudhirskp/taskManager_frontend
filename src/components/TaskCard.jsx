const STATUS_OPTIONS = [
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "Done", label: "Done" },
];

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          {task.description}
        </p>
      )}

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task, e.target.value)}
        className="w-full mb-3 px-2 py-1.5 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
