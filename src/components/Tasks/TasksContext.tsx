import { createContext, Dispatch, useContext, useReducer } from 'react';

export interface TaskItem {
  title: string;
  id: number;
  checked: boolean;
}
export type Action =
  | { type: 'ADD'; title: string }
  | { type: 'CHANGE'; task: TaskItem }
  | { type: 'DELETE'; id: number };

let nextId = 0;
export const TasksContext = createContext<Array<TaskItem>>([]);
export const TasksDispatchContext = createContext<Dispatch<Action>>(() => {});

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};

export const useTasksDispatchContext = () => {
  return useContext(TasksDispatchContext);
};

function taskReducer(tasks: TaskItem[], action: Action): TaskItem[] {
  switch (action.type) {
    case 'ADD':
      return [...tasks, { id: nextId++, title: action.title, checked: false }];
    case 'CHANGE':
      return tasks.map((task) => (task.id === action.task.id ? action.task : task));
    case 'DELETE':
      return tasks.filter((task) => task.id !== action.id);
    default:
      return tasks;
  }
}
