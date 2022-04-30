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

export interface ITheme {
  navbarBG1: string;
  navbarBG2: string;
  navbarText: string;
  navbarAccent: string;
  accent: string;
  bg: string;
  text: string;
  cardBG: string;
  cardText: string;
  cardAccent: string;
}

export class Point {
  constructor(public x: number, public y: number) {}
  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
  toArray(): number[] {
    return [this.x, this.y];
  }
}
