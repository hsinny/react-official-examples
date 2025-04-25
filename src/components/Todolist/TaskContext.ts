import { createContext, Dispatch } from 'react';

export interface TaskItem {
  title: string;
  id: number;
  checked: boolean;
}
export type Action =
  | { type: 'ADD'; title: string }
  | { type: 'CHANGE'; task: TaskItem }
  | { type: 'DELETE'; id: number };

export const TasksContext = createContext<Array<TaskItem>>([]);
export const TasksDispatchContext = createContext<Dispatch<Action>>(() => {});
