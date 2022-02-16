import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Checkbox,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import PropTypes from 'prop-types';
import styles from './ToDoList.module.css';

import Sublist from 'components/Sublist';

const ToDoList = ({
  todos,
  onDeleteToDo,
  setTaskCompleted,
  moveTaskUp,
  moveTaskDown,
  onNestedTask,
  setParentTaskID,
  // ancestors,
}) => {
  const ancestors = todos.filter(({ parentNode }) => parentNode === null);

  return (
    todos &&
    todos.length > 0 && (
      <div className={styles.wrapper}>
        <List>
          {ancestors.map(
            ({ id, todo, completed, childNodes, parentNode, unit }, index) => {
              return (
                <ListItem
                  alignItems="flex-start"
                  disablePadding
                  sx={{
                    position: 'relative',
                    backgroundColor: completed ? '#ececec' : 'transparent',
                    borderBottom: '1px solid #ececec',
                    alignItems: 'center',
                    transition: 'background-color linear 250ms',
                  }}
                  key={id}
                >
                  <div className={styles.buttonsWrapper}>
                    <ListItemButton
                      onClick={() => moveTaskUp(id)}
                      disabled={index === 0 || completed}
                      sx={{ marginRight: '10' }}
                      className="MuiListItem - root"
                    >
                      <ArrowDropUpOutlinedIcon />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => moveTaskDown(id)}
                      disabled={index === todos.length - 1 || completed}
                    >
                      <ArrowDropDownOutlinedIcon />
                    </ListItemButton>
                  </div>
                  <ListItemText primary={todo} />
                  <Checkbox
                    checked={completed}
                    onChange={() => setTaskCompleted(id)}
                    size="small"
                  />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => onDeleteToDo(id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                  <button
                    onClick={() => {
                      // onNestedTask(id);
                      setParentTaskID(id);
                    }}
                  >
                    Add
                  </button>
                  {childNodes.length > 0 && (
                    <Sublist
                      todos={todos.filter(todo => todo.parentNode === id)}
                      onDeleteToDo={onDeleteToDo}
                      setTaskCompleted={setTaskCompleted}
                      moveTaskUp={moveTaskUp}
                      moveTaskDown={moveTaskDown}
                      onNestedTask={onNestedTask}
                      setParentTaskID={setParentTaskID}
                    />
                    // <List sx={{}}>
                    //   {todos
                    //     .filter(todo => todo.parentNode === id)
                    //     .map(
                    //       (
                    //         {
                    //           id,
                    //           todo,
                    //           completed,
                    //           childNodes,
                    //           parentNode,
                    //           unit,
                    //         },
                    //         index,
                    //       ) => {
                    //         return (
                    //           <ListItem
                    //             alignItems="flex-start"
                    //             disablePadding
                    //             sx={{
                    //               position: 'relative',
                    //               backgroundColor: completed
                    //                 ? '#ececec'
                    //                 : 'transparent',
                    //               borderBottom: '1px solid #ececec',
                    //               alignItems: 'center',
                    //               transition: 'background-color linear 250ms',
                    //             }}
                    //             key={id}
                    //           >
                    //             <div className={styles.buttonsWrapper}>
                    //               <ListItemButton
                    //                 onClick={() => moveTaskUp(id)}
                    //                 disabled={index === 0 || completed}
                    //                 sx={{ marginRight: '10' }}
                    //                 className="MuiListItem - root"
                    //               >
                    //                 <ArrowDropUpOutlinedIcon />
                    //               </ListItemButton>
                    //               <ListItemButton
                    //                 onClick={() => moveTaskDown(id)}
                    //                 disabled={
                    //                   index === todos.length - 1 || completed
                    //                 }
                    //               >
                    //                 <ArrowDropDownOutlinedIcon />
                    //               </ListItemButton>
                    //             </div>
                    //             <ListItemText primary={todo} />
                    //             <Checkbox
                    //               checked={completed}
                    //               onChange={() => setTaskCompleted(id)}
                    //               size="small"
                    //             />
                    //             <button
                    //               type="button"
                    //               className={styles.deleteButton}
                    //               onClick={() => onDeleteToDo(id)}
                    //             >
                    //               <DeleteOutlineOutlinedIcon />
                    //             </button>
                    //             <button
                    //               onClick={() => {
                    //                 // onNestedTask(id);
                    //                 setParentTaskID(id);
                    //               }}
                    //             >
                    //               Add
                    //             </button>
                    //             {childNodes.length > 0 && (
                    //               <ToDoList
                    //                 todos={todos.filter(
                    //                   todo => todo.parentNode === id,
                    //                 )}
                    //                 onDeleteToDo
                    //                 setTaskCompleted
                    //                 moveTaskUp
                    //                 moveTaskDown
                    //                 onNestedTask
                    //                 setParentTaskID
                    //               />
                    //             )}
                    //           </ListItem>
                    //         );
                    //       },
                    //     )}
                    // </List>
                  )}
                </ListItem>
              );
            },
          )}
        </List>
      </div>
    )
  );
};

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleteToDo: PropTypes.func,
  setTaskCompleted: PropTypes.func,
  moveTaskUp: PropTypes.func,
  moveTaskDown: PropTypes.func,
};

export default ToDoList;
