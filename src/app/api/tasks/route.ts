import { NextRequest } from 'next/server';
import { Task } from '../../types';

// Mock data - in a real app, this would be stored in a database
let tasks: Task[] = [
  {
    id: '1',
    content: '研究 OpenClaw 的股票分析功能',
    columnId: 'todo',
  },
  {
    id: '2', 
    content: '部署 Second Brain 仪表板到 Vercel',
    columnId: 'inprogress',
  },
  {
    id: '3',
    content: '测试自主任务生成系统',
    columnId: 'inprogress',
  },
  {
    id: '4',
    content: '完成 Kanban 看板的拖拽功能',
    columnId: 'done',
  },
];

export async function GET() {
  return Response.json({ tasks });
}

export async function POST(request: NextRequest) {
  const { tasks: newTasks } = await request.json();
  tasks = newTasks;
  return Response.json({ success: true });
}