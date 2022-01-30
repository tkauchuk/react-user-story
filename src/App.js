import { Fragment, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';

import ToDoList from 'components/ToDoList';
import ToDoEditor from 'components/ToDoEditor';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(window.localStorage.getItem('tasks')) ?? [],
  );

  useEffect(() => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = todo => {
    const newTask = { id: uuidv4(), todo, completed: false, subtodos: [] };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const deleteTask = todoId => {
    const tasksLeft = tasks.filter(({ id }) => id !== todoId);
    setTasks(tasksLeft);
  };

  const moveTaskUp = todoId => {
    const copy = tasks.slice();
    const index = tasks.findIndex(({ id }) => todoId === id);
    if (index === 0) {
      return;
    }

    const task = copy.splice(index, 1);
    copy.splice(index - 1, 0, ...task);
    setTasks(copy);
  };

  const moveTaskDown = todoId => {
    const copy = tasks.slice();
    const index = tasks.findIndex(({ id }) => todoId === id);
    if (index === copy.length - 1) {
      return;
    }

    const task = copy.splice(index, 1);
    copy.splice(index + 1, 0, ...task);
    setTasks(copy);
  };

  const setTaskCompleted = todoId => {
    setTasks(
      tasks.map(task => {
        if (task.id === todoId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
  };

  const completed = tasks.reduce((total, task) => {
    return task.completed ? total + 1 : total;
  }, 0);
  const total = tasks.length - completed;
  const sorted = tasks.sort((a, b) => a.completed - b.completed);

  return (
    <Fragment>
      <Typography
        variant="h2"
        sx={{ paddingTop: '40px', color: '#2196f3', textAlign: 'center' }}
      >
        {total > 0 ? total : 'No'} {total === 1 ? 'Task' : 'Tasks'} Left for
        Today ...
      </Typography>
      <div className="container">
        <ToDoList
          todos={sorted}
          onDeleteToDo={deleteTask}
          moveTaskUp={moveTaskUp}
          moveTaskDown={moveTaskDown}
          setTaskCompleted={setTaskCompleted}
        />
      </div>
      <div className="footer">
        <ToDoEditor onFormSubmit={addTask} />
      </div>
    </Fragment>
  );
}

export default App;
