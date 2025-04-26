import { useState } from 'react';
import { TaskItem, TasksProvider, useTasks, useTasksDispatchContext } from './TasksContext';
import './Tasks.css';

const AddTask = () => {
  const dispatch = useTasksDispatchContext();
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
  const dispatch = useTasksDispatchContext();
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
  const tasks = useTasks();
  const total = tasks.length;
  const completed = tasks.filter((task) => task.checked).length;

  return (
    <>
      <ol className="taskList">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ol>
      <div>
        {completed} out of {total} packed!
      </div>
    </>
  );
};

const Todolist = () => {
  return (
    <section className="section">
      <TasksProvider>
        <AddTask />
        <TaskList />
      </TasksProvider>
    </section>
  );
};

export default Todolist;
