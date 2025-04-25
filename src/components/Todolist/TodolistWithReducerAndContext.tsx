import { useReducer, useState } from 'react';
import './Todolist.css';

interface Task {
  title: string;
  id: number;
  checked: boolean;
}

type Action = { type: 'ADD'; title: string } | { type: 'CHANGE'; task: Task } | { type: 'DELETE'; id: number };

let nextId = 0;

const AddTask = ({ onAddTask }: { onAddTask: (title: string) => void }) => {
  const [title, setTitle] = useState('');

  const handleAddTask = () => {
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }
  };

  return (
    <div className="addItem">
      <input type="text" placeholder="Add Task" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

const Task = ({
  task,
  onChangeTask,
  onDeleteTask,
}: {
  task: Task;
  onChangeTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="task">
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => onChangeTask({ ...task, checked: !task.checked })}
      />
      {!isEditing ? (
        <>
          <p>{task.title}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      ) : (
        <>
          <input type="text" value={task.title} onChange={(e) => onChangeTask({ ...task, title: e.target.value })} />
          <button onClick={() => setIsEditing(false)}>Save</button>
        </>
      )}
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
};

const TaskList = ({
  tasks,
  onChangeTask,
  onDeleteTask,
}: {
  tasks: Task[];
  onChangeTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}) => (
  <ol className="taskList">
    {tasks.map((task) => (
      <Task key={task.id} task={task} onChangeTask={onChangeTask} onDeleteTask={onDeleteTask} />
    ))}
  </ol>
);

const Todolist = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const handleAddTask = (title: string) => {
    dispatch({ type: 'ADD', title });
  };

  const handleChangeTask = (task: Task) => {
    dispatch({ type: 'CHANGE', task });
  };

  const handleDeleteTask = (id: number) => {
    dispatch({ type: 'DELETE', id });
  };

  const total = tasks.length;
  const completed = tasks.filter((task) => task.checked).length;

  return (
    <section className="section">
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
      <div>
        {completed} out of {total} packed!
      </div>
    </section>
  );
};

function taskReducer(tasks: Task[], action: Action): Task[] {
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
