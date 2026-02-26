'use client';

import { useState } from 'react';

interface Task {
  id: string;
  content: string;
  columnId: 'todo' | 'inprogress' | 'done';
}

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-blue-100 border-blue-300' },
  { id: 'inprogress', title: 'In Progress', color: 'bg-yellow-100 border-yellow-300' },
  { id: 'done', title: 'Done', color: 'bg-green-100 border-green-300' },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', content: '修复 Turbopack 构建错误', columnId: 'done' },
    { id: '2', content: '部署到 Vercel', columnId: 'done' },
    { id: '3', content: '创建 Second Brain 系统', columnId: 'inprogress' },
    { id: '4', content: '集成股票分析功能', columnId: 'todo' },
    { id: '5', content: '优化副业自动化任务', columnId: 'todo' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<'todo' | 'inprogress' | 'done'>('todo');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        content: newTask.trim(),
        columnId: selectedColumn,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const moveTask = (taskId: string, newColumnId: 'todo' | 'inprogress' | 'done') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, columnId: newColumnId } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          侯哥的 OpenClaw 副业 - 每日任务看板
        </h1>
        
        {/* Add Task Form */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">添加新任务</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="输入任务内容..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button
              onClick={addTask}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              添加任务
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.id} className={`rounded-lg border-2 ${column.color}`}>
              <div className="p-4 border-b-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">{column.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {tasks.filter(task => task.columnId === column.id).length} 个任务
                </p>
              </div>
              <div className="p-4 min-h-96">
                {tasks
                  .filter(task => task.columnId === column.id)
                  .map((task) => (
                    <div 
                      key={task.id} 
                      className="mb-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <p className="text-gray-800 mb-2">{task.content}</p>
                      <div className="flex gap-2">
                        {column.id !== 'todo' && (
                          <button
                            onClick={() => moveTask(task.id, 'todo')}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            ← To Do
                          </button>
                        )}
                        {column.id !== 'inprogress' && (
                          <button
                            onClick={() => moveTask(task.id, 'inprogress')}
                            className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                          >
                            ↔ In Progress
                          </button>
                        )}
                        {column.id !== 'done' && (
                          <button
                            onClick={() => moveTask(task.id, 'done')}
                            className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                          >
                            → Done
                          </button>
                        )}
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="ml-auto text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                {tasks.filter(task => task.columnId === column.id).length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <p>暂无任务</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}