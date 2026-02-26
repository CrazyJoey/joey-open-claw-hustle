import { NextRequest } from 'next/server';
import { Task, ColumnId } from '../../types';

// Mock data for demonstration
const initialTasks: Task[] = [
  { id: '1', content: 'Research OpenClaw features and capabilities', columnId: 'todo' },
  { id: '2', content: 'Set up automated task management system', columnId: 'inprogress' },
  { id: '3', content: 'Fix Kanban board build errors', columnId: 'done' },
  { id: '4', content: 'Explore AI-powered productivity tools', columnId: 'todo' },
];

export async function GET() {
  return Response.json({ tasks: initialTasks });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tasks } = body;
    
    // In a real application, you would save to a database here
    // For this demo, we just return success
    console.log('Received tasks:', tasks);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error saving tasks:', error);
    return Response.json({ success: false, error: 'Failed to save tasks' }, { status: 500 });
  }
}