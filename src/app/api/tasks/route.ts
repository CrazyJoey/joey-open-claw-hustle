import { NextRequest } from 'next/server';
import { Task, ColumnId } from '../types';

// Mock data for demonstration
const initialTasks: Task[] = [
  {
    id: '1',
    content: '研究 OpenClaw 的股票分析功能',
    columnId: 'todo',
  },
  {
    id: '2', 
    content: '开发自动化任务系统',
    columnId: 'inprogress',
  },
  {
    id: '3',
    content: '修复 Kanban 板构建错误',
    columnId: 'done',
  },
];

export async function GET() {
  return Response.json({ tasks: initialTasks });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tasks } = body;
    
    // In a real app, you would save to a database here
    // For now, we just return the tasks back
    return Response.json({ success: true, tasks });
  } catch (error) {
    console.error('Error saving tasks:', error);
    return Response.json({ success: false, error: 'Failed to save tasks' }, { status: 500 });
  }
}