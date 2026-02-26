export interface Task {
  id: string;
  content: string;
  columnId: ColumnId;
}

export type ColumnId = 'todo' | 'inprogress' | 'done';