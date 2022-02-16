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

const Sublist = ({
  todos,
  onDeleteToDo,
  setTaskCompleted,
  moveTaskUp,
  moveTaskDown,
  onNestedTask,
  setParentTaskID,
}) => {
  return (
    todos &&
    todos.length > 0 && (
      <div>
        <List>
          {todos.map(
            ({ id, todo, completed, childNodes, parentNode }, index) => {
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
                  <div>
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
                  <button type="button" onClick={() => onDeleteToDo(id)}>
                    <DeleteOutlineOutlinedIcon />
                  </button>
                  <button
                    onClick={id => {
                      // onNestedTask(id);
                      console.log(id, '---------------------');
                      setParentTaskID(id);
                    }}
                  >
                    Add
                  </button>
                  {childNodes.length > 0 && (
                    <List sx={{}}>
                      {todos
                        .filter(todo => todo.parentNode === id)
                        .map(
                          (
                            {
                              id,
                              todo,
                              completed,
                              childNodes,
                              parentNode,
                              unit,
                            },
                            index,
                          ) => {
                            return (
                              <ListItem
                                alignItems="flex-start"
                                disablePadding
                                sx={{
                                  position: 'relative',
                                  backgroundColor: completed
                                    ? '#ececec'
                                    : 'transparent',
                                  borderBottom: '1px solid #ececec',
                                  alignItems: 'center',
                                  transition: 'background-color linear 250ms',
                                }}
                                key={id}
                              >
                                <div>
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
                                    disabled={
                                      index === todos.length - 1 || completed
                                    }
                                  >
                                    <ArrowDropDownOutlinedIcon />
                                  </ListItemButton>
                                </div>
                                <ListItemText primary={todo} />
                                <Checkbox
                                  checked={completed}
                                  onChange={() => {
                                    console.log(id, 'id');

                                    setTaskCompleted(id);
                                  }}
                                  size="small"
                                />
                                <button
                                  type="button"
                                  onClick={() => onDeleteToDo(id)}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </button>
                                <button
                                  onClick={() => {
                                    // onNestedTask(id);
                                    console.log(id, 'id');

                                    setParentTaskID(id);
                                  }}
                                >
                                  Add
                                </button>
                                {childNodes.length > 0 && (
                                  <Sublist
                                    todos={todos.filter(
                                      todo => todo.parentNode === id,
                                    )}
                                    onDeleteToDo={onDeleteToDo}
                                    setTaskCompleted={setTaskCompleted}
                                    moveTaskUp={moveTaskUp}
                                    moveTaskDown={moveTaskDown}
                                    // onNestedTask={onNestedTask}
                                    setParentTaskID={setParentTaskID}
                                  />
                                )}
                              </ListItem>
                            );
                          },
                        )}
                    </List>
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

export default Sublist;
