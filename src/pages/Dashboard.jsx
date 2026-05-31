import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import TaskColumn from "../components/TaskColumn";
import TaskForm from "../components/TaskForm";
import {
  getTasksByUser,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const COLUMNS = [
  { title: "Todo", status: "TODO" },
  { title: "In Progress", status: "IN_PROGRESS" },
  { title: "Done", status: "Done" },
];

const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setError("");
    try {
      const data = await getTasksByUser(userId);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (formData) => {
    await createTask({ ...formData, userId: Number(userId) });
    setEditingTask(null);
    await fetchTasks();
  };

  const handleUpdate = async (formData) => {
    await updateTask(editingTask.id, formData);
    setEditingTask(null);
    await fetchTasks();
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    await fetchTasks();
  };

  const handleStatusChange = async (task, newStatus) => {
    await updateTask(task.id, {
      title: task.title,
      description: task.description,
      status: newStatus,
    });
    await fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          Welcome, {userName}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={() => setEditingTask(null)}
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <span className="spinner spinner-lg" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-1">
              No tasks yet
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              Create your first task using the form above
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4">
            {COLUMNS.map((col) => (
              <TaskColumn
                key={col.status}
                title={col.title}
                tasks={getTasksByStatus(col.status)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
