const STATUS_OPTIONS = [
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "Done", label: "Done" },
];

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-slate-800 mb-1">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-slate-500 mb-3">{task.description}</p>
      )}

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task, e.target.value)}
        className="w-full mb-3 px-2 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="flex-1 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
