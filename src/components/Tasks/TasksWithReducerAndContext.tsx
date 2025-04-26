import { useContext, useReducer, useState } from 'react';
import { TasksContext, TasksDispatchContext, TaskItem, Action } from './TasksContext';
import './Tasks.css';

let nextId = 0;

const AddTask = () => {
  const dispatch = useContext(TasksDispatchContext);
  const [title, setTitle] = useState('');

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch({ type: 'ADD', title: title.trim() });
      setTitle('');
    }
  };

  return (
    <div className="addTask">
      <input type="text" placeholder="Add Task" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

const Task = ({ task }: { task: TaskItem }) => {
  const dispatch = useContext(TasksDispatchContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeTask = (task: TaskItem) => {
    dispatch({ type: 'CHANGE', task });
  };

  const handleDeleteTask = (id: number) => {
    dispatch({ type: 'DELETE', id });
  };

  return (
    <li className="task">
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => handleChangeTask({ ...task, checked: !task.checked })}
      />
      {!isEditing ? (
        <>
          <p>{task.title}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={task.title}
            onChange={(e) => handleChangeTask({ ...task, title: e.target.value })}
          />
          <button onClick={() => setIsEditing(false)}>Save</button>
        </>
      )}
      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
    </li>
  );
};

const TaskList = () => {
  const tasks = useContext(TasksContext);

  return (
    <ol className="taskList">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ol>
  );
};

const Todolist = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const total = tasks.length;
  const completed = tasks.filter((task) => task.checked).length;

  return (
    <section className="section">
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          <AddTask />
          <TaskList />
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
      <div>
        {completed} out of {total} packed!
      </div>
    </section>
  );
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

export default Todolist;
