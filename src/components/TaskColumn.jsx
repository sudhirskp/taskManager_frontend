import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="flex-1 min-w-[280px] bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </h2>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
            No tasks here
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
