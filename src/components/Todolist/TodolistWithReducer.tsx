import { useReducer, useState } from 'react';
import './Todolist.css';

interface Task {
  title: string;
  id: number;
  checked: boolean;
}

interface Action {
  type: string;
  id?: number;
  title?: string;
  checked?: boolean;
}

let nextId = 0;
const AddItem = ({ onAddItem }: { onAddItem: (title: string) => void }) => {
  const [title, setTitle] = useState<string>('');

  const handleAddItem = (titleTxt: string) => {
    onAddItem(titleTxt);
    setTitle('');
  };

  return (
    <div className="addItem">
      <input type="text" placeholder="Add Item" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => handleAddItem(title)}>Add</button>
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
  const [isEdit, setIsEdit] = useState(false);
  return (
    <li className="task" key={task.id}>
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => onChangeTask({ ...task, checked: !task.checked })}
      />
      {!isEdit ? (
        <>
          <p>{task.title}</p>
          <button onClick={() => setIsEdit(true)}>Edit</button>
        </>
      ) : (
        <>
          <input type="text" value={task.title} onChange={(e) => onChangeTask({ ...task, title: e.target.value })} />
          <button onClick={() => setIsEdit(false)}>Save</button>
        </>
      )}
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
};

const TaskList = ({
  list,
  onChangeTask: onChangeTask,
  onDeleteTask: onDeleteTask,
}: {
  list: Array<Task>;
  onChangeTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}) => {
  return (
    <ol className="taskList">
      {list.map((item) => (
        <Task key={item.id} task={item} onChangeTask={onChangeTask} onDeleteTask={onDeleteTask} />
      ))}
    </ol>
  );
};

const Todolist = () => {
  const [todolist, dispatch] = useReducer(taskReducer, []);
  const total = todolist.length;
  const completed = todolist.filter((item) => item.checked).length;

  const handleAddItem = (title: string) => {
    dispatch({
      // action object
      type: 'ADD',
      id: nextId++,
      title: title,
    });
  };

  const handleChangeTask = (task: Task) => {
    dispatch(
      // action object
      {
        type: 'CHANGE',
        id: task.id,
        title: task.title,
        checked: task.checked,
      },
    );
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch({
      // action object
      type: 'DELETE',
      id: taskId,
    });
  };

  return (
    <section className="section">
      <AddItem onAddItem={handleAddItem} />
      <TaskList list={todolist} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
      <div>
        {completed} out of {total} packed!
      </div>
    </section>
  );
};

// 狀態邏輯函式參數：目前的狀態, action 物件
function taskReducer(tasks: Task[], action: Action) {
  // return next state for React to set
  switch (action.type) {
    case 'ADD': {
      return [
        ...tasks,
        {
          id: nextId++,
          title: action.title || '',
          checked: false,
        },
      ];
    }
    case 'CHANGE': {
      return tasks.map((task) =>
        task.id === action.id
          ? {
              id: action.id,
              title: action.title,
              checked: action.checked,
            }
          : task,
      );
    }
    case 'DELETE': {
      return tasks.filter((task) => task.id !== action.id);
    }
    default: {
      return tasks;
    }
  }
}

export default Todolist;
