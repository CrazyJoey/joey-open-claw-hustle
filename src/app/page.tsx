'use client';

import { useState, useEffect } from 'react';
import { Task, ColumnId } from './types';

interface KanbanColumnProps {
  id: ColumnId;
  title: string;
  tasks: Task[];
  onAddTask: (columnId: ColumnId, content: string) => void;
  onDeleteTask: (taskId: string) => void;
}

function KanbanColumn({ id, title, tasks, onAddTask, onDeleteTask }: KanbanColumnProps) {
  const [newTaskContent, setNewTaskContent] = useState('');

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      onAddTask(id, newTaskContent.trim());
      setNewTaskContent('');
    }
  };

  return (
    <div className="flex flex-col w-80 bg-gray-100 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="flex-1 space-y-3">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="bg-white rounded p-3 shadow-sm cursor-move hover:shadow-md transition-shadow"
          >
            <p className="text-gray-700">{task.content}</p>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="mt-2 text-xs text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          placeholder="Add a new task..."
          className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-sm"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('kanban-tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        // Initialize with demo tasks
        const demoTasks: Task[] = [
          { id: '1', content: 'Research OpenClaw features and capabilities', columnId: 'todo' },
          { id: '2', content: 'Set up automated task management system', columnId: 'inprogress' },
          { id: '3', content: 'Fix Kanban board build errors', columnId: 'done' },
          { id: '4', content: 'Explore AI-powered productivity tools', columnId: 'todo' },
        ];
        setTasks(demoTasks);
        localStorage.setItem('kanban-tasks', JSON.stringify(demoTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (columnId: ColumnId, content: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      content,
      columnId,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const moveTask = (taskId: string, newColumnId: ColumnId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, columnId: newColumnId } : task
    );
    setTasks(updatedTasks);
  };

  const columns: { id: ColumnId; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">OpenClaw Task Manager</h1>
        
        {/* Drag and drop instructions */}
        <div className="mb-6 text-center text-gray-600">
          <p>Drag tasks between columns or use the Add Task button to create new items</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 justify-center">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks.filter(task => task.columnId === column.id)}
              onAddTask={addTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>

        {/* Footer with instructions */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>All tasks are saved locally in your browser</p>
        </div>
      </div>
    </div>
  );
}