export interface ISocialMediaEntry {
  name: string;
  link?: string;
}

export type Sorts = 'a-z' | 'z-a' | 'reverse' | 'random' | 'none';

export type TodoItemStatus = 'not-started' | 'started' | 'in-progress' | 'done';

export interface ITodoItem {
  name: string;
  status: TodoItemStatus;
  deadline?: Date;
}

export interface ITodoList {
  name: string;
  items: ITodoItem[];
}
