import { useState } from 'react';
import './Todolist.css';

interface Task {
  title: string;
  id: number;
  checked: boolean;
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

const TaskList = ({
  list,
  onChangeItem,
  onDeleteItem,
}: {
  list: Array<Task>;
  onChangeItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}) => {
  return (
    <ol className="taskList">
      {list.map((item) => (
        <li className="task" key={item.id}>
          <input type="checkbox" checked={item.checked} onChange={() => onChangeItem(item.id)} />
          <p>{item.title}</p>
          <button onClick={() => onDeleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </ol>
  );
};

const Todolist = () => {
  const [todolist, setTodolist] = useState<Array<Task>>([]);
  const total = todolist.length;
  const completed = todolist.filter((item) => item.checked).length;

  const handleAddItem = (title: string) => {
    const newItem = {
      title,
      id: nextId++,
      checked: false,
    };
    setTodolist([...todolist, newItem]);
  };

  const handleChangeItem = (id: number) => {
    const newList = [...todolist].map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
    setTodolist(newList);
  };

  const handleDeleteItem = (id: number) => {
    const newList = [...todolist].filter((item) => item.id !== id);
    setTodolist(newList);
  };

  return (
    <section className="section">
      <AddItem onAddItem={handleAddItem} />
      <TaskList list={todolist} onChangeItem={handleChangeItem} onDeleteItem={handleDeleteItem} />
      <div>
        {completed} out of {total} packed!
      </div>
    </section>
  );
};

export default Todolist;
