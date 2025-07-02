// src/App.jsx
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const today = new Date().toISOString().split('T')[0];
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [task, setTask] = useState('');
  const [date, setDate] = useState(today);
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Stats
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const now = new Date();
    tasks.forEach((task) => {
      if (!task.completed) {
        const taskTime = new Date(task.date);
        const timeDiff = taskTime.getTime() - now.getTime();
        if (timeDiff > 0) {
          setTimeout(() => {
            alert(`⏰ Reminder: ${task.text} is due today!`);
          }, timeDiff);
        }
      }
    });
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        date,
        priority,
        category,
        completed: false,
      },
    ]);
    setTask('');
    setDate(today);
    setPriority('Medium');
    setCategory('Personal');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'priority')
      return (
        ['Low', 'Medium', 'High'].indexOf(a.priority) -
        ['Low', 'Medium', 'High'].indexOf(b.priority)
      );
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 p-4 flex">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">📝 To-Do Lists</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Task name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="p-3 border rounded-lg"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border rounded-lg"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-3 border rounded-lg"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border rounded-lg"
            >
              <option>Personal</option>
              <option>Work</option>
              <option>Study</option>
              <option>Other</option>
            </select>
          </div>

          <button
            onClick={addTask}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
          >
            ➕ Add Task
          </button>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search tasks..."
            className="w-full p-3 rounded-lg border"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="category">Sort by Category</option>
          </select>

          <div className="flex gap-4 justify-around text-sm mt-4 text-gray-700">
            <span>Total: {total}</span>
            <span>✅ Completed: {completed}</span>
            <span> 🕒 Pending: {pending}</span>
          </div>
        </div>

        <div className="space-y-4">
          {sortedTasks.length === 0 ? (
            <p className="text-center text-gray-600">No tasks found.</p>
          ) : (
            sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white p-4 rounded-xl shadow-md border-l-4 ${
                  task.priority === 'High'
                    ? 'border-red-500'
                    : task.priority === 'Medium'
                    ? 'border-yellow-400'
                    : 'border-green-400'
                } ${task.completed ? 'opacity-50 line-through' : ''}`}
              >
                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{task.text}</h3>
                    <p className="text-sm text-gray-600">{task.date}</p>
                    <div className="flex gap-2 text-sm mt-1">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {task.priority}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                        {task.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      {task.completed ? 'Undo' : 'Done'}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;