import { Fragment, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import Typography from '@mui/material/Typography';

import ToDoList from 'components/ToDoList';
import ToDoEditor from 'components/ToDoEditor';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(window.localStorage.getItem('tasks')) ?? [],
  );

  const [parentTaskID, setParentTaskID] = useState(null);

  console.log(parentTaskID, 'first');

  useEffect(() => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = todo => {
    const newTask = {
      id: uuidv4(),
      todo,
      completed: false,
      parentNode: null,
      childNodes: [],
    };
    // newTask.unit = newTask.id;
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const deleteTask = todoId => {
    const copy = [...tasks];
    let array = [];
    const task = copy.find(({ id }) => id === todoId);
    console.log(task, '---task---');
    const { childNodes, parentNode } = task;
    console.log(childNodes, '---childNodes---');

    if (parentNode) {
      // const parent = copy.find(({ id }) => id === parentNode);
      // const childNodes
      console.log(parentNode, 'parentNode');
      const parents = copy.map(task => {
        if (task.id === parentNode) {
          return {
            ...task,
            childNodes: task.childNodes.splice(
              task.childNodes.indexOf(parentNode),
              1,
            ),
          };
        }
        return task;
      });
      setTasks(parents);
    }

    if (childNodes.length > 0) {
      childNodes.forEach(childNodeId => {
        const object = copy.find(({ id }) => id === childNodeId);
        copy.splice(copy.indexOf(childNodeId), 1);
        if (object?.childNodes?.length > 0) {
          array.push(object);
          // deleteTask(childNodeId);
        }
        // return object.childNodes.length > 0
        //   ? deleteTask(childNodeId)
        //   : copy.splice(copy.indexOf(childNodeId), 1);
      });
      // tasks.filter(({ id }) => id !== childNodeId),
      // console.log(withoutNested, '---withoutNested---');
      const tasksLeft = copy.filter(({ id }) => id !== todoId);
      console.log(tasksLeft, '---tasksLeft---');
      return setTasks(tasksLeft);
    }

    // if (array.length > 0) {
    //   array.forEach(el => deleteTask(el));
    // }
    console.log(array, 'array');
    const tasksLeft = tasks.filter(({ id }) => id !== todoId);
    return array.length > 0
      ? array.forEach(el => deleteTask(el.id))
      : setTasks(tasksLeft);
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

  const doesHaveAncestors = (todoID, todos, key, newNestedTask) => {
    const copy = [...todos];
    let renewed = null;

    const parentTask = tasks.find(({ id }) => id === todoID);
    renewed = copy.map(task => {
      if (task.id === parentTask.id) {
        return {
          ...task,
          childNodes: [...task['childNodes'], newNestedTask.id],
        };
      }
      return task;
    });
    if (parentTask[key]) {
      return doesHaveAncestors(parentTask[key], renewed, key, newNestedTask);
    }

    return renewed;
  };

  const addNestedTask = (todoId, todo) => {
    const newNestedTask = {
      id: uuidv4(),
      todo,
      parentNode: todoId,
      childNodes: [],
      unit: todoId,
    };

    const renewed = doesHaveAncestors(
      todoId,
      tasks,
      'parentNode',
      newNestedTask,
    );
    // const parentTask = tasks.find(({ id }) => id === todoId);
    // console.log(parentTask);

    // if (parentTask.parentNode) {
    //   setTasks(
    //     tasks.map(task => {
    //       if (task.id === parentTask.parentNode) {
    //         return {
    //           ...task,
    //           childNodes: [...task['childNodes'], newNestedTask.id],
    //         };
    //       }
    //       return task;
    //     }),
    //   );
    // }

    // setTasks(
    //   tasks.map(task => {
    //     if (task.id === todoId) {
    //       return {
    //         ...task,
    //         childNodes: [...task['childNodes'], newNestedTask.id],
    //       };
    //     }
    //     return task;
    //   }),
    // );

    setTasks([...renewed, newNestedTask]);
    setParentTaskID(null);

    // if (parentTask.parentNode) {
    //   addNestedTask(parentTask.parentNode);
    // }
    // return parentTask.parentNode
    //   ? addNestedTask(parentTask.parentNode)
    //   : setTasks(prevTasks => [...prevTasks, newNestedTask]);
  };

  const completed = tasks.reduce((total, task) => {
    return task.completed ? total + 1 : total;
  }, 0);
  // const total = tasks.length - completed;
  // const sorted = tasks.sort((a, b) => a.completed - b.completed);

  console.log(tasks);
  console.log(parentTaskID, 'second');

  const sorted = tasks.sort((a, b) => {
    console.log(a, 'aaa');
    console.log(b, 'bbb');

    console.log(b.childNodes.includes(a.id));
  });

  (() => {
    const copy = [...tasks];

    // let length = copy.length;
    // for (let i = 0; i < length; i += 1) {
    //   for (let j = 0; j < length - i - 1; j += 1) {
    //     if (copy[j].unit !== copy[j + 1].unit) {
    //       console.log(copy[j].childNodes.includes(copy[j + 1].id));
    //       let temp = copy[j];
    //       copy[j] = copy[j + 1];
    //       copy[j + 1] = temp;
    //     }
    //   }
    // }
    // copy.sort();
    console.log(sorted, 'sorted-copy');
    return sorted;
  })();

  const ancestors = tasks.filter(element => element.childNodes.length === 0);
  console.log(tasks, '---tasks---');

  return (
    <Fragment>
      {/* <Typography
        variant="h2"
        sx={{ paddingTop: '40px', color: '#2196f3', textAlign: 'center' }}
      >
        {total > 0 ? total : 'No'} {total === 1 ? 'Task' : 'Tasks'} Left for
        Today ...
      </Typography> */}
      <div className="container">
        <ToDoList
          todos={tasks}
          onDeleteToDo={deleteTask}
          moveTaskUp={moveTaskUp}
          moveTaskDown={moveTaskDown}
          setTaskCompleted={setTaskCompleted}
          onNestedTask={addNestedTask}
          setParentTaskID={setParentTaskID}
          ancestors={ancestors}
        />
      </div>
      <div className="footer">
        <ToDoEditor
          onFormSubmit={addTask}
          parentTaskID={parentTaskID}
          onNestedTask={addNestedTask}
        />
      </div>
    </Fragment>
  );
}

export default App;
